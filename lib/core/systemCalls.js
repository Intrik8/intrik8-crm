
function GetSystemName(err, systemName){
  var slabsInstalled = require('../cfg/systemConfig.json').systemName;
}
function GetCoreVersion(){}
/*
  Function used to get the slabs installed

*/
function GetSlabsInstalled(err, slabsEnabled){
  var slabsInstalled = require('../cfg/systemConfig.json').slabs;
  var tempArray = [];
  var slabsEnabled = [];

  for(var i in slabsInstalled){
    if(slabsInstalled[i].active == true){
      slabsEnabled.push(slabsInstalled[i].name);
      }
    }
  /*
  TODO: Add in ability to clear out duplicates so multiple slabs don't load
  */
  return slabsEnabled;
}
exports.GetSlabsInstalled = GetSlabsInstalled();
