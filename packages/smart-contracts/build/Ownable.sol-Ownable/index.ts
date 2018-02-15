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
  arguments: []
}

type IOwnableEvents = "OwnershipTransferred" | "allEvents";
      
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

export interface IOwnable {
  clone: () => IOwnable,
  deploy: (options: DeployArgs) => IDeployPromise<IOwnable>,
  options: {
    address: string,
    jsonInterface: Object[],
    data: string,
    from: string,
    gasPrice: string,
    gas: BigNumber
  },
  methods: {
    owner: () => {
      call: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: string) => any) => IDeployPromise<string>,
      send: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: string) => any) => IDeployPromise<string>,
      estimateGas: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: string) => any) => Promise<string>,
      encodeABI: () => string
    },
    transferOwnership: (newOwner: string) => {
      call: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: null) => any) => IDeployPromise<null>,
      send: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: null) => any) => IDeployPromise<null>,
      estimateGas: (options: {from: string, gas: string, gasPrice: string}, callBack: (error: Error|void, result: null) => any) => Promise<null>,
      encodeABI: () => string
    }
  },
  once: (eventName: IOwnableEvents, options: IEventOptions, callBack: EventCallBack) => void,
  getPastEvents: (eventName: IOwnableEvents, options: IEventOptions, callBack?: EventCallBack) => Promise<Event[]>,
  events: {
    OwnershipTransferred: (options: IEventOptions, callBack?: IEventOptions) => EventEmitter
  }
}