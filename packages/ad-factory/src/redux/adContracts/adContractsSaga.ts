import { IAction } from 'typed-redux-reducers'
import { takeLatest, call, put } from 'redux-saga/effects'

import * as Web3 from 'web3'
import { BigNumber } from 'bignumber.js'
import getWeb3 from '../../utils/getWeb3'
import getAdBackLogFactory from '../../contracts/ad-backlog-factory'
import getAdBackLog, { AdBackLogInterface } from '../../contracts/ad-backlog'
import { AdContractTypes } from './adContracts'
import { actionCreators } from '../reducers'
import { getDeployedAdContracts } from '../../contracts/ad-backlog-factory'

function* fetchAdContracts() {
  const { web3, accounts }: { web3: Web3; accounts: string[] } = yield call(
    () => getWeb3
  )
  const events = yield call(getDeployedAdContracts, web3)
  console.log('got events', events)
}
function* fetchAdContractsSaga() {
  yield takeLatest(AdContractTypes.FETCH_AD_CONTRACTS, fetchAdContracts)
}

export default fetchAdContractsSaga
