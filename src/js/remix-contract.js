window.web3.currentProvider.enable();

if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3.setProvider(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/33b80c3a509e419d8cb3abe52dfb7710"));
    //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

//var ethJSABI = require("ethjs-abi");
//var BlockchainUtils = require("truffle-blockchain-utils");
var Web3 = require("web3");

// For browserified version. If browserify gave us an empty version,
// look for the one provided by the user.
if (typeof Web3 == "object" && Object.keys(Web3).length == 0) {
    Web3 = global.Web3;
}

//var web3 = new Web3(Web3.currentProvider);

//web3.eth.defaultAccount = web3.eth.accounts[0];


var abi = [{
        "constant": false,
        "inputs": [{
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
        "inputs": [{
            "internalType": "bytes32",
            "name": "item",
            "type": "bytes32"
        }],
        "name": "addItem",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
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
        "outputs": [{
            "internalType": "address",
            "name": "address_sender",
            "type": "address"
        }],
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
        "inputs": [{
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
        "outputs": [{
            "internalType": "uint16",
            "name": "nb_win_ret",
            "type": "uint16"
        }],
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
        "inputs": [{
            "internalType": "uint8",
            "name": "i",
            "type": "uint8"
        }],
        "name": "getListItem",
        "outputs": [{
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
        "inputs": [{
            "internalType": "uint8",
            "name": "i",
            "type": "uint8"
        }],
        "name": "getListWin",
        "outputs": [{
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
        "outputs": [{
            "internalType": "address",
            "name": "address_sender",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "players",
        "outputs": [{
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
];

//var MoodForestC = MoodForestContract.at('0x24D61c01A4915534452Ec7145a2B443cF2B7c0f7');

var MoodForestContract = web3.eth.contract(abi);
var address = '0x24D61c01A4915534452Ec7145a2B443cF2B7c0f7';
var MoodForestC = MoodForestContract.at(address);


//var MoodForestC = new web3.eth.Contract(abi, address);



function remix_submit_animal(animal, color, feeling) {
    console.log("creating transaction of", animal, color, feeling);
    random_value = Math.floor(Math.random() * 1000000);
    window.localStorage.setItem('random_value', random_value);
    //link = MoodForestC.addItemTest(animal, color, feeling, random_value);
    var params = {
        gas: 2100000,
        from: web3.eth.accounts[0],
    };
    MoodForestC.addItemTest(animal, color, feeling, random_value, params, remix_submit_animal_callback)

}

function remix_submit_animal_callback(err, link) {
    if (err) {
        alert("Error : " + err);
    } else {
        alert("Link: " + link);
    }
}


function check_if_exist(transactionID) {
    console.log("check if exist called", transactionID)
    return {};
}