import contract from 'truffle-contract'
import AdLogFactoryDefinition from './json/AdLogFactory.json'
import * as Web3 from 'web3'
import {
  ContractInterface,
  ContractMethod,
  MethodOptions
} from './contract-base'
import createContract from 'truffle-contract'
export interface DeployAdReceipt {
  tx: string
  logs: { args: { owner: string; addr: string } }[]
}
export interface AdBackLogFactoryInterface {
  donationAddress: () => Promise<any>
  listings: any // (address?: string) => Promise<any>
  deployAd: ContractMethod<
    (
      weiPerSecond: number | string | BigNumber,
      autoApprove: boolean,
      options?: MethodOptions
    ) => Promise<DeployAdReceipt>
  >
  ContractCreated: Function & {
    get: (
      callback: (error: Error, events: IContractCreatedEvent[]) => any
    ) => any
    watch: (
      callback: (error: Error, event: IContractCreatedEvent) => any
    ) => any
  }
}
export interface IContractCreatedEvent {
  args: {
    addr: string
    owner: string
  }
}
export default async function getAdBackLogFactory(web3: Web3) {
  const adLogFactoryDefinition: any = AdLogFactoryDefinition
  const AdBackLogFactory: ContractInterface<
    AdBackLogFactoryInterface
  > = contract(AdLogFactoryDefinition)
  AdBackLogFactory.setProvider(web3.currentProvider)
  const adBackLogFactory = await AdBackLogFactory.deployed()
  const donationAddress = await adBackLogFactory.donationAddress()
  const listings = await adBackLogFactory.listings(web3.eth.accounts[0], 0)
  console.log('donationAddress', donationAddress, 'listings', listings)
  return adBackLogFactory
}

const getDeployedNetworkAddress = (web3: Web3) =>
  new Promise<string>((resolve, reject) => {
    web3.version.getNetwork((error, networkId) => {
      if (error) {
        return reject(error)
      }
      return resolve(networkId)
    })
  })

export async function getWeb3AdBackLogFactory(web3: Web3) {
  const adLogFactoryDefinition: any = AdLogFactoryDefinition
  const networkId: string = await getDeployedNetworkAddress(web3)
  const address = adLogFactoryDefinition.networks[networkId].address
  const adBackLogFactory: AdBackLogFactoryInterface = await web3.eth
    .contract(adLogFactoryDefinition.abi)
    .at(address)
  return adBackLogFactory
}
export async function getDeployedAdContracts(
  web3: Web3,
  options?: { owner: string }
) {
  const adLogFactory = await getWeb3AdBackLogFactory(web3)
  console.log('fetching events')
  const events = await new Promise((resolve, reject) =>
    adLogFactory
      .ContractCreated(options, { from: 0, to: 'pending' })
      .get((error, result) => {
        if (error) {
          return reject(error)
        }
        return resolve(result)
      })
  )
  console.log('got events', events)
  return events
}
