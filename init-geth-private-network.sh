rm -rf ./private-ether/data/*;
geth --datadir ./private-ether/data init ./private-ether/genesis.json;
geth --datadir ./private-ether/data account import ./test_private_keys --password /dev/null
./geth-private.sh