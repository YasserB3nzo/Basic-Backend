const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const isAdminController = require('../Controller/adminController');  
const { middleware } = require('../AuthMiddleware/authMiddleware'); // Import the middleware function

router.get('/getUsers', middleware, isAdminController.getUsers);  
router.post('/register', userController.registerUser);
router.post('/login', userController.login);

module.exports = router;
