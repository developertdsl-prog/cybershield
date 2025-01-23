const mongoose = require('mongoose');

const SecurityTokenSchema = new mongoose.Schema({
  jti: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  ipAddress: {
    type: String,
    default: '127.0.0.1'
  },
  deviceFingerprint: {
    type: String,
    default: 'Generic Web Agent'
  },
  revoked: {
    type: Boolean,
    default: false,
    index: true
  },
  revokedReason: String,
  expiresAt: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('SecurityToken', SecurityTokenSchema);
