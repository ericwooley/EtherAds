import * as React from 'react'
import './App.css'
import getWeb3 from './utils/getWeb3'
import * as Web3 from 'web3'
import contract from 'truffle-contract'
import AdLogFactory from './contracts/AdLogFactory.json'
import { Container, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import { colors } from './theme'
import Header from './components/header/header'
import getAdBackLog from './contracts/ad-backlog'
import { Provider } from 'react-redux'
import store from './redux/store'
import CreateAdBacklogForm from './components/createAdBacklogForm/'
import AdList from './components/AdList/Adlist'
const Wrapper = styled.div`
  background-color: ${colors.light};
  color: ${colors.main};
  min-height: 100vh;
  font-size: 14px;
  font-size: 1.4rem;
`
class App extends React.Component<{}, { web3: Web3; accounts: string[] }> {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <Wrapper>
          <Container>
            <Header />
            <hr />
            <Grid stackable={true} divided={true}>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <CreateAdBacklogForm />
                </Grid.Column>
                <Grid.Column>
                  <AdList />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Wrapper>
      </Provider>
    )
  }
}

export default App
