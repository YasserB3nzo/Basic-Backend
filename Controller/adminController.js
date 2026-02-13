const User = require('../Models/User');

exports.getUsers = async (req, res) => {
    if (req.user.isAdmin) {
        const users = await User.find({});
        res.status(200).json(users);
    } else {
        res.status(403).json({ error: "Access denied. isAdmins only!" });
    }
};

exports.deleteUser = async (req, res) => {
    if (req.user.isAdmin) {
        const userEmail = req.params.email;
        await User.findOneAndDelete({userEmail});
        res.status(200).json({ message: "User deleted successfully" });
    } else {
        res.status(403).json({ error: "Access denied. isAdmins only!" });
    }  
};