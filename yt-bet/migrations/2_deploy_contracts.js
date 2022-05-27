var Betting = artifacts.require("ytbet");
module.exports = function(deployer) {
    deployer.deploy(Betting,{value:10});
  };