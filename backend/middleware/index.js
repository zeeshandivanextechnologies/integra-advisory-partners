const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');

const setupMiddlewares = (app) => {
  app.use(helmet());
  app.use(morgan('dev'));

  const corsOrigin = process.env.CORS_ORIGIN;
  const originList = corsOrigin ? corsOrigin.split(',').map((o) => o.trim()) : [];

  app.use(
    cors({
      origin: originList.length > 0 ? originList : true,
      credentials: true,
    })
  );

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
};

module.exports = setupMiddlewares;