const RoadwayIlluminationService = require('../services/RoadwayIlluminationService');
const rateHigwayBuilding=require('../services/HigwayBuildingService');
const { validateRoadwayAssetInput } = require('../utils/validator');
const {validateHighwayBuilding}= require('../utils/validator');

exports.rateRoadwayAsset = (req, res) => {
  const { installedDate, lastMaintained } = req.body;

  const validationError = validateRoadwayAssetInput(installedDate, lastMaintained);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const rating = RoadwayIlluminationService.getAssetRating(installedDate, lastMaintained);

  return res.status(200).json({ rating });
};

exports.rateHigwayBuilding= (req,res)=>{
  const { installedDate, fciIndex } = req.body;

  const validationError = validateHighwayBuilding(installedDate, fciIndex);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const rating = rateHigwayBuilding.getAssetRating(installedDate, fciIndex);

  return res.status(200).json({ rating });
}