import { BigNumber } from 'bignumber.js'
export default function ethToWei(eth: string | number) {
  return new BigNumber(eth).multipliedBy('1e+18').toString()
}
