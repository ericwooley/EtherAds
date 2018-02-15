import { connect } from 'react-redux'
import CreateAdBacklogForm from './createAdBacklogForm'

import { IState, selectors } from '../../redux/reducers'
import { actionCreators } from '../../redux/deployAdBacklog/deployAdBacklogReducer'
export default connect(
  (state: IState) => ({
    ethPerHour: selectors.deployAdBacklogSelectors.ethPerHour(state),
    requireApproval: selectors.deployAdBacklogSelectors.requireApproval(state),
    loading: selectors.deployAdBacklogSelectors.loading(state),
    ipfsHostingAmount: selectors.deployAdBacklogSelectors.ipfsHostingAmount(
      state
    )
  }),
  {
    onEthPerHourChange: actionCreators.updateEthPerHour,
    onRequireApprovalChange: actionCreators.updateRequireApproval,
    onSubmit: actionCreators.submitForm,
    onIPFSHostingAmountChange: actionCreators.updateIpfsHosingAmount
  }
)(CreateAdBacklogForm)
