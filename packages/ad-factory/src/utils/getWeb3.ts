import * as Web3 from 'web3'

type IResult = { web3: Web3; accounts: string[] }
let getWeb3 = new Promise<IResult>((resolve, reject: (e: Error) => any) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    let web3: Web3 = (window as any).web3
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    // if (typeof web3 !== 'undefined' && false) {
    //   // Use Mist/MetaMask's provider.
    //   web3 = new Web3(web3.currentProvider)
    //   console.log('Injected web3 detected.')
    //   const w: any = window
    //   w.web3 = web3
    // } else {
    // Fallback to localhost if no web3 injection. We've configured this to
    // use the development console's port by default.
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
    web3 = new Web3(provider)
    const w: any = window
    w.web3 = web3
    console.log('No web3 instance injected, using Local web3.')
    // }
    web3.eth.getAccounts((error, accounts) => {
      if (error) {
        throw error
      }
      if (web3) {
        resolve({ web3, accounts })
      }
    })
  })
})

export default getWeb3
