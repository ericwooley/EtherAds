import fs from 'fs'
import { join } from 'path'
import {
  IAdFactory,
  IAdFactoryDefinition
} from '../build/AdFactory.sol-AdFactory'
let ganache = require('ganache-cli')
let Web3 = require('web3')
let web3 = new Web3()
web3.setProvider(ganache.provider())

const ABI = JSON.parse(
  fs
    .readFileSync(
      join(__dirname, '../build/AdFactory.sol-AdFactory/interface.json')
    )
    .toString()
)
const byteCode =
  '0x' +
  fs
    .readFileSync(
      join(__dirname, '../build/AdFactory.sol-AdFactory/bytecode.json')
    )
    .toString()

describe('AdFactory', () => {
  let accounts: string[] = []
  beforeAll(async () => {
    accounts = await web3.eth.personal.getAccounts()
  })
  describe('deployment', () => {
    it('should deploy', async () => {
      const AdFactoryDef: IAdFactoryDefinition = new web3.eth.Contract(ABI)
      let contract: IAdFactory = await AdFactoryDef.deploy({
        data: byteCode,
        arguments: [accounts[0]]
      }).send({ from: accounts[0], gas: '1000000' })
      const donationAddress = await contract.methods.donationAddress().call()
      expect(donationAddress).toEqual(accounts[0])
    })
  })
  describe('constants', () => {
    let adFactory: IAdFactory
    beforeEach(async () => {
      const AdFactoryDef: IAdFactoryDefinition = new web3.eth.Contract(ABI)
      adFactory = await AdFactoryDef.deploy({
        data: byteCode,
        arguments: [accounts[0]]
      }).send({ from: accounts[0], gas: '1000000' })
    })
    it('should have a donation address', async () => {
      const donationAddress = await adFactory.methods.donationAddress().call()
      expect(donationAddress).toEqual(accounts[0])
    })

    it('should deploy an ad', async () => {
      const txResult = await adFactory.methods.deployAd('50000', true).send({
        from: accounts[0],
        value: '1000000'
      })
    })
  })
})
