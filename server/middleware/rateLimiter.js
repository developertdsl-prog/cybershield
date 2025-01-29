const rateStore = new Map();

const rateLimiter = (options = { windowMs: 60000, max: 200 }) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
    const now = Date.now();

    const record = rateStore.get(ip) || { count: 0, resetAt: now + options.windowMs };

    if (now > record.resetAt) {
      record.count = 1;
      record.resetAt = now + options.windowMs;
    } else {
      record.count += 1;
    }

    rateStore.set(ip, record);

    res.setHeader('X-RateLimit-Limit', options.max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, options.max - record.count));

    if (record.count > options.max) {
      return res.status(429).json({
        success: false,
        error: 'TooManyRequests',
        message: 'Security threshold exceeded. IP rate limited.'
      });
    }

    next();
  };
};

module.exports = rateLimiter;
