import fs from 'fs'
import { join } from 'path'
import {
  IAdContract,
  IAdContractDefinition
} from '../build/AdContract.sol-AdContract'
import BigNumber from 'bignumber.js'
let Web3 = require('web3')
let web3 = new Web3()
web3.setProvider(process.env.ETH_PROVIDER || require('ganache-cli').provider())
jest.setTimeout(100000)
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
    it('should set autoApprove', async () => {
      await adContract.methods.setAutoApprove(false).send({ from: accounts[0] })
      const ap = await adContract.methods.autoApprove().call()
      expect(ap).toBe(false)
    })
    it('should buy ad time (autoApprove)', async (done) => {
      const testHash = 'test-hash'
      const method = adContract.methods
        .buyAdTime(testHash)
      const gas = new BigNumber(await method.estimateGas({ from: accounts[0], value: '100000000' }))
      const gasPlusValue = gas.plus(costPerHour)
      const txResult = method.send({
        from: accounts[1],
        value: costPerHour,
        gas: gasPlusValue.toString()
      })
      txResult.on('receipt', async (receipt: any) => {
        expect(receipt.events.AdRequest).toBeTruthy()
        console.log(receipt.events.AdRequest)
        expect(receipt.events.AdRequest.returnValues.ipfsHash).toEqual(testHash)
        expect(receipt.events.AdRequest.returnValues.approved).toEqual(true)
        const adCount = await adContract.methods.adCount().call()
        expect(adCount.valueOf()).toEqual('1')
        done()
      })
    })
  })
})
