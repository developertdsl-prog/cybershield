import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SocMetricsOverview from './components/SocMetricsOverview';
import ThreatEventsFeed from './components/ThreatEventsFeed';
import PolicyEngineMatrix from './components/PolicyEngineMatrix';
import ActiveSessionsConsole from './components/ActiveSessionsConsole';
import RolePermissionsTable from './components/RolePermissionsTable';
import SimulateThreatModal from './components/SimulateThreatModal';
import IpBlocklistManager from './components/IpBlocklistManager';
import { api } from './services/api';
import './styles/main.css';
import './styles/responsive.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState(null);
  const [threats, setThreats] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [mRes, tRes, pRes, sRes] = await Promise.all([
      api.getMetrics(),
      api.getThreats(),
      api.getPolicies(),
      api.getSessions()
    ]);

    if (mRes.success) setMetrics(mRes.data);
    if (tRes.success) setThreats(tRes.data);
    if (pRes.success) setPolicies(pRes.data);
    if (sRes.success) setSessions(sRes.data);
  };

  const handleRevoke = async (jti) => {
    const res = await api.revokeSession(jti);
    if (res.success) loadData();
  };

  const handleUnblock = async (ip) => {
    const res = await api.unblockIp(ip);
    if (res.success) loadData();
  };

  return (
    <div className="soc-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'overview' && (
        <>
          <SocMetricsOverview metrics={metrics} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Security Events</h3>
            <button className="btn-cyber" onClick={() => setIsModalOpen(true)}>
              + Test WAF Signature
            </button>
          </div>
          <ThreatEventsFeed threats={threats} />
          <IpBlocklistManager onUnblock={handleUnblock} />
          <RolePermissionsTable />
        </>
      )}

      {activeTab === 'threats' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>WAF Threat Stream</h3>
            <button className="btn-cyber" onClick={() => setIsModalOpen(true)}>
              + Test WAF Signature
            </button>
          </div>
          <ThreatEventsFeed threats={threats} />
          <IpBlocklistManager onUnblock={handleUnblock} />
        </div>
      )}

      {activeTab === 'policies' && (
        <>
          <PolicyEngineMatrix policies={policies} />
          <RolePermissionsTable />
        </>
      )}

      {activeTab === 'sessions' && (
        <ActiveSessionsConsole sessions={sessions} onRevoke={handleRevoke} />
      )}

      <SimulateThreatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
