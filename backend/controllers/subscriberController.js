const db = require('../config/db');

// Subscribe an email (public)
const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if already subscribed
    const existing = await db.query('SELECT * FROM subscribers WHERE email = $1', [cleanEmail]);
    if (existing.rows.length > 0) {
      return res.json({ message: 'You are already subscribed to the monthly brief!' });
    }

    const result = await db.query(
      'INSERT INTO subscribers (email) VALUES ($1) RETURNING *',
      [cleanEmail]
    );

    res.status(201).json({
      message: 'Subscribed successfully!',
      subscriber: result.rows[0],
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Server error while subscribing. Please try again.' });
  }
};

// Admin: Get all subscribers
const listAll = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, email, status, created_at AT TIME ZONE 'UTC' as created_at FROM subscribers ORDER BY id DESC"
    );
    res.json({ subscribers: result.rows });
  } catch (error) {
    console.error('List subscribers error:', error);
    res.status(500).json({ error: 'Could not load subscribers.' });
  }
};

// Admin: Remove subscriber
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM subscribers WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subscriber not found.' });
    }
    res.json({ message: 'Subscriber removed successfully.' });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({ error: 'Could not delete subscriber.' });
  }
};

module.exports = {
  subscribe,
  listAll,
  remove,
};
