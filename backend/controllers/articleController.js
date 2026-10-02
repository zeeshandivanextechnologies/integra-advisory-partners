const articleService = require('../services/articleService');

// ---------- public (website) ----------

const listPublished = async (req, res, next) => {
  try {
    const articles = await articleService.listArticles({ publishedOnly: true });
    res.status(200).json({ success: true, articles });
  } catch (err) {
    next(err);
  }
};

const getPublished = async (req, res, next) => {
  try {
    const article = await articleService.getPublishedBySlug(req.params.slug);
    res.status(200).json({ success: true, article });
  } catch (err) {
    next(err);
  }
};

// ---------- admin ----------

const listAll = async (req, res, next) => {
  try {
    const articles = await articleService.listArticles({ publishedOnly: false });
    res.status(200).json({ success: true, articles });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const article = await articleService.getById(req.params.id);
    res.status(200).json({ success: true, article });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const article = await articleService.createArticle(req.body, req.admin.id);
    res.status(201).json({ success: true, message: 'Article created', article });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const article = await articleService.updateArticle(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Article saved', article });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await articleService.deleteArticle(req.params.id);
    res.status(200).json({ success: true, message: 'Article deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listPublished,
  getPublished,
  listAll,
  getOne,
  create,
  update,
  remove,
};
