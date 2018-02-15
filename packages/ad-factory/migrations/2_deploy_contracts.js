/* global artifacts */
var AdLogFactory = artifacts.require('./AdLogFactory.sol')

module.exports = function(deployer) {
  require('dotenv').config()
  if (!process.env.DEPLOY_ADDRESS) {
    throw new Error('process.env.DEPLOY_ADDRESS must be defined')
  }
  console.log('--')
  console.log('donation address', process.env.DEPLOY_ADDRESS)
  console.log('--')
  deployer.deploy(AdLogFactory, process.env.DEPLOY_ADDRESS)
}
