const User = require('../Models/User');
// import bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const hash = await bcrypt.genSalt(10);
        const newpass = await bcrypt.hash(password, hash);
        const newUser = new User({ name, email, password: newpass, isAdmin: isAdmin || false });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.login = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        else if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin}, // The "Payload"
            JWT_SECRET,                             // Your Secret Key
            { expiresIn: '1d' }                      // Token duration
        );

        res.status(200).json({ message: "Login success", token });
        // res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}