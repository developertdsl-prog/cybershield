const mongoose = require('mongoose');

const SecurityRoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  permissions: [{
    type: String
  }],
  inheritedRoles: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('SecurityRole', SecurityRoleSchema);
