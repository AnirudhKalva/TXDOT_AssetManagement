// Determines if the asset was recently maintained
const wasRecentlyMaintained = (lastMaintained) => {
    const now = new Date();
    const maintainedDate = new Date(lastMaintained);
    const diffInMs = now - maintainedDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
    return diffInDays <= 540; // 18 months
  };
  const getAssetAge= (installedDate)=>{
    const now = new Date();
    const date= new Date(installedDate);
    const age = now.getFullYear()-date.getFullYear();
    return age; 
  }
  
  // Returns asset rating based on age and last maintenance date
  const getAssetRating = (installedDate, lastMaintained) => {
    const age = getAssetAge(installedDate);
    const recentlyMaintained = wasRecentlyMaintained(lastMaintained);
    console.log(age);
  
    if (age < 30) return "Good";
  
    if (age >= 30 && age < 40) {
      return recentlyMaintained ? "Good" : "Fair";
    }
  
    return recentlyMaintained ? "Fair" : "Poor";
  };
  
  module.exports = {
    getAssetRating,
    wasRecentlyMaintained, 
    getAssetAge,
  };
  