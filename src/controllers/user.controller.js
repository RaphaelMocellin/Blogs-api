const { UserService } = require('../services');

const getAll = async (_req, res) => {
  try {
    const users = await UserService.getAll();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

// const getByEmailAndPassword = async (req, res) => {
//     try {
//       const { email, password } = req.query;
//       const user = await UserService.getByIdAndEmail(email, password);
  
//       if (!user) return res.status(400).json({ message: 'Invalid fields' });
  
//       return res.status(200).json(user);
//     } catch (e) {
//       console.log(e.message);
//       res.status(500).json({ message: 'Deu ruim' });
//     }
//   };

module.exports = {
  getAll,
//   getByEmailAndPassword
};