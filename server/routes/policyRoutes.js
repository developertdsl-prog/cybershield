const express = require('express');
const router = express.Router();
const verifyJwt = require('../middleware/verifyJwt');
const { listPolicies, createPolicy, simulateEvaluation } = require('../controllers/policyController');

router.use(verifyJwt);
router.get('/', listPolicies);
router.post('/', createPolicy);
router.post('/evaluate', simulateEvaluation);

module.exports = router;
