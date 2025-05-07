const roadwayUtils=require('./RoadwayIlluminationService');
 
 const getAssetRating = (installedDate, fciIndex) => {
    const age= roadwayUtils.getAssetAge(installedDate);
    if (age < 30 && fciIndex <= 5) return "Good";
  
    if (age >= 30 && age < 45 && fciIndex < 15) {
      return  "Fair";
    }
    else return  "Poor";
  };
  
  module.exports = {
    getAssetRating,
  };
  