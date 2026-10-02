const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http')
    ? endpoint
    : API_BASE_URL
    ? `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`
    : `/api/${endpoint.replace(/^\//, '')}`;

  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('adminToken') : null;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body !== 'string') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  let data = null;
  try {
    data = isJson ? await response.json() : await response.text();
  } catch {
    data = null;
  }

  if (response.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
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