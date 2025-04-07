const ThreatEvent = require('../models/ThreatEvent');
const { scanPayload } = require('../services/threatDetector');
const { isIpBlocked, recordViolation } = require('../services/ipReputationService');

const wafInspector = async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';

  // Check IP blocklist
  if (isIpBlocked(ip)) {
    return res.status(403).json({
      success: false,
      error: 'IpQuarantined',
      message: 'Your IP address is currently quarantined by CyberShield WAF.'
    });
  }

  // Scan URL query and body
  const payloadToScan = `${req.url} ${JSON.stringify(req.body || {})}`;
  const scanResult = scanPayload(payloadToScan);

  if (scanResult.isThreat) {
    recordViolation(ip);
    setImmediate(async () => {
      try {
        await ThreatEvent.create({
          eventId: `THREAT-${Date.now()}`,
          eventType: scanResult.type,
          sourceIp: ip,
          path: req.originalUrl || req.url,
          payloadSnippet: payloadToScan.slice(0, 200),
          severity: scanResult.severity,
          blocked: true
        });
      } catch (e) {
        console.error(e);
      }
    });

    return res.status(403).json({
      success: false,
      error: 'WafThreatDetected',
      message: `Request blocked by CyberShield WAF: ${scanResult.type} signature detected.`
    });
  }

  next();
};

module.exports = wafInspector;
