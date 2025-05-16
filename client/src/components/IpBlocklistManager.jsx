import React from 'react';

export default function IpBlocklistManager({ onUnblock }) {
  const quarantinedIps = ['198.51.100.44', '203.0.113.88'];

  return (
    <div className="soc-card" style={{ marginTop: '24px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>Quarantined Malicious CIDR / IP Addresses</h3>
      <div style={{ display: 'flex', gap: '12px' }}>
        {quarantinedIps.map((ip) => (
          <div key={ip} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: '6px' }}>
            <span className="mono" style={{ fontSize: '12px', color: '#f43f5e' }}>{ip}</span>
            <button className="btn-cyber-danger" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => onUnblock(ip)}>
              Release
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
