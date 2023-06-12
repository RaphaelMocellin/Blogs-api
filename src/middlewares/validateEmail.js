module.exports = (req, res, next) => {
    const { email } = req.body;

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' }); 
  }

    next();
};