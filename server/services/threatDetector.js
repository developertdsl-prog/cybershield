const SQLI_PATTERNS = [
  /(\b(UNION(\s+ALL)?|SELECT|INSERT|UPDATE|DELETE|DROP|ALTER)\b)/i,
  /('|")\s*(OR|AND)\s*('|")?1('|")?\s*=\s*('|")?1/i,
  /--|\/\*|\*\//
];

const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /onerror\s*=/gi,
  /onload\s*=/gi
];

const scanPayload = (text) => {
  if (typeof text !== 'string') text = JSON.stringify(text || '');

  for (const p of SQLI_PATTERNS) {
    if (p.test(text)) {
      return { isThreat: true, type: 'SQLI_ATTEMPT', severity: 'CRITICAL', pattern: p.toString() };
    }
  }

  for (const p of XSS_PATTERNS) {
    if (p.test(text)) {
      return { isThreat: true, type: 'XSS_DETECTED', severity: 'HIGH', pattern: p.toString() };
    }
  }

  return { isThreat: false };
};

module.exports = { scanPayload };
