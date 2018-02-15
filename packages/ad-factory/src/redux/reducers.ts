import { combineReducers } from 'redux'
import deployAdBackLog, {
  IDeployAdBacklogState,
  deployAdBacklogSelectors
} from './deployAdBacklog/deployAdBacklogReducer'

import adContracts, {
  IAdContracts,
  adContractActionCreators,
  adContractSelectors
} from './adContracts/adContracts'
export const actionCreators = {
  adContracts: adContractActionCreators
}
export const selectors = {
  deployAdBacklogSelectors,
  adContracts: adContractSelectors
}
export interface IState {
  adContracts: IAdContracts
  deployAdBackLog: IDeployAdBacklogState
}
export default combineReducers({
  adContracts,
  deployAdBackLog
})
