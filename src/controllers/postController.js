const { postService } = require('../services');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const count = await postService.verifyIds(categoryIds);
  
  if (count !== categoryIds.length) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
};

module.exports = {
  createPost,
};