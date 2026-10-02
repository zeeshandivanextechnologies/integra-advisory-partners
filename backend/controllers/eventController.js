const eventService = require('../services/eventService');

// ---------- public (website) ----------

const listPublished = async (req, res, next) => {
  try {
    const events = await eventService.listEvents({ publishedOnly: true });
    res.status(200).json({ success: true, events });
  } catch (err) {
    next(err);
  }
};

// ---------- admin ----------

const listAll = async (req, res, next) => {
  try {
    const events = await eventService.listEvents({ publishedOnly: false });
    res.status(200).json({ success: true, events });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const event = await eventService.getById(req.params.id);
    res.status(200).json({ success: true, event });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const event = await eventService.createEvent(req.body, req.admin.id);
    res.status(201).json({ success: true, message: 'Event created', event });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Event saved', event });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await eventService.deleteEvent(req.params.id);
    res.status(200).json({ success: true, message: 'Event deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listPublished,
  listAll,
  getOne,
  create,
  update,
  remove,
};
