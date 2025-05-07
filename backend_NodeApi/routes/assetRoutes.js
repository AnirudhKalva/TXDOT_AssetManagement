const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

router.post('/rate/roadway', assetController.rateRoadwayAsset);
router.post('/rate/highwaybuilding', assetController.rateHigwayBuilding);

module.exports = router;
