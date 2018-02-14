/* globals artifacts, contract, web3, assert */
var AdBackLogFactory = artifacts.require('../contracts/AdLogFactory.sol')
var AdBackLog = artifacts.require('../contracts/AdBackLog.sol')

contract('AdBackLog', function(accounts) {
  it('should set the correct price from the constructor', async () => {
    const weiPerSecond = 500
    const factoryInstance = await AdBackLogFactory.deployed()
    var event = factoryInstance.ContractCreated()
    await factoryInstance.deployAd(weiPerSecond)
    const addr = await new Promise((resolve, reject) =>
      factoryInstance.ContractCreated((error, result) => {
        if (error) return reject(error)
        if (result.args.owner === accounts[0]) resolve(result.args.addr)
      })
    )
    const adBackLog = AdBackLog.at(addr)
    const wps = await adBackLog.weiPerSecond()

    assert.equal(weiPerSecond, wps)
  })
})
