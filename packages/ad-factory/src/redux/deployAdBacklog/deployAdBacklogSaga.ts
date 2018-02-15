import { IAction } from 'typed-redux-reducers'
import { takeLatest, call, put } from 'redux-saga/effects'

import * as Web3 from 'web3'
import { BigNumber } from 'bignumber.js'
import getWeb3 from '../../utils/getWeb3'
import getAdBackLogFactory from '../../contracts/ad-backlog-factory'
import getAdBackLog, { AdBackLogInterface } from '../../contracts/ad-backlog'
import {
  DeployAdBacklogTypes,
  actionCreators,
  DeployAdStages
} from './deployAdBacklogReducer'
import { notificationActionCreators } from '../notifications'
import { ICreateAdBacklogFormValues } from '../../components/createAdBacklogForm/createAdBacklogForm'
import { setTimeout } from 'timers'
import {
  AdBackLogFactoryInterface,
  DeployAdReceipt
} from '../../contracts/ad-backlog-factory'

const getTransactionReceipt = async (web3: Web3, tx: string) =>
  new Promise<Web3.TransactionReceipt | null>((resolve, reject) => {
    web3.eth.getTransactionReceipt(tx, (error, transaction) => {
      if (error) {
        return reject(error)
      }
      return resolve(transaction)
    })
  })
const delay = (timeout = 1000) =>
  new Promise(resolve => setTimeout(resolve, timeout))
const waitForConfirmation = async (
  web3: Web3,
  tx: string,
  depth = 0
): Promise<Web3.TransactionReceipt> => {
  if (depth > 10) {
    throw new Error('Transaction does not appear to have gone through')
  }
  await delay(depth * 1000)
  const result = await getTransactionReceipt(web3, tx)
  if (!result) {
    return await waitForConfirmation(web3, tx, depth + 1)
  } else {
    return result
  }
}

async function deployAd(
  web3: Web3,
  value: BigNumber,
  weiPerHour: BigNumber,
  autoApprove: boolean,
  from: string
) {
  const instance: AdBackLogFactoryInterface = await getAdBackLogFactory(web3)
  return await instance.deployAd(weiPerHour.toString(), autoApprove, {
    from,
    value: value.toString()
  })
}

function* createAdBacklog(action: IAction<ICreateAdBacklogFormValues>) {
  try {
    yield put(actionCreators.setLoading(DeployAdStages.CREATING_CONTRACT))
    const { web3, accounts }: { web3: Web3; accounts: string[] } = yield call(
      () => getWeb3
    )
    const donationAmount = web3.toWei(
      new BigNumber(action.payload.ipfsHostingAmount),
      'ether'
    )
    const weiPerHour = web3.toWei(
      new BigNumber(action.payload.ethPerHour),
      'ether'
    )
    const autoApprove = !action.payload.requireApproval
    const tx: DeployAdReceipt = yield call(
      deployAd,
      web3,
      donationAmount,
      weiPerHour,
      autoApprove,
      accounts[0]
    )
    console.log(tx)
    yield put(
      actionCreators.setLoading(DeployAdStages.WAITING_FOR_CONFIRMATION)
    )

    if (!tx.logs || !tx.logs.length) {
      throw new Error(
        'Your transaction went through, but the AdLog does not appear to be deployed.'
      )
    }
    const adCreationLog = tx.logs.find(log => log.args.owner === accounts[0])
    if (!adCreationLog) {
      throw new Error('Unable to find logs for account ' + accounts[0])
    }
    yield put(
      notificationActionCreators.successNotification({
        timeout: false,
        title: 'Contract Deployed!',
        message:
          'Advertisers can now interact with your contract at ' +
          adCreationLog.args.addr
      })
    )
    const adBackLog: AdBackLogInterface = yield call(
      getAdBackLog,
      web3,
      adCreationLog.args.addr
    )
    const wph: BigNumber = yield call(adBackLog.weiPerHour)
  } catch (e) {
    yield put(
      notificationActionCreators.errorNotification({
        title: 'Uh oh! There was a problem deploying the contract',
        message: `Error: ${e.message}`
      })
    )
    console.warn('error deploying contract', e.message)
  }
  yield put(actionCreators.setLoading(DeployAdStages.AWAITING_USER))
}
function* deployAdBacklogSaga() {
  yield takeLatest(DeployAdBacklogTypes.SUBMIT_FORM, createAdBacklog)
}

export default deployAdBacklogSaga
