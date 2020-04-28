let Voter = artifacts.require('../Voter.sol');

module.exports = async function(deployer, network, accounts) {
    // to deploy a contract we say
    await deployer.deploy(Voter);

    // if contract needs parameters in its constructor then we deploy as so:
    await deployer.deploy(Voter, param1, parm2, param3);
}

// sending a transaction the web3 way and truffle way
// web3
let contract = new web3.eth.Contract(abi, contractAddress);
contract.methods.vote('param')
    .send({from: 'address', gas: 600000})

// truffle

let contract = new web3.eth.Contract(abi, contractAddress);

contract.vote('param', {from: 'address'})