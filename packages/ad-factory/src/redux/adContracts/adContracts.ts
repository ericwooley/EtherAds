// AdContract reducer
import { actionFactory, createReducer, IAction } from 'typed-redux-reducers'
export enum AdContractTypes {
  FETCH_AD_CONTRACTS = 'AD_CONTRACTS/FETCH_AD_CONTRACTS'
}
export interface IAdContracts {
  loading: boolean
}
export const actionBundles = {
  fetchAdContracts: actionFactory<IAdContracts, void>(
    AdContractTypes.FETCH_AD_CONTRACTS,
    (state: IAdContracts, action): IAdContracts => ({
      ...state,
      loading: true
    })
  )
}
export const adContractActionCreators = {
  fetchAdContracts: actionBundles.fetchAdContracts.actionCreator
}
const defaultState: IAdContracts = {
  loading: false
}
interface ISubState {
  adContracts: IAdContracts
}
export const adContractSelectors = {
  // ethPerHour: (state: ISubState) => state.adContracts.ethPerHour
}

export default createReducer(defaultState, actionBundles)
