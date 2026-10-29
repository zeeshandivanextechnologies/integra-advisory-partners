const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiRequest = async (endpoint, options = {}) => {
  let url = endpoint.startsWith('http')
    ? endpoint
    : API_BASE_URL
    ? `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`
    : `/api/${endpoint.replace(/^\//, '')}`;

  const method = (options.method || 'GET').toUpperCase();
  const isGet = method === 'GET';

  // Bust cache for GET requests so updated content from admin shows immediately
  if (isGet) {
    const sep = url.includes('?') ? '&' : '?';
    url = `${url}${sep}_t=${Date.now()}`;
  }

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  const config = {
    cache: isGet ? 'no-store' : options.cache,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(isGet
        ? {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          }
        : {}),
      ...options.headers,
    },
    ...options,
  };

  if (isFormData) {
    delete config.headers['Content-Type'];
  } else if (config.body && typeof config.body !== 'string') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  let data = null;
  try {
    data = isJson ? await response.json() : await response.text();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const errorMessage =
      (data && (data.message || data.error)) || response.statusText || 'Request failed';
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export default apiRequest;