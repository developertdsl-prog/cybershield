const test = require('node:test');
const assert = require('node:assert');
const { evaluateAccess } = require('../services/policyEngine');

test('Policy Engine: grants access based on matching ALLOW policy', () => {
  const principal = { role: 'SEC_OPS', mfaVerified: true };
  const policies = [
    { policyId: 'P1', active: true, effect: 'ALLOW', principal: { role: 'SEC_OPS' }, resource: 'threats', action: 'read' }
  ];

  const result = evaluateAccess(principal, 'threats', 'read', {}, policies, new Map());
  assert.strictEqual(result.allowed, true);
  assert.strictEqual(result.effect, 'ALLOW');
});

test('Policy Engine: enforces strict DENY precedence over ALLOW', () => {
  const principal = { role: 'DEVELOPER' };
  const policies = [
    { policyId: 'P1', active: true, effect: 'ALLOW', principal: { role: '*' }, resource: 'secrets', action: 'read' },
    { policyId: 'P2', active: true, effect: 'DENY', principal: { role: 'DEVELOPER' }, resource: 'secrets', action: 'read' }
  ];

  const result = evaluateAccess(principal, 'secrets', 'read', {}, policies, new Map());
  assert.strictEqual(result.allowed, false);
  assert.strictEqual(result.effect, 'DENY');
});
