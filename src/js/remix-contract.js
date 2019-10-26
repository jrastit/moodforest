
//var ethJSABI = require("ethjs-abi");
//var BlockchainUtils = require("truffle-blockchain-utils");
var Web3 = require("web3");

// For browserified version. If browserify gave us an empty version,
// look for the one provided by the user.
if (typeof Web3 == "object" && Object.keys(Web3).length == 0) {
  Web3 = global.Web3;
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var MoodForestContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "animal",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "color",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "feeling",
				"type": "uint8"
			}
		],
		"name": "addBet",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "item",
				"type": "bytes32"
			}
		],
		"name": "addItem",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint8",
				"name": "animal",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "color",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "feeling",
				"type": "uint8"
			},
			{
				"internalType": "uint64",
				"name": "random",
				"type": "uint64"
			}
		],
		"name": "addItemTest",
		"outputs": [
			{
				"internalType": "address",
				"name": "address_sender",
				"type": "address"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "cancelItem",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint8",
				"name": "animal",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "color",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "feeling",
				"type": "uint8"
			},
			{
				"internalType": "uint64",
				"name": "random",
				"type": "uint64"
			}
		],
		"name": "checkBet",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "nb_win_ret",
				"type": "uint16"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint8",
				"name": "i",
				"type": "uint8"
			}
		],
		"name": "getListItem",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "animal",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "color",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "feeling",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint8",
				"name": "i",
				"type": "uint8"
			}
		],
		"name": "getListWin",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "animal",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "color",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "feeling",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNextItem",
		"outputs": [
			{
				"internalType": "address",
				"name": "address_sender",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "nb_bets",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "nb_wins",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "nb_items",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "next_item",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);

var MoodForestC = MoodForestContract.at('0x24D61c01A4915534452Ec7145a2B443cF2B7c0f7');



function remix_submit_animal(animal, color, feeling){
	random_value = Math.floor(Math.random() * 1000000);
	window.localStorage.setItem('random_value', random_value);	
	link = MoodForestC.addItemTest(animal, color, feeling, random_value);
	alert("Link: " + link);
}




