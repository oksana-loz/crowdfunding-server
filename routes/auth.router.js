const Router = require('express');
const { register, login } = require('../controllers/auth.controller');

const router = new Router();

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

module.exports = router;
