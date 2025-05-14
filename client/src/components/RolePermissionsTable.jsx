import React from 'react';

export default function RolePermissionsTable() {
  const roles = [
    { name: 'SUPER_ADMIN', perms: 'All Permissions (*)', inherited: 'None (Root)' },
    { name: 'SEC_OPS', perms: 'threats:read, threats:block, sessions:revoke', inherited: 'AUDITOR' },
    { name: 'DEVELOPER', perms: 'users:read, policies:read', inherited: 'None' },
    { name: 'AUDITOR', perms: 'audit:read, policies:read', inherited: 'None' }
  ];

  return (
    <div className="soc-card" style={{ padding: '0px', marginTop: '24px' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-line)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Role-Based Access Control (RBAC) Matrix</h3>
      </div>
      <div className="soc-table-wrapper">
        <table className="soc-table">
          <thead>
            <tr>
              <th>Role Identifier</th>
              <th>Scoped Permissions</th>
              <th>Inherited Hierarchy</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.name}>
                <td className="mono" style={{ fontWeight: 700, color: 'var(--cyber-green)' }}>{r.name}</td>
                <td className="mono">{r.perms}</td>
                <td style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{r.inherited}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
