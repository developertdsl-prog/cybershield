const evaluateAccess = (principal, resource, action, context, policies, roleMap) => {
  let userPermissions = [];

  // Check RBAC permissions including inheritance
  if (principal.role && roleMap && roleMap.has(principal.role)) {
    const roleDef = roleMap.get(principal.role);
    userPermissions = [...(roleDef.permissions || [])];
    if (roleDef.inheritedRoles) {
      roleDef.inheritedRoles.forEach(r => {
        if (roleMap.has(r)) {
          userPermissions.push(...(roleMap.get(r).permissions || []));
        }
      });
    }
  }

  // Evaluate explicit ABAC policies
  let decision = 'DENY';
  let matchedPolicy = null;

  for (const policy of policies) {
    if (!policy.active) continue;

    // Check resource & action match (supports wildcard '*')
    const resourceMatch = policy.resource === '*' || policy.resource === resource;
    const actionMatch = policy.action === '*' || policy.action === action;

    if (resourceMatch && actionMatch) {
      // Check principal role
      if (policy.principal.role && policy.principal.role !== '*' && policy.principal.role !== principal.role) {
        continue;
      }

      // Check conditions
      if (policy.conditions) {
        if (policy.conditions.requiresMfa && !principal.mfaVerified) {
          continue;
        }
      }

      // Explicit DENY takes highest precedence
      if (policy.effect === 'DENY') {
        return { allowed: false, effect: 'DENY', policyId: policy.policyId, reason: 'Explicit DENY policy override' };
      }

      if (policy.effect === 'ALLOW') {
        decision = 'ALLOW';
        matchedPolicy = policy.policyId;
      }
    }
  }

  return {
    allowed: decision === 'ALLOW',
    effect: decision,
    policyId: matchedPolicy,
    permissions: Array.from(new Set(userPermissions))
  };
};

module.exports = { evaluateAccess };
