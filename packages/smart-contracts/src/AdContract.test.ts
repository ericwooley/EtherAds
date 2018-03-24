import fs from 'fs'
import { join } from 'path'
import {
  IAdContract,
  IAdContractDefinition
} from '../build/AdContract.sol-AdContract'
let ganache = require('ganache-cli')
let Web3 = require('web3')
let web3 = new Web3()
web3.setProvider(ganache.provider())

const ABI = JSON.parse(
  fs
    .readFileSync(
      join(__dirname, '../build/AdContract.sol-AdContract/interface.json')
    )
    .toString()
)
const byteCode =
  '0x' +
  fs
    .readFileSync(
      join(__dirname, '../build/AdContract.sol-AdContract/bytecode.json')
    )
    .toString()

describe('AdContract', () => {
  let accounts: string[] = []
  beforeAll(async () => {
    accounts = await web3.eth.personal.getAccounts()
  })
  describe('deployment', () => {
    it('should deploy', async () => {
      const AdFactoryDef: IAdContractDefinition = new web3.eth.Contract(ABI)
      const costPerHour = '50000'
      let contract: IAdContract = await AdFactoryDef.deploy({
        data: byteCode,
        arguments: [costPerHour, true]
      }).send({ from: accounts[0], gas: '1000000' })
      const wph = await contract.methods.weiPerHour().call()
      expect(wph.valueOf()).toEqual(costPerHour)
    })
  })
  describe('constants', () => {
    let adContract: IAdContract
    const costPerHour = '500000'
    beforeEach(async () => {
      const AdFactoryDef: IAdContractDefinition = new web3.eth.Contract(ABI)
      adContract = await AdFactoryDef.deploy({
              data: byteCode,
              arguments: [costPerHour, true]
            }).send({ from: accounts[0], gas: '1000000' })
    })
    it('should have weiPerHour', async () => {
      const wph = await adContract.methods.weiPerHour().call()
      expect(wph.valueOf()).toEqual(costPerHour)
    })
    it('should have autoApprove', async () => {
      const ads = await adContract.methods.autoApprove().call()
      expect(ads).toBe(true)
    })
  })
  describe('methods', () => {
    let adContract: IAdContract
    const costPerHour = '500000'
    beforeEach(async () => {
      const AdFactoryDef: IAdContractDefinition = new web3.eth.Contract(ABI)
      adContract = await AdFactoryDef.deploy({
          data: byteCode,
          arguments: [costPerHour, true]
        }).send({ from: accounts[0], gas: '1000000' })
    })
    it('should set the price', async () => {
      const newPrice = '1000000'
      await adContract.methods.setPrice(newPrice).send({
        from: accounts[0]
      })
      const updatedPrice = await adContract.methods.weiPerHour().call()
      expect(updatedPrice.valueOf()).toBe(newPrice)
    })
  })
})
