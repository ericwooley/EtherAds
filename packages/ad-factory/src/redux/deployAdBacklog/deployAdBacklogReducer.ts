// DeployAdBacklog reducer
import { actionFactory, createReducer, IAction } from 'typed-redux-reducers'
import { ICreateAdBacklogFormValues } from '../../components/createAdBacklogForm/createAdBacklogForm'
export enum DeployAdStages {
  AWAITING_USER = 0,
  CREATING_CONTRACT = 1,
  WAITING_FOR_CONFIRMATION = 2
}
export enum DeployAdBacklogTypes {
  UPDATE_ETH_PER_HOUR = 'DEPLOY_AD_BACK_LOG/UPDATE_ETH_PER_HOUR',
  UPDATE_IPFS_HOSING_AMOUNT = 'DEPLOY_AD_BACK_LOG/UPDATE_IPFS_HOSING_AMOUNT',
  UPDATE_REQUIRE_APPROVAL = 'DEPLOY_AD_BACK_LOG/UPDATE_REQUIRE_APPROVAL',
  SUBMIT_FORM = 'DEPLOY_AD_BACK_LOG/SUBMIT_FORM',
  SET_LOADING = 'DEPLOY_AD_BACK_LOG/SET_LOADING'
}
export interface IDeployAdBacklogState {
  ethPerHour: string | number
  ipfsHostingAmount: string | number
  requireApproval: boolean
  loadingStage: DeployAdStages
}
export const actionBundles = {
  updateEthPerHour: actionFactory<IDeployAdBacklogState, string | number>(
    DeployAdBacklogTypes.UPDATE_ETH_PER_HOUR,
    (state: IDeployAdBacklogState, action) => ({
      ...state,
      ethPerHour: action.payload
    })
  ),
  updateIpfsHosingAmount: actionFactory<IDeployAdBacklogState, string | number>(
    DeployAdBacklogTypes.UPDATE_IPFS_HOSING_AMOUNT,
    (state: IDeployAdBacklogState, action) => ({
      ...state,
      ipfsHostingAmount: action.payload
    })
  ),
  updateRequireApproval: actionFactory<IDeployAdBacklogState, boolean>(
    DeployAdBacklogTypes.UPDATE_REQUIRE_APPROVAL,
    (state: IDeployAdBacklogState, action) => ({
      ...state,
      requireApproval: action.payload
    })
  ),
  submitForm: actionFactory<IDeployAdBacklogState, ICreateAdBacklogFormValues>(
    DeployAdBacklogTypes.SUBMIT_FORM,
    (state: IDeployAdBacklogState, action) => state
  ),
  setLoading: actionFactory<IDeployAdBacklogState, DeployAdStages>(
    DeployAdBacklogTypes.SET_LOADING,
    (state: IDeployAdBacklogState, action) => ({
      ...state,
      loadingStage: action.payload
    })
  )
}
export const actionCreators = {
  updateEthPerHour: actionBundles.updateEthPerHour.actionCreator,
  updateRequireApproval: actionBundles.updateRequireApproval.actionCreator,
  submitForm: actionBundles.submitForm.actionCreator,
  setLoading: actionBundles.setLoading.actionCreator,
  updateIpfsHosingAmount: actionBundles.updateIpfsHosingAmount.actionCreator
}
const defaultState: IDeployAdBacklogState = {
  ethPerHour: 0.01,
  requireApproval: false,
  loadingStage: DeployAdStages.AWAITING_USER,
  ipfsHostingAmount: 0.01
}
interface ISubState {
  deployAdBackLog: IDeployAdBacklogState
}
export const deployAdBacklogSelectors = {
  ethPerHour: (state: ISubState) => state.deployAdBackLog.ethPerHour,
  requireApproval: (state: ISubState) => state.deployAdBackLog.requireApproval,
  loading: (state: ISubState) => state.deployAdBackLog.loadingStage,
  ipfsHostingAmount: (state: ISubState) =>
    state.deployAdBackLog.ipfsHostingAmount
}

export default createReducer(defaultState, actionBundles)
