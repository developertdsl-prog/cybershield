const express = require('express');
const router = express.Router();
const verifyJwt = require('../middleware/verifyJwt');
const { register, login, listSessions, revokeSession } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/sessions', verifyJwt, listSessions);
router.post('/revoke-session/:id', verifyJwt, revokeSession);

module.exports = router;
