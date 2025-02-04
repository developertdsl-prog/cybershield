const test = require('node:test');
const assert = require('node:assert');
const { hashPassword, verifyPassword } = require('../services/cryptoService');

test('Crypto Service: generates unique salt and verifies password accurately', () => {
  const password = 'SuperSecretTestPassword2025!';
  const { hash, salt } = hashPassword(password);

  assert.ok(hash);
  assert.ok(salt);
  assert.strictEqual(verifyPassword(password, hash, salt), true);
  assert.strictEqual(verifyPassword('WrongPassword', hash, salt), false);
});
