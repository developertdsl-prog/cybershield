const express = require('express');
const router = express.Router();
const { getJwks } = require('../controllers/jwksController');

router.get('/.well-known/jwks.json', getJwks);

module.exports = router;
