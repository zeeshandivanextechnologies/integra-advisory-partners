const express = require('express');
const setupMiddlewares = require('./middleware');
const routes = require('./routes');
const { UPLOAD_DIR } = require('./controllers/uploadController');

const setupApp = (app) => {
  setupMiddlewares(app);
  app.use('/api', routes);

  // uploaded images and videos; the website and admin run on other ports,
  // so allow them to load these files (helmet blocks it by default)
  app.use(
    '/uploads',
    (req, res, next) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      next();
    },
    express.static(UPLOAD_DIR, { maxAge: '7d' })
  );

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is healthy' });
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  });
};

module.exports = setupApp;