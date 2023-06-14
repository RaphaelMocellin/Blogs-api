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

const getById = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postService.getById(id);
      if (!post) return res.status(404).json({ message: 'Post does not exist' }); 
      return res.status(200).json(post);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Ocorreu um erro' });
    }
  };

const updatePost = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const { title, content } = req.body;

  const userId = await postService.findUserIdByToken(token);
  const postId = await postService.getById(id);
  if (Number(userId) !== Number(postId.userId)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  } 

  const { type, data } = await postService.updatePost(title, content, id);
  return res.status(type).json(data);
};

const deletePost = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  const userId = await postService.findUserIdByToken(token);
  const postId = await postService.getById(id);

  if (!postId) return res.status(404).json({ message: 'Post does not exist' });

  if (Number(userId) !== Number(postId.userId)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  } 

  await postService.deletePost(id);
  return res.status(204).json();
};

const getBySearch = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await postService.getBySearch(q);
    return res.status(200).json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
  deletePost,
  getBySearch,
};