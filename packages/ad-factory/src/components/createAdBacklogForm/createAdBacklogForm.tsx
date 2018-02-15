import * as React from 'react'
import {
  Form,
  Input,
  Header,
  Checkbox,
  Button,
  Dimmer,
  Loader,
  Segment
} from 'semantic-ui-react'
import { DeployAdStages } from '../../redux/deployAdBacklog/deployAdBacklogReducer'
import styled from 'styled-components'
const Space = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`
export interface ICreateAdBacklogFormValues {
  ethPerHour: string | number
  requireApproval: boolean
  ipfsHostingAmount: string | number
}
type Props = {
  onEthPerHourChange: (value: string) => any
  ethPerHour: string | number
  ipfsHostingAmount: string | number
  onIPFSHostingAmountChange: (value: string) => any
  onRequireApprovalChange: (checked: boolean) => any
  requireApproval: boolean
  loading: DeployAdStages
  onSubmit: (formValues: ICreateAdBacklogFormValues) => any
}

const LOADING_TEXT = {
  [DeployAdStages.AWAITING_USER]: '',
  [DeployAdStages.CREATING_CONTRACT]: 'Deploying Contract...',
  [DeployAdStages.WAITING_FOR_CONFIRMATION]: 'Waiting for contract address...'
}
export default (props: Props) => (
  <Segment>
    <Header as="h3">I'm a publisher</Header>
    <Header as="h4">
      I want to generate revenue by showing advertisements
    </Header>
    <Dimmer active={props.loading !== DeployAdStages.AWAITING_USER}>
      <Loader>{LOADING_TEXT[props.loading]}</Loader>
    </Dimmer>
    <Form
      onSubmit={() => {
        props.onSubmit({
          ethPerHour: props.ethPerHour,
          requireApproval: props.requireApproval,
          ipfsHostingAmount: props.ipfsHostingAmount
        })
      }}
    >
      <Form.Field>
        <Input
          label="Eth / Hour"
          control="input"
          type="number"
          onChange={(e, { value }) => props.onEthPerHourChange(value)}
          value={props.ethPerHour}
        />
      </Form.Field>
      <Form.Field>
        <Input
          label="Donate Eth"
          control="input"
          type="number"
          step="0.1"
          onChange={(e, { value }) => props.onIPFSHostingAmountChange(value)}
          value={props.ipfsHostingAmount}
        />
      </Form.Field>
      <Space>
        <Form.Field>
          <Checkbox
            label="Require Approval"
            toggle={true}
            onChange={(e, { checked }) => {
              props.onRequireApprovalChange(!!checked)
            }}
            checked={props.requireApproval}
          />
        </Form.Field>
        <Button
          content="Create Contract"
          icon="add"
          color="green"
          labelPosition="right"
        />
      </Space>
    </Form>
  </Segment>
)
