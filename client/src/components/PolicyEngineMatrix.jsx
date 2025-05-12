import React from 'react';

export default function PolicyEngineMatrix({ policies }) {
  return (
    <div className="soc-card" style={{ padding: '0px' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-line)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700 }}>ABAC Access Policy Matrix</h3>
      </div>
      <div className="soc-table-wrapper">
        <table className="soc-table">
          <thead>
            <tr>
              <th>Policy ID</th>
              <th>Policy Name</th>
              <th>Principal Role</th>
              <th>Resource</th>
              <th>Action</th>
              <th>Decision Effect</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((p) => (
              <tr key={p.policyId}>
                <td className="mono" style={{ color: 'var(--cyber-cyan)' }}>{p.policyId}</td>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td className="mono">{p.principal?.role || '*'}</td>
                <td className="mono">{p.resource}</td>
                <td className="mono">{p.action}</td>
                <td>
                  <span className={p.effect === 'ALLOW' ? 'badge-threat-high' : 'badge-threat-crit'} style={{ background: p.effect === 'ALLOW' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)', color: p.effect === 'ALLOW' ? '#10b981' : '#f43f5e', borderColor: p.effect === 'ALLOW' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)' }}>
                    {p.effect}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
