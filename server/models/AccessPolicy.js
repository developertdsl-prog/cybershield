const mongoose = require('mongoose');

const AccessPolicySchema = new mongoose.Schema({
  policyId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  effect: {
    type: String,
    enum: ['ALLOW', 'DENY'],
    required: true
  },
  principal: {
    role: String,
    userId: String
  },
  resource: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  conditions: {
    ipSubnet: String,
    requiresMfa: Boolean,
    maxTimeOfDay: String
  },
  priority: {
    type: Number,
    default: 100
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('AccessPolicy', AccessPolicySchema);
