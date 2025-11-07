const express = require('express');
const router = express.Router();

router.use('/users', require('./users.Routes'));
router.use('/auth', require('./auth.Routes'));
router.use('/activities', require('./activities.Routes'));
router.use('/credentials', require('./credentials.Routes'));

module.exports = router;