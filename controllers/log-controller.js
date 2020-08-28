const express = require('express');
const router = express.Router();
const Log = require('../db').import('../models/log');

const validateSession = require('../middleware/validate-session');


module.exports = router;