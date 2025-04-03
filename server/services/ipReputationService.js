const blockedIps = new Set(['198.51.100.44', '203.0.113.88']);
const violationCounters = new Map();

const isIpBlocked = (ip) => {
  return blockedIps.has(ip);
};

const recordViolation = (ip) => {
  const count = (violationCounters.get(ip) || 0) + 1;
  violationCounters.set(ip, count);

  if (count >= 3) {
    blockedIps.add(ip);
    return { blocked: true, count };
  }
  return { blocked: false, count };
};

const unblockIp = (ip) => {
  blockedIps.delete(ip);
  violationCounters.delete(ip);
};

const getBlockedIpsList = () => Array.from(blockedIps);

module.exports = { isIpBlocked, recordViolation, unblockIp, getBlockedIpsList };
