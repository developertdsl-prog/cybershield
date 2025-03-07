const AccessPolicy = require('../models/AccessPolicy');
const SecurityRole = require('../models/SecurityRole');
const { evaluateAccess } = require('../services/policyEngine');

const listPolicies = async (req, res, next) => {
  try {
    const policies = await AccessPolicy.find().sort({ priority: 1 });
    res.json({ success: true, count: policies.length, data: policies });
  } catch (error) {
    next(error);
  }
};

const createPolicy = async (req, res, next) => {
  try {
    const { policyId, name, effect, principal, resource, action, conditions, priority } = req.body;
    const policy = await AccessPolicy.create({
      policyId: policyId || `POL-${Date.now().toString().slice(-4)}`,
      name,
      effect,
      principal: principal || { role: '*' },
      resource,
      action,
      conditions: conditions || {},
      priority: priority || 100
    });
    res.status(201).json({ success: true, data: policy });
  } catch (error) {
    next(error);
  }
};

const simulateEvaluation = async (req, res, next) => {
  try {
    const { principal, resource, action, context = {} } = req.body;
    const policies = await AccessPolicy.find({ active: true }).sort({ priority: 1 });
    const roles = await SecurityRole.find();

    const roleMap = new Map();
    roles.forEach(r => roleMap.set(r.roleName, r));

    const decision = evaluateAccess(principal, resource, action, context, policies, roleMap);
    res.json({ success: true, evaluation: decision });
  } catch (error) {
    next(error);
  }
};

module.exports = { listPolicies, createPolicy, simulateEvaluation };
