import React from 'react';

export default function ActiveSessionsConsole({ sessions, onRevoke }) {
  return (
    <div className="soc-card" style={{ padding: '0px' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-line)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Active JWT Security Sessions</h3>
      </div>
      <div className="soc-table-wrapper">
        <table className="soc-table">
          <thead>
            <tr>
              <th>Token JTI</th>
              <th>User ID</th>
              <th>Client IP</th>
              <th>Device Fingerprint</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.jti}>
                <td className="mono" style={{ color: 'var(--cyber-cyan)' }}>{s.jti}</td>
                <td className="mono">{s.userId}</td>
                <td className="mono">{s.ipAddress}</td>
                <td style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{s.deviceFingerprint}</td>
                <td>
                  <button className="btn-cyber-danger" onClick={() => onRevoke(s.jti)}>
                    Revoke Token
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
