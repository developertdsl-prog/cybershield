const ThreatEvent = require('../models/ThreatEvent');
const { unblockIp, isIpBlocked, getBlockedIpsList } = require('../services/ipReputationService');

const listThreats = async (req, res, next) => {
  try {
    const threats = await ThreatEvent.find().sort({ createdAt: -1 }).limit(50);
    res.json({
      success: true,
      count: threats.length,
      blockedIps: getBlockedIpsList(),
      data: threats
    });
  } catch (error) {
    next(error);
  }
};

const unblockIpHandler = (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).json({ success: false, message: 'ip required' });
  unblockIp(ip);
  res.json({ success: true, message: `IP ${ip} released from quarantine.` });
};

module.exports = { listThreats, unblockIpHandler };
