const { userService, postService } = require('../services');

const getAll = async (_req, res) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { type, data } = await userService.createUser(displayName, email, password, image);
  return res.status(type).json(data);
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) return res.status(404).json({ message: 'User does not exist' });

  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const token = req.headers.authorization;

  const userId = await postService.findUserIdByToken(token);

  await userService.deleteUser(userId);
  return res.status(204).json();
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  deleteUser,
};