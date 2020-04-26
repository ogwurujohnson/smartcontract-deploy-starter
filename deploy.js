const fs = require('fs-extra');
let solc = require('solc');
let Web3 = require('web3');
let path = require('path');

let contract = compileContract();
let web3 = createWeb3();
let sender = '0xcd2be33ec4ecb8ec02b8cad2434f20d3e3b3e9b3';

deployContract(web3, contract, sender)
    .then(() => {
        console.log('Deployment finished')
    })
    .catch((error) => {
        console.log(`Failed to deploy contract: ${error}`)
    })

function compileContract() {
    let input = {
        language: 'Solidity',
        sources: {
            'Voter': {
                    content: fs.readFileSync('Voter.sol', 'utf8')
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };

    console.log('compiling the contract');
    // compile and optimize contract
    let compiledContracts = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

	for (let contract in compiledContracts) {
		for(let contractName in compiledContracts[contract]) {
			fs.outputJsonSync(
				path.resolve('.', `abi.json`),
				compiledContracts[contract][contractName],
				{
					spaces: 2
				}
			)
		}
	}
    return compiledContracts['Voter']['Voter'];
}

function createWeb3() {
    let web3 = new Web3();
    web3.setProvider(
        new web3.providers.HttpProvider('http://localhost:8545')
    );
    return web3;
}

async function deployContract(web3, contract, sender) {
    let Voter = new web3.eth.Contract(contract.abi);
    let bytecode = '0x' + contract.evm.bytecode.object;
    let gasEstimate = await web3.eth.estimateGas({data: bytecode});

    console.log('Deploying the contract');
    const contractInstance = await Voter.deploy({
        data: bytecode
    })
    .send({
        from: sender,
        gas: gasEstimate
    })
    .on('transactionHash', (transactionHash) => {
        console.log(`Transaction hash: ${transactionHash}`);
    })
    .on('confirmation', (confirmationNumber, receipt) => {
        console.log(`Confirmation number: ${confirmationNumber}`);
    })

    console.log(`Contract address: ${contractInstance.options.address}`);
}