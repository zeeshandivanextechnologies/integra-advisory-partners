const { Pool } = require('pg');
require('dotenv').config();

// DATABASE_URL (e.g. Supabase) is used when set, with SSL; otherwise the
// separate DB_* settings for a local PostgreSQL, exactly as before.
const connection = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      // hosted databases require SSL; their certificates are not in Node's default list
      ssl: { rejectUnauthorized: false },
      // serverless functions each open their own pool, so keep it small
      max: Number(process.env.DB_POOL_MAX) || 3,
      connectionTimeoutMillis: 10000,
    }
  : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: 20,
      connectionTimeoutMillis: 2000,
    };

const pool = new Pool({
  ...connection,
  idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL connected');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
