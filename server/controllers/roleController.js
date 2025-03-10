const SecurityRole = require('../models/SecurityRole');

const listRoles = async (req, res, next) => {
  try {
    const roles = await SecurityRole.find().sort({ roleName: 1 });
    res.json({ success: true, count: roles.length, data: roles });
  } catch (error) {
    next(error);
  }
};

module.exports = { listRoles };
