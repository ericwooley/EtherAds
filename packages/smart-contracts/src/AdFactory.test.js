var ganache = require('ganache-cli')
var fs = require('fs')
var {join} = require('path')
var Web3 = require('web3')
var web3 = new Web3()
web3.setProvider(ganache.provider())

const ABI = JSON.parse(fs.readFileSync(join(__dirname, '../build/AdFactory.sol-AdFactory/interface.json')).toString())
const bytecode = '0x' + fs.readFileSync(join(__dirname, '../build/AdFactory.sol-AdFactory/bytecode.json')).toString()

describe('AdFactory', () => {
  let accounts = []
  beforeAll(async () => {
    accounts = await web3.eth.personal.getAccounts()
  })
  it('should deploy', async () => {
    const AdFactory = new web3.eth.Contract(ABI)
    let contract = await AdFactory.deploy({data: bytecode, arguments: [accounts[0]]}).send({
      from: accounts[0],
      gas: '1000000'
    })
    const donationAddress = await contract.methods.donationAddress().call()
    expect(donationAddress).toEqual(accounts[0])
  })
})
