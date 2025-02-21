const mongoose = require('mongoose');
const User = require('../models/User');
const SecurityRole = require('../models/SecurityRole');
const AccessPolicy = require('../models/AccessPolicy');
const ThreatEvent = require('../models/ThreatEvent');
const { hashPassword } = require('../services/cryptoService');

const seedSecurity = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/cybershield_db';
  await mongoose.connect(uri);
  console.log('[Seed] Connected to MongoDB...');

  await Promise.all([
    User.deleteMany({}),
    SecurityRole.deleteMany({}),
    AccessPolicy.deleteMany({}),
    ThreatEvent.deleteMany({})
  ]);

  // Seed Roles
  await SecurityRole.create([
    {
      roleName: 'SUPER_ADMIN',
      description: 'Universal administrative capabilities across all tenants',
      permissions: ['*']
    },
    {
      roleName: 'SEC_OPS',
      description: 'Security operations center analyst and incident handler',
      permissions: ['threats:read', 'threats:block', 'sessions:revoke', 'policies:read']
    },
    {
      roleName: 'DEVELOPER',
      description: 'Application developer with scoped read access',
      permissions: ['users:read', 'policies:read']
    }
  ]);

  // Seed Admin User
  const { hash, salt } = hashPassword('AdminSecurePass2025!');
  await User.create({
    userId: 'usr_admin_001',
    username: 'sec_admin',
    email: 'admin@cybershield.security',
    passwordHash: hash,
    salt,
    role: 'SUPER_ADMIN',
    mfaEnabled: true
  });

  // Seed Policies
  await AccessPolicy.create([
    {
      policyId: 'POL-101',
      name: 'Allow SecOps Threat Management',
      effect: 'ALLOW',
      principal: { role: 'SEC_OPS' },
      resource: 'threats',
      action: '*',
      priority: 10
    },
    {
      policyId: 'POL-102',
      name: 'Deny Untrusted External IP Access to Core Vault',
      effect: 'DENY',
      principal: { role: '*' },
      resource: 'vault_secrets',
      action: 'write',
      conditions: { requiresMfa: true },
      priority: 1
    }
  ]);

  // Seed Threat Events
  await ThreatEvent.create([
    {
      eventId: 'THREAT-991',
      eventType: 'SQLI_ATTEMPT',
      sourceIp: '198.51.100.44',
      path: '/api/users?id=1%20UNION%20SELECT%20*',
      payloadSnippet: 'UNION SELECT password_hash FROM users',
      severity: 'CRITICAL',
      blocked: true
    },
    {
      eventId: 'THREAT-992',
      eventType: 'XSS_DETECTED',
      sourceIp: '203.0.113.88',
      path: '/api/comments',
      payloadSnippet: '<script>alert(document.cookie)</script>',
      severity: 'HIGH',
      blocked: true
    }
  ]);

  console.log('[Seed Complete] Inserted Roles, Admin, Policies, and Threat logs.');
  await mongoose.disconnect();
};

if (require.main === module) {
  seedSecurity().catch(console.error);
}

module.exports = seedSecurity;
