const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log("🚀 ~ register ~ firstName:", firstName)
    const user = await authService.registerUser(firstName, lastName, email, password);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  register,
  login
};
