import { all } from 'redux-saga/effects'
import deployAdBacklogSaga from './deployAdBacklog/deployAdBacklogSaga'
import adContractSaga from './adContracts/adContractsSaga'
/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* rootSaga() {
  yield all([deployAdBacklogSaga(), adContractSaga()])
}

export default rootSaga
