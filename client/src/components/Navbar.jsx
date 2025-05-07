import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="soc-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className="soc-logo">CYBERSHIELD</span>
        <span className="waf-pill">WAF ACTIVE &bull; ZERO-TRUST</span>
      </div>

      <div className="soc-nav-tabs">
        <button className={`soc-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          SOC Overview
        </button>
        <button className={`soc-tab ${activeTab === 'threats' ? 'active' : ''}`} onClick={() => setActiveTab('threats')}>
          WAF Threat Feed
        </button>
        <button className={`soc-tab ${activeTab === 'policies' ? 'active' : ''}`} onClick={() => setActiveTab('policies')}>
          ABAC Policies
        </button>
        <button className={`soc-tab ${activeTab === 'sessions' ? 'active' : ''}`} onClick={() => setActiveTab('sessions')}>
          Session Revocation
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--cyber-green)' }}>
          SEC_ADMIN (SUPER_ADMIN)
        </span>
      </div>
    </nav>
  );
}
