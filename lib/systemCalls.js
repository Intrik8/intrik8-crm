
function GetSystemName(err, systemName){
  var modulesInstalled = require('../cfg/systemConfig.json').modules;

}

/*
  Function used to get the modules installed

*/
function GetModulesInstalled(err, modulesEnabled){
  var modulesInstalled = require('../cfg/systemConfig.json').modules;
  var tempArray = [];
  var modulesEnabled = [];

  for(var i in modulesInstalled){
    if(modulesInstalled[i].active == true){
      modulesEnabled.push(modulesInstalled[i].name);
      }
    }
  /*
  TODO: Add in ability to clear out duplicates so multiple modules don't load
  */
  return modulesEnabled;
}
exports.GetModulesInstalled = GetModulesInstalled();
