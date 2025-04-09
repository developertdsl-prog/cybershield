const express = require('express');
const router = express.Router();
const verifyJwt = require('../middleware/verifyJwt');
const { listThreats, unblockIpHandler } = require('../controllers/threatController');

router.use(verifyJwt);
router.get('/', listThreats);
router.post('/unblock-ip', unblockIpHandler);

module.exports = router;
