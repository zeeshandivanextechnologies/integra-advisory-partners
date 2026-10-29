const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', '..', 'frontend', 'src', 'services', 'api.js');
let code = fs.readFileSync(filePath, 'utf8');

const oldBlock = `  const config = {
    cache: isGet ? 'no-store' : options.cache,
    headers: {
      'Content-Type': 'application/json',
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

  if (config.body && typeof config.body !== 'string') {
    config.body = JSON.stringify(config.body);
  }`;

const newBlock = `  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

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
  }`;

code = code.replace(oldBlock.replace(/\n/g, '\r\n'), newBlock.replace(/\n/g, '\r\n'));
if (!code.includes('isFormData')) {
  code = code.replace(oldBlock, newBlock);
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('frontend api.js updated for FormData support!');

