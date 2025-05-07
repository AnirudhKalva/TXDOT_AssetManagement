exports.validateRoadwayAssetInput = (installedDate, lastMaintained) => {
    if (!Date.parse(installedDate)) {
      return "installedDate must be a valid date string (YYYY-MM-DD)";
    }
  
    if (!Date.parse(lastMaintained)) {
      return "lastMaintained must be a valid date string (YYYY-MM-DD)";
    }
  
    return null;
  };

  exports.validateHighwayBuilding  = (installedDate, fciIndex) => {
    if (!Date.parse(installedDate)) {
      return "installedDate must be a valid date string (YYYY-MM-DD)";
    }
  
    if (typeof fciIndex!=="number") {
      return "fciIndex must be a number";
    }
  
    return null;
  };
  