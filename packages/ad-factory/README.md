# Ad Factory

Console for managing ads, and buying ad time.

## Dev

This is originally adopted from [Create React Typescript App](https://github.com/wmonk/create-react-app-typescript/tree/39d6c62788140ce2ef5acaa8310779d56a7523d4), if you have advanced questions, try checking out the docs there.

## Which network to run

Ganache and truffle develop use the ethereum-js VM which is not bug free. Try developing with them, because they are faster, but if you run into an weirdness, double check with geth private network. If things fail randomly, try increasing gas a bit. Scripts in the root project are available to get started a geth private network or rinkeby.

There are strange things happening with migrate and truffle 4.0.X (4.0.6 is the latest), so if you are going to deploy a contract, do it through remix.

## A note on types.

This project is very much a WIP, and the types for web3, and truffle contracts are not mature. So there is a lot of any flying around. For speed of development explicit any's are goingto be used, but they should be contained within the src/contracts folder.
