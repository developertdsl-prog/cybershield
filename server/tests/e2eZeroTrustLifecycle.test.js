const test = require('node:test');
const assert = require('node:assert');
const { hashPassword, verifyPassword } = require('../services/cryptoService');
const { signToken, verifyToken } = require('../services/jwtManager');
const { evaluateAccess } = require('../services/policyEngine');
const { scanPayload } = require('../services/threatDetector');

test('E2E Zero-Trust: Password Hashing, JWT Issuance, WAF Inspection, and Policy Evaluation', () => {
  // 1. Password verification
  const { hash, salt } = hashPassword('SecurePass99!');
  assert.strictEqual(verifyPassword('SecurePass99!', hash, salt), true);

  // 2. Token issuance
  const secret = 'e2e_secret_key_2025';
  const token = signToken({ userId: 'u_123', role: 'SEC_OPS' }, secret);
  const decoded = verifyToken(token, secret);
  assert.strictEqual(decoded.userId, 'u_123');

  // 3. WAF inspection
  const clean = scanPayload('clean request body');
  assert.strictEqual(clean.isThreat, false);

  // 4. Policy evaluation
  const policies = [
    { policyId: 'P_E2E', active: true, effect: 'ALLOW', principal: { role: 'SEC_OPS' }, resource: 'logs', action: 'read' }
  ];
  const decision = evaluateAccess({ role: 'SEC_OPS' }, 'logs', 'read', {}, policies, new Map());
  assert.strictEqual(decision.allowed, true);
});
