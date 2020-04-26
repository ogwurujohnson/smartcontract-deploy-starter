## Installation
`npm install`

## Test
While running geth locally or while just trying out how deployment of smart contracts work, you make sure of this

1. Run geth with this flag `--allow-insecure-unlock`, so you can be able to unlock your wallet in http
    `geth --rinkeby --rpc --rpcapi="eth,net,web3,personal,txpool" --syncmode=light --allow-insecure-unlock`

2. Then run in a different terminal `geth attach http://127.0.0.1:8545`
    when the terminal prompts you, type `personal.unlockAccount('address', 'password', 'duration')`

3. On another terminal cd into the project root and run `node deploy.js`