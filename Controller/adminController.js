const User = require('../Models/User');

// exports.getUsers = async (req, res) => {
//     const {data} = middleware(req, res, () => {}); // Call the middleware function to authenticate the request
//     if(!data || !data.isAdmin) {
//         return res.status(403).json({ error: 'Access denied' });
//     }
//     try {
//         const { auth } = req.headers;
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }
exports.getUsers = async (req, res) => {
    if (req.user.isAdmin) {
        const users = await User.find({});
        res.status(200).json(users);
    } else {
        res.status(403).json({ error: "Access denied. isAdmins only!" });
    }
};