import contract from 'truffle-contract'
import AdBackLog from './json/AdBackLog.json'
import * as Web3 from 'web3'
import { ContractInterface } from './contract-base'
import { BigNumber } from 'bignumber.js'
interface Ad {
  startTime: number | BigNumber
  endTime: number | BigNumber
  ipfsHash: string
  approved: boolean
}
export interface AdBackLogInterface {
  address: string
  owner: () => Promise<string>
  weiPerHour: () => Promise<BigNumber>
  autoApprove: () => Promise<boolean>
  ads: () => Promise<Ad[]>
  setPrice: (weiPerSecond: BigNumber) => Promise<void>
  buyAdTime: (ipfsHash: string) => Promise<void>
  nextAvailableTimeStamp: () => Promise<BigNumber>
  setProvider: (provider: any) => void
  constructor(wps: BigNumber, autoApprove: boolean): Promise<any>
}

export default async function getAdBackLog(web3: Web3, address: string) {
  const AdBackLogContract: ContractInterface<AdBackLogInterface> = contract(
    AdBackLog
  )
  AdBackLogContract.setProvider(web3.currentProvider)
  const adBackLog = await AdBackLogContract.at(address)

  return adBackLog
}
