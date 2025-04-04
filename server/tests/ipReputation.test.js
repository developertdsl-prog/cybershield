const test = require('node:test');
const assert = require('node:assert');
const { isIpBlocked, recordViolation, unblockIp } = require('../services/ipReputationService');

test('IP Reputation: automatically quarantines IP after repeated violations', () => {
  const testIp = '192.0.2.199';
  assert.strictEqual(isIpBlocked(testIp), false);

  recordViolation(testIp);
  recordViolation(testIp);
  const finalEval = recordViolation(testIp); // 3rd violation

  assert.strictEqual(finalEval.blocked, true);
  assert.strictEqual(isIpBlocked(testIp), true);

  unblockIp(testIp);
  assert.strictEqual(isIpBlocked(testIp), false);
});
