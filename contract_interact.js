let fs = require('fs');
let Web3 = require('web3');

let web3 = new Web3();
web3.setProvider(
    new web3.providers.HttpProvider('http://localhost:8545')
);

let contractAddress = '0xEd4CB26A5E28e3a1B3bF0398a89F16174804623e'
let fromAddress = '0xcd2be33ec4ecb8ec02b8cad2434f20d3e3b3e9b3'

let abiStr = fs.readFileSync('abi.json', 'utf8');
let abi = JSON.parse(abiStr);

let voter = new web3.eth.Contract(abi, contractAddress);

sendTransactions()
    .then(() => console.log('Done'))
    .catch((error) => console.log(error))

async function sendTransactions() {
    console.log("Adding option 'coffee'");
    await voter.methods.addOption('coffee').send({from: fromAddress});

    console.log("Adding option 'tea'");
    await voter.methods.addOption('tea').send({from: fromAddress});

    await voter.methods.startVoting()
        .send({from: fromAddress, gas: 600000});
    
    console.log('voting')
    await voter.methods['vote(uint256)'](0)
        .send({from: fromAddress, gas:600000});

    console.log('Getting votes');
    let votes = await voter.methods.getVotes().call({from: fromAddress})
    console.log(`Votes: ${votes}`)
}