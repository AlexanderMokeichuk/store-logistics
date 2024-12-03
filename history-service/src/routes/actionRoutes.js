const express = require('express');
const { logActionController, getActionHistoryController, updateAction} = require('../controllers/actionController');

const router = express.Router();

router.post('/log-action', logActionController);
router.put('/update-action', updateAction);
router.get('/action-history', getActionHistoryController);

module.exports = router;