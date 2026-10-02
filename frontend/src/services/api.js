const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http')
    ? endpoint
    : API_BASE_URL
    ? `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`
    : `/api/${endpoint.replace(/^\//, '')}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
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