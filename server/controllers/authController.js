const crypto = require('crypto');
const User = require('../models/User');
const SecurityToken = require('../models/SecurityToken');
const { hashPassword, verifyPassword, generateSecureTokenId } = require('../services/cryptoService');
const { signToken } = require('../services/jwtManager');

const register = async (req, res, next) => {
  try {
    const { username, email, password, role = 'DEVELOPER' } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: 'ValidationError', message: 'All fields required.' });
    }

    const { hash, salt } = hashPassword(password);
    const userId = `usr_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;

    const user = await User.create({
      userId,
      username,
      email,
      passwordHash: hash,
      salt,
      role
    });

    res.status(201).json({
      success: true,
      message: 'User registered with cryptographic PBKDF2 salt.',
      data: { userId: user.userId, username: user.username, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password, deviceFingerprint } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, error: 'InvalidCredentials', message: 'Invalid email or password.' });
    }

    // Check account lockout
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return res.status(423).json({
        success: false,
        error: 'AccountLocked',
        message: `Account is locked until ${user.lockedUntil.toISOString()} due to excessive failed attempts.`
      });
    }

    const isValid = verifyPassword(password, user.passwordHash, user.salt);
    if (!isValid) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min lock
      }
      await user.save();
      return res.status(401).json({ success: false, error: 'InvalidCredentials', attemptsRemaining: Math.max(0, 5 - user.failedLoginAttempts) });
    }

    // Reset failed counter
    user.failedLoginAttempts = 0;
    user.lockedUntil = null;
    await user.save();

    const jti = generateSecureTokenId();
    const secret = process.env.JWT_SECRET || 'super_secret_cybershield_signing_key_2025';
    const token = signToken({ userId: user.userId, username: user.username, role: user.role, jti }, secret, 3600);

    await SecurityToken.create({
      jti,
      userId: user.userId,
      ipAddress: req.ip || '127.0.0.1',
      deviceFingerprint: deviceFingerprint || 'Web Console Client',
      expiresAt: new Date(Date.now() + 3600 * 1000)
    });

    res.json({
      success: true,
      token,
      data: { userId: user.userId, username: user.username, role: user.role, jti }
    });
  } catch (error) {
    next(error);
  }
};

const listSessions = async (req, res, next) => {
  try {
    const sessions = await SecurityToken.find({ revoked: false }).sort({ createdAt: -1 });
    res.json({ success: true, count: sessions.length, data: sessions });
  } catch (error) {
    next(error);
  }
};

const revokeSession = async (req, res, next) => {
  try {
    const { id } = req.params;
    const session = await SecurityToken.findOneAndUpdate(
      { jti: id },
      { revoked: true, revokedReason: 'Operator manual revocation' },
      { new: true }
    );

    if (!session) return res.status(404).json({ success: false, error: 'NotFound' });

    res.json({ success: true, message: 'Session token invalidated across cluster.', data: session });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, listSessions, revokeSession };
