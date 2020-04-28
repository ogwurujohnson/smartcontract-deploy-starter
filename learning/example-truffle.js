module.exports = {
    networks: {
        live: {
            host: "localhost",
            port: 9545,
            network_id: 1, 
            gas: 100000, gasPrice: 10, //maximum amount of gas to be charged for deploying and actual gas price for deploying
            from: '0x...' //address to deploy smart contract with
        }
    }
}

// so when we run truffle migrate --network <network name>, the name of the network must be in this object above that we have exposed to truffle.
// Else truffle would make use of another network called develop