import * as React from 'react'
import { Header } from 'semantic-ui-react'
export default class AppHeader extends React.PureComponent<any> {
  render() {
    return (
      <div>
        <Header as="h1">Ad Factory</Header>
        <p>Decentralized ads and ad management</p>
      </div>
    )
  }
}
