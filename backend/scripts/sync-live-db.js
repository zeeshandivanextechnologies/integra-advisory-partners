/**
 * Script to sync local pages changes to the live / production PostgreSQL database.
 * 
 * Usage:
 *   node backend/scripts/sync-live-db.js "postgresql://user:password@host:port/database"
 *   OR set LIVE_DATABASE_URL in environment or pass as first argument.
 */

const { Pool } = require('pg');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const localPool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'integra_advisory',
  user: process.env.DB_USER || 'postgres',
  password: String(process.env.DB_PASSWORD || 'admin'),
  connectionTimeoutMillis: 5000,
});

const liveUrl = process.argv[2] || process.env.LIVE_DATABASE_URL;

if (!liveUrl) {
  console.error('\n❌ Error: Live database connection string missing!');
  console.log('\nUsage:');
  console.log('  node backend/scripts/sync-live-db.js "<YOUR_LIVE_DATABASE_URL>"\n');
  process.exit(1);
}

const livePool = new Pool({
  connectionString: liveUrl,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

async function sync() {
  console.log('🔄 Connecting to Local and Live Databases...');
  
  // 1. Fetch updated pages from local DB
  const localRes = await localPool.query(
    `SELECT slug, content FROM pages WHERE slug IN ('services', 'process')`
  );

  console.log(`📦 Found ${localRes.rows.length} updated page records in local database.`);

  for (const row of localRes.rows) {
    console.log(`🚀 Updating '${row.slug}' page in live database...`);
    await livePool.query(
      `UPDATE pages SET content = $1, updated_at = NOW() WHERE slug = $2`,
      [row.content, row.slug]
    );
    console.log(`✅ '${row.slug}' page successfully updated in live DB!`);
  }

  console.log('\n🎉 ALL LOCAL DATABASE CHANGES SUCCESSFULLY SYNCED TO LIVE DATABASE!\n');
  await localPool.end();
  await livePool.end();
  process.exit(0);
}

sync().catch(async (err) => {
  console.error('\n❌ Sync failed:', err.message);
  await localPool.end();
  await livePool.end();
  process.exit(1);
});
