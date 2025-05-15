import React, { useState } from 'react';

export default function SimulateThreatModal({ isOpen, onClose }) {
  const [testPayload, setTestPayload] = useState('1 UNION SELECT * FROM users');
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleTest = (e) => {
    e.preventDefault();
    const isSqli = /UNION|SELECT/i.test(testPayload);
    setResult(isSqli ? { blocked: true, threat: 'SQLI_ATTEMPT', code: 403 } : { blocked: false, code: 200 });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>WAF Payload Inspection Simulator</h3>
        <form onSubmit={handleTest}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>Test Payload</label>
            <textarea
              rows={3}
              style={{ width: '100%', padding: '8px', background: '#05070a', border: '1px solid var(--border-line)', color: '#fff', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
              value={testPayload}
              onChange={(e) => setTestPayload(e.target.value)}
            />
          </div>

          {result && (
            <div style={{ padding: '10px', borderRadius: '6px', background: result.blocked ? 'rgba(244,63,94,0.15)' : 'rgba(16,185,129,0.15)', border: `1px solid ${result.blocked ? '#f43f5e' : '#10b981'}`, marginBottom: '14px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              {result.blocked ? `[BLOCKED ${result.code}] Signature: ${result.threat}` : `[PERMITTED ${result.code}] Clean Payload`}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button type="button" className="soc-tab" onClick={onClose}>Close</button>
            <button type="submit" className="btn-cyber">Scan With WAF</button>
          </div>
        </form>
      </div>
    </div>
  );
}
