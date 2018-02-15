module.exports = {
  contracts_build_directory: './src/contracts/json/',
  networks: {
    development: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*'
    },
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*'
    },
    private: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '1005'
    },
    mist: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '1005',
      from: '0x4330ab47a2FD90A07b0a0d74Bd2c9163d415d7Fd'
    },
    rinkeby: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '4',
      from: '0x0dfcfa32a931191fd09e975c433cceb295c27bed'
    }
  }
}
