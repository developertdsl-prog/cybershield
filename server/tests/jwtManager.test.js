const test = require('node:test');
const assert = require('node:assert');
const { signToken, verifyToken } = require('../services/jwtManager');

test('JWT Manager: signs and decodes valid token payload', () => {
  const secret = 'test_secret_key_123';
  const payload = { userId: 'usr_991', role: 'SEC_OPS' };

  const token = signToken(payload, secret, 3600);
  assert.ok(token);

  const decoded = verifyToken(token, secret);
  assert.strictEqual(decoded.userId, 'usr_991');
  assert.strictEqual(decoded.role, 'SEC_OPS');
});

test('JWT Manager: rejects tampered token signature', () => {
  const secret = 'test_secret_key_123';
  const token = signToken({ user: 'alice' }, secret, 3600);
  const tampered = token.slice(0, -4) + 'abcd';

  assert.throws(() => {
    verifyToken(tampered, secret);
  }, /Invalid token signature/);
});
