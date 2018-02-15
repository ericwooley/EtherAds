/* tslint:disable */
/**
 * This file was auto generated by generate-types, written by https://github.com/ericwooley.
 * Edit at your own risk.
 **/

import BigNumber from 'bignumber.js'

type DeployEventEmitter<T> = { on: (event: string, callBack: Function) => IDeployPromise<T>}

interface IDeployPromise<T> {
  send: (options: {
        from: string,
        gas: number|string,
        gasPrice: number|string
      }, onError: (error: Error, transactionHash: string) => any) =>
        Promise<T> & { on: (event: string, callBack: Function) => DeployEventEmitter<T>}
}

type DeployArgs = {
  data: string,
  arguments: [BigNumber, boolean]
}

type IAdContractEvents = "OwnershipTransferred" | "allEvents";
      
interface Event {
  returnValues: Object,
  raw: {
      data: string,
      topics: string[],
  },
  event: string,
  signature: string,
  logIndex: number,
  transactionIndex: number,
  transactionHash: string,
  blockHash: string,
  blockNumber: number,
  address: string
}

interface IEventOptions {
  filter: Object,
  fromBlock: number,
  topics: string[]
}

type EventCallBack = (error: Error|void, event: Event) => any

type EventEmitter = {
  on: (type: "data"|"changed"|"error", callBack: (event:Event|Error) => any) => EventEmitter
}

export interface IAdContract {
  clone: () => IAdContract,
  deploy: (options: DeployArgs) => IDeployPromise<IAdContract>,
  options: {
    address: string,
    jsonInterface: Object[],
    data: string,
    from: string,
    gasPrice: string,
    gas: BigNumber
  },
  methods: {
    weiPerHour: () => {
      call: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: BigNumber) => any) => IDeployPromise<BigNumber>,
      send: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: BigNumber) => any) => IDeployPromise<BigNumber>,
      estimateGas: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: BigNumber) => any) => Promise<BigNumber>,
      encodeABI: () => string
    },
    buyAdTime: (ipfsHash: string) => {
      call: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: null) => any) => IDeployPromise<null>,
      send: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: null) => any) => IDeployPromise<null>,
      estimateGas: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: null) => any) => Promise<null>,
      encodeABI: () => string
    },
    owner: () => {
      call: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: string) => any) => IDeployPromise<string>,
      send: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: string) => any) => IDeployPromise<string>,
      estimateGas: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: string) => any) => Promise<string>,
      encodeABI: () => string
    },
    setPrice: (wps: BigNumber) => {
      call: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: BigNumber) => any) => IDeployPromise<BigNumber>,
      send: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: BigNumber) => any) => IDeployPromise<BigNumber>,
      estimateGas: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: BigNumber) => any) => Promise<BigNumber>,
      encodeABI: () => string
    },
    nextAvailableTimeStamp: () => {
      call: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: BigNumber) => any) => IDeployPromise<BigNumber>,
      send: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: BigNumber) => any) => IDeployPromise<BigNumber>,
      estimateGas: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: BigNumber) => any) => Promise<BigNumber>,
      encodeABI: () => string
    },
    autoApprove: () => {
      call: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: boolean) => any) => IDeployPromise<boolean>,
      send: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: boolean) => any) => IDeployPromise<boolean>,
      estimateGas: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: boolean) => any) => Promise<boolean>,
      encodeABI: () => string
    },
    transferOwnership: (newOwner: string) => {
      call: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: null) => any) => IDeployPromise<null>,
      send: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: null) => any) => IDeployPromise<null>,
      estimateGas: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: null) => any) => Promise<null>,
      encodeABI: () => string
    }
  },
  once: (eventName: IAdContractEvents, options: IEventOptions, callBack: EventCallBack) => void,
  getPastEvents: (eventName: IAdContractEvents, options: IEventOptions, callBack?: EventCallBack) => Promise<Event[]>,
  events: {
    OwnershipTransferred: (options: IEventOptions, callBack?: IEventOptions) => EventEmitter
  }
}