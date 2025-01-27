const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  actorId: {
    type: String,
    required: true,
    index: true
  },
  action: {
    type: String,
    required: true
  },
  targetResource: {
    type: String,
    required: true
  },
  outcome: {
    type: String,
    enum: ['SUCCESS', 'DENIED', 'BLOCKED'],
    default: 'SUCCESS'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, { timestamps: false });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
