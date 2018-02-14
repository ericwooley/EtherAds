/* global artifacts */
var AdLogFactory = artifacts.require('./AdLogFactory.sol')

module.exports = function(deployer) {
  deployer.deploy(AdLogFactory)
}
