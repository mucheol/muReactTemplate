import express = require('express');
import authRoutes = require('./auth.routes');

const router = express.Router();

router.use('/auth', authRoutes);

export = router;
