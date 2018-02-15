import BigNumber from 'bignumber.js'
import bignumber from 'bignumber.js'
export interface ContractInterface<T> {
  setProvider: (provider: any) => void
  deployed: () => Promise<T>
  at: (address: string) => Promise<T>
}

export type ContractMethod<T> = T & {
  getGas: T
  call: T
  sendTransaction: T & { (...args: any[]): string }
}
export type Web3Number = string | number | BigNumber
export type MethodOptions = {
  from: string
  value: Web3Number | BigNumber | string
  gas?: Web3Number
  gasLimit?: Web3Number
}
