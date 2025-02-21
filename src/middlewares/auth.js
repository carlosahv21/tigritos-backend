const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token = null;
    if (req.rawHeaders) {
        for (let i = 0; i < req.rawHeaders.length; i += 2) {
            if (req.rawHeaders[i] === 'authorization') {
                token = req.rawHeaders[i + 1];
                break;
            }
        }
    }
    
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;