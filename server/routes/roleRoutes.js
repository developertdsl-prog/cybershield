const express = require('express');
const router = express.Router();
const verifyJwt = require('../middleware/verifyJwt');
const { listRoles } = require('../controllers/roleController');

router.use(verifyJwt);
router.get('/', listRoles);

module.exports = router;
