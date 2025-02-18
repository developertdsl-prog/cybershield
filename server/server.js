const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const wafInspector = require('./middleware/wafInspector');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const policyRoutes = require('./routes/policyRoutes');
const roleRoutes = require('./routes/roleRoutes');
const threatRoutes = require('./routes/threatRoutes');
const jwksRoutes = require('./routes/jwksRoutes');

const app = express();

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimiter({ windowMs: 60000, max: 200 }));
app.use(wafInspector);

app.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'CyberShield Zero-Trust Security Gateway',
    version: '1.0.0',
    wafState: 'ENFORCING',
    timestamp: new Date().toISOString()
  });
});

app.use('/', jwksRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/threats', threatRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`[CyberShield Gateway] Active and guarding on port ${PORT}`);
    });
  });
}

module.exports = app;
