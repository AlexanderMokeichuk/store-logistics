const express = require('express');
const { logActionController, getActionHistoryController } = require('../controllers/actionController');

const router = express.Router();

router.post('/log-action', logActionController);

router.get('/action-history', getActionHistoryController);

module.exports = router;