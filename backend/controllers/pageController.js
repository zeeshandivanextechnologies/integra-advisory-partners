const { getPage, savePage } = require('../services/pageService');

// Public: the website reads page content from here.
// content is null until the page is saved from the admin, so the website
// keeps showing its built-in content.
const getPageContent = async (req, res, next) => {
  try {
    const page = await getPage(req.params.slug);
    res.status(200).json({
      success: true,
      slug: req.params.slug,
      content: page ? page.content : null,
      updatedAt: page ? page.updated_at : null,
    });
  } catch (err) {
    next(err);
  }
};

// Admin only
const updatePageContent = async (req, res, next) => {
  try {
    const page = await savePage(req.params.slug, req.body.content, req.admin.id);
    res.status(200).json({
      success: true,
      message: 'Page saved',
      slug: page.slug,
      content: page.content,
      updatedAt: page.updated_at,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPageContent,
  updatePageContent,
};
