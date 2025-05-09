import React from 'react';

export default function ThreatEventsFeed({ threats }) {
  return (
    <div className="soc-card" style={{ padding: '0px', marginBottom: '24px' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Real-Time WAF Threat Events Feed</h3>
        <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Inline Payload Interception</span>
      </div>

      <div className="soc-table-wrapper">
        <table className="soc-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Attack Signature</th>
              <th>Source IP</th>
              <th>Target Path</th>
              <th>Severity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {threats.map((t) => (
              <tr key={t.eventId}>
                <td className="mono" style={{ color: 'var(--cyber-cyan)' }}>{t.eventId}</td>
                <td className="mono" style={{ fontWeight: 600 }}>{t.eventType}</td>
                <td className="mono">{t.sourceIp}</td>
                <td className="mono" style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{t.path}</td>
                <td>
                  <span className={t.severity === 'CRITICAL' ? 'badge-threat-crit' : 'badge-threat-high'}>
                    {t.severity}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '12px', color: 'var(--cyber-red)', fontWeight: 700 }}>BLOCKED (403)</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
