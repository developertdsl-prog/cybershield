import React from 'react';

export default function SocMetricsOverview({ metrics }) {
  return (
    <div className="soc-metrics-grid">
      <div className="soc-card">
        <div className="metric-hdr">Active Authenticated Sessions</div>
        <div className="metric-val" style={{ color: 'var(--cyber-cyan)' }}>{metrics?.activeSessions || 14}</div>
      </div>
      <div className="soc-card">
        <div className="metric-hdr">Quarantined Malicious IPs</div>
        <div className="metric-val" style={{ color: 'var(--cyber-red)' }}>{metrics?.blockedIps || 2}</div>
      </div>
      <div className="soc-card">
        <div className="metric-hdr">WAF Blocked Threats (24h)</div>
        <div className="metric-val" style={{ color: 'var(--cyber-amber)' }}>{metrics?.totalThreats24h || 2}</div>
      </div>
      <div className="soc-card">
        <div className="metric-hdr">Zero-Trust Compliance Score</div>
        <div className="metric-val" style={{ color: 'var(--cyber-green)' }}>{metrics?.zeroTrustHealth || '99.4%'}</div>
      </div>
    </div>
  );
}
