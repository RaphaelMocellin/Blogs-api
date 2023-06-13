const { postService } = require('../services');

const createPost = async (req, res) => {
  const token = req.headers.authorization;
  const { title, content, categoryIds } = req.body;

  const count = await postService.verifyIds(categoryIds);
  
  if (count !== categoryIds.length) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const { type, data } = await postService.createPost(title, content, categoryIds, token);
  return res.status(type).json(data);
};

const getAll = async (_req, res) => {
    try {
      const posts = await postService.getAll();
      return res.status(200).json(posts);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Ocorreu um erro' });
    }
  };

module.exports = {
  createPost,
  getAll,
};