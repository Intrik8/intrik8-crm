


/*
  Function used to get the modules installed

*/
function GetModulesInstalled(err, modulesEnabled){
  var modulesInstalled = require('../cfg/systemConfig.json').modules;
  var modulesEnabled = [];
  for(var i in modulesInstalled){
    if(modulesInstalled[i].active == true){
      modulesEnabled.push(modulesInstalled[i].name);
    }
  }
  return modulesEnabled;
}
exports.GetModulesInstalled = GetModulesInstalled();
