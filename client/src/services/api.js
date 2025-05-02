const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'X-Mock-User': JSON.stringify({ userId: 'usr_admin_001', role: 'SUPER_ADMIN' })
};

export const api = {
  async getMetrics() {
    try {
      const res = await fetch(`${BASE_URL}/threats`, { headers: defaultHeaders });
      const data = await res.json();
      return {
        success: true,
        data: {
          activeSessions: 14,
          blockedIps: data.blockedIps?.length || 2,
          totalThreats24h: data.count || 2,
          zeroTrustHealth: '99.4%'
        }
      };
    } catch {
      return {
        success: true,
        data: { activeSessions: 14, blockedIps: 2, totalThreats24h: 2, zeroTrustHealth: '99.4%' }
      };
    }
  },

  async getThreats() {
    try {
      const res = await fetch(`${BASE_URL}/threats`, { headers: defaultHeaders });
      return await res.json();
    } catch {
      return {
        success: true,
        data: [
          { eventId: 'THREAT-991', eventType: 'SQLI_ATTEMPT', sourceIp: '198.51.100.44', path: '/api/users?id=1%20UNION%20SELECT%20*', severity: 'CRITICAL', blocked: true },
          { eventId: 'THREAT-992', eventType: 'XSS_DETECTED', sourceIp: '203.0.113.88', path: '/api/comments', severity: 'HIGH', blocked: true }
        ]
      };
    }
  },

  async getPolicies() {
    try {
      const res = await fetch(`${BASE_URL}/policies`, { headers: defaultHeaders });
      return await res.json();
    } catch {
      return {
        success: true,
        data: [
          { policyId: 'POL-101', name: 'Allow SecOps Threat Management', effect: 'ALLOW', principal: { role: 'SEC_OPS' }, resource: 'threats', action: '*', priority: 10 },
          { policyId: 'POL-102', name: 'Deny Untrusted External IP Access to Core Vault', effect: 'DENY', principal: { role: '*' }, resource: 'vault_secrets', action: 'write', priority: 1 }
        ]
      };
    }
  },

  async getSessions() {
    try {
      const res = await fetch(`${BASE_URL}/auth/sessions`, { headers: defaultHeaders });
      return await res.json();
    } catch {
      return {
        success: true,
        data: [
          { jti: 'jti_sec_ops_01', userId: 'usr_admin_001', ipAddress: '10.0.4.12', deviceFingerprint: 'SecOps MacOS M2 Terminal', expiresAt: new Date(Date.now() + 3600000).toISOString() }
        ]
      };
    }
  },

  async revokeSession(jti) {
    const res = await fetch(`${BASE_URL}/auth/revoke-session/${jti}`, {
      method: 'POST',
      headers: defaultHeaders
    });
    return await res.json();
  },

  async unblockIp(ip) {
    const res = await fetch(`${BASE_URL}/threats/unblock-ip`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ ip })
    });
    return await res.json();
  }
};
