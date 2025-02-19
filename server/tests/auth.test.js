const test = require('node:test');
const assert = require('node:assert');
const { ROLES, PERMISSIONS } = require('../config/securityConstants');

test('Security Constants: declares core role hierarchy and permission taxonomy', () => {
  assert.ok(ROLES.SUPER_ADMIN);
  assert.ok(ROLES.SEC_OPS);
  assert.ok(PERMISSIONS.USERS_WRITE);
  assert.ok(PERMISSIONS.THREATS_BLOCK);
});
