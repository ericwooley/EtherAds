/* globals artifacts, contract, it, assert, describe */
var AdBackLogFactory = artifacts.require('../contracts/AdLogFactory.sol')
var AdBackLog = artifacts.require('../contracts/AdBackLog.sol')

const getContractEvents = (factoryInstance, accounts) =>
  new Promise((resolve, reject) =>
    factoryInstance
      .ContractCreated(
        { owner: accounts[0] },
        { fromBlock: 0, toBlock: 'pending' }
      )
      .get((err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
  )
contract('AdBackLog Factory', function(accounts) {
  describe('deployment', () => {
    it('should deploy an ad, and get the events', async () => {
      const weiPerHour = 500
      const factoryInstance = await AdBackLogFactory.deployed()
      const myContractsBefore = await getContractEvents(
        factoryInstance,
        accounts
      )
      await factoryInstance.deployAd.sendTransaction(weiPerHour, true, {
        value: 100000
      })
      const myContractEvents = await getContractEvents(
        factoryInstance,
        accounts
      )
      assert.notEqual(myContractEvents.length, myContractsBefore.length)
      for (var i = 0; i < myContractEvents.length; i++) {
        var event = myContractEvents[i]
        if (event.args.owner === accounts[0]) {
          const adBackLog = AdBackLog.at(event.args.addr)
          const wph = await adBackLog.weiPerHour.call()

          return assert.equal(weiPerHour, wph.valueOf())
        }
      }
      throw new Error('contract event not found')
    })
  })
})
