const test = require('node:test');
const assert = require('node:assert');
const { scanPayload } = require('../services/threatDetector');

test('Threat Detector: detects SQL Injection union-based signatures', () => {
  const payload = '1 UNION SELECT * FROM users';
  const result = scanPayload(payload);
  assert.strictEqual(result.isThreat, true);
  assert.strictEqual(result.type, 'SQLI_ATTEMPT');
});

test('Threat Detector: detects Cross-Site Scripting script injection', () => {
  const payload = '<script>window.location="http://evil.com"</script>';
  const result = scanPayload(payload);
  assert.strictEqual(result.isThreat, true);
  assert.strictEqual(result.type, 'XSS_DETECTED');
});

test('Threat Detector: permits clean payloads', () => {
  const payload = { username: 'john_doe', role: 'ENGINEER' };
  const result = scanPayload(payload);
  assert.strictEqual(result.isThreat, false);
});
