/**
 * CyberShield Role Taxonomy & Threat Severity Declarations
 */
const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SEC_OPS: 'SEC_OPS',
  DEVELOPER: 'DEVELOPER',
  AUDITOR: 'AUDITOR'
};

const PERMISSIONS = {
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  POLICIES_READ: 'policies:read',
  POLICIES_WRITE: 'policies:write',
  THREATS_READ: 'threats:read',
  THREATS_BLOCK: 'threats:block',
  SESSIONS_REVOKE: 'sessions:revoke'
};

const THREAT_TYPES = {
  SQLI_ATTEMPT: 'SQLI_ATTEMPT',
  XSS_DETECTED: 'XSS_DETECTED',
  BRUTE_FORCE: 'BRUTE_FORCE',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  TOKEN_REUSE: 'TOKEN_REUSE'
};

module.exports = { ROLES, PERMISSIONS, THREAT_TYPES };
