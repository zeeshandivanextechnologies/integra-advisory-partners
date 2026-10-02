require('dotenv').config();
const express = require('express');
const setupApp = require('./app');
const { createAdminTable } = require('./models/Admin');
const { createPageTable } = require('./models/Page');
const { createArticleTable } = require('./models/Article');
const { createEventTable } = require('./models/Event');
const { seedAdmin } = require('./services/authService');

const app = express();
setupApp(app);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await createAdminTable();
    await seedAdmin();
    // after admins, because pages.updated_by references it
    await createPageTable();
    await createArticleTable();
    await createEventTable();
  } catch (err) {
    console.error('❌ DB init error:', err.message);
  }

  if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  }
};

startServer();

module.exports = app;