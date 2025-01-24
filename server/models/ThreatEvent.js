const mongoose = require('mongoose');

const ThreatEventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  eventType: {
    type: String,
    required: true
  },
  sourceIp: {
    type: String,
    required: true,
    index: true
  },
  path: {
    type: String,
    required: true
  },
  payloadSnippet: {
    type: String,
    default: ''
  },
  severity: {
    type: String,
    enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
    default: 'HIGH',
    index: true
  },
  blocked: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ThreatEvent', ThreatEventSchema);
