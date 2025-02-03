const crypto = require('crypto');

const hashPassword = (password, salt = null) => {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, generatedSalt, 10000, 64, 'sha256').toString('hex');
  return { hash, salt: generatedSalt };
};

const verifyPassword = (password, storedHash, salt) => {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
};

const generateSecureTokenId = () => {
  return `jti_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
};

module.exports = { hashPassword, verifyPassword, generateSecureTokenId };
