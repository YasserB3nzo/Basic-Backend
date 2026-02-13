const jwt = require('jsonwebtoken');

const middleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            const token = authHeader.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded; // Attach the decoded user information to the request object

            next(); // move to the next route handler
        } catch (error) {
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ error: 'No token found' });
    }
};

module.exports = { middleware };