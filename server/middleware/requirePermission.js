const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    // Super Admin has universal access
    if (req.user.role === 'SUPER_ADMIN') return next();

    const userPerms = req.user.permissions || [];
    if (!userPerms.includes(permission)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: `Missing required security permission: ${permission}`
      });
    }

    next();
  };
};

module.exports = requirePermission;
