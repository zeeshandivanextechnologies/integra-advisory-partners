// Supabase Storage for files uploaded from the admin, used when SUPABASE_URL
// and SUPABASE_SERVICE_KEY are set (they must be on Vercel, whose servers do
// not keep files). Without them uploads stay in backend/uploads as before.
// Uses Supabase's REST API directly, so no extra package is needed.

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const config = () => ({
  url: (process.env.SUPABASE_URL || '').replace(/\/$/, ''),
  key: process.env.SUPABASE_SERVICE_KEY || '',
  bucket: process.env.SUPABASE_BUCKET || 'uploads',
});

const isConfigured = () => {
  const { url, key } = config();
  return Boolean(url && key);
};

// new-style secret keys (sb_secret_...) go in the apikey header only;
// legacy service_role JWTs also go in Authorization
const authHeaders = () => {
  const { key } = config();
  return key.startsWith('sb_') ? { apikey: key } : { apikey: key, Authorization: `Bearer ${key}` };
};

const publicUrl = (path) => {
  const { url, bucket } = config();
  return `${url}/storage/v1/object/public/${bucket}/${path}`;
};

const storageError = async (response, action) => {
  let detail = '';
  try {
    const data = await response.json();
    detail = data.message || data.error || '';
  } catch {
    detail = response.statusText;
  }
  const error = new Error(`Storage could not ${action}${detail ? `: ${detail}` : ''}`);
  error.status = 502;
  return error;
};

// create the public bucket the first time; "already exists" is fine
let bucketReady = null;
const ensureBucket = () => {
  if (!bucketReady) {
    const { url, bucket } = config();
    bucketReady = fetch(`${url}/storage/v1/bucket`, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: bucket,
        name: bucket,
        public: true,
        file_size_limit: MAX_FILE_SIZE,
      }),
    }).then(async (response) => {
      if (response.ok || response.status === 409) return;
      const text = await response.text();
      if (/already exists|duplicate/i.test(text)) return;
      bucketReady = null;
      throw await storageError(new Response(text, { status: response.status }), 'create the bucket');
    });
  }
  return bucketReady;
};

// small files sent through the backend
const uploadBuffer = async (path, buffer, contentType) => {
  await ensureBucket();
  const { url, bucket } = config();
  const response = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': contentType, 'x-upsert': 'false' },
    body: buffer,
  });
  if (!response.ok) throw await storageError(response, 'save the file');
  return publicUrl(path);
};

// a one-time link the admin browser uploads to directly, so large videos do
// not pass through the backend (Vercel limits request bodies to about 4.5 MB)
const createSignedUpload = async (path) => {
  await ensureBucket();
  const { url, bucket } = config();
  const response = await fetch(`${url}/storage/v1/object/upload/sign/${bucket}/${path}`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: '{}',
  });
  if (!response.ok) throw await storageError(response, 'prepare the upload');
  const data = await response.json();
  return { uploadUrl: `${url}/storage/v1${data.url}`, url: publicUrl(path) };
};

module.exports = {
  MAX_FILE_SIZE,
  isConfigured,
  uploadBuffer,
  createSignedUpload,
};
