const SecurityToken = require('../models/SecurityToken');
const { verifyToken } = require('../services/jwtManager');

const verifyJwt = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    // Bypass in test if mock header supplied
    if (process.env.NODE_ENV !== 'production' && req.headers['x-mock-user']) {
      req.user = JSON.parse(req.headers['x-mock-user']);
      return next();
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized', message: 'Bearer token required.' });
    }

    const token = authHeader.replace('Bearer ', '');
    const secret = process.env.JWT_SECRET || 'super_secret_cybershield_signing_key_2025';

    let decoded;
    try {
      decoded = verifyToken(token, secret);
    } catch (err) {
      return res.status(401).json({ success: false, error: 'InvalidToken', message: err.message });
    }

    // Verify token is not revoked in database
    if (decoded.jti) {
      const dbToken = await SecurityToken.findOne({ jti: decoded.jti });
      if (dbToken && dbToken.revoked) {
        return res.status(401).json({
          success: false,
          error: 'RevokedToken',
          message: 'This security token session has been explicitly revoked.'
        });
      }
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyJwt;
