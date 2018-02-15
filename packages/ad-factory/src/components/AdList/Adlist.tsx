import * as React from 'react'
import { Segment, List, Header, Progress } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { actionCreators } from '../../redux/reducers'
interface Props {
  onMount: () => any
}
export class AdList extends React.PureComponent<Props> {
  componentWillMount() {
    this.props.onMount()
  }
  render() {
    return (
      <Segment>
        <Header as="h3">I'm an Advertiser</Header>
        <Header as="h4">I want to advertise directly with a publisher</Header>
        <List relaxed={true}>
          <List.Item>
            <Progress percent={100} attached="top">
              0x809fa3b7a3c6af3a1f0af8f188175fd256302433
            </Progress>
            <List.Icon name="factory" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as="a">Contract Loading</List.Header>
              <List.Description as="a" />
            </List.Content>
            <Progress active={true} percent={100} attached="bottom" />
          </List.Item>
          <List.Item
            icon="factory"
            content="0x809fa3b7a3c6af3a1f0af8f188175fd256302433"
          />
        </List>
      </Segment>
    )
  }
}
export default connect(() => ({}), {
  onMount: actionCreators.adContracts.fetchAdContracts
})(AdList)
