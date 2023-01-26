let ethers = require('ethers');
let Web3 = require('Web3');
let fs = require('fs');

const readFile = async function(file){
    let pending = await fs.readFileSync(file);
    try {
        pending = JSON.parse(pending);
    } catch(err) {
        console.log("Error",err);
    };
    return pending;
};

const writeFile = async function(file,data){
    const jsonString = JSON.stringify(data);
    fs.writeFile(file, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log("Wrote Path: ",file)
        }
    });
};

let networks = process.argv[3] ? process.argv[3] : 0;
let tokens = process.argv[4] ? process.argv[4] : 0;

async function init(networks,rpc_,command,command_b) {

    let iSplitter__ABI = [ { "inputs": [], "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" } ], "name": "WithdrawToken", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" } ], "name": "Withdrawal", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "adjust_Team_Distribution", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "_wallet", "type": "address" } ], "name": "change_Development", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "_wallet", "type": "address" } ], "name": "change_Operations", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "liquidity", "type": "uint256" } ], "name": "split", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" } ], "name": "withdrawToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw_ETH_v1", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw_ETH_v2", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" } ];
    let IERC20_ABI = [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ];

    var eth_rpc = "https://mainnet.infura.io/v3/18a7cd952c6b0498b0fdfff781680041";
    var fren_rpc = "https://rpc-02.frenscan.io";
    var fren_testnet_rpc = "https://rpc-01tn.frenchain.app";
{
  "dependencies": {
    "@ethersproject/experimental": "^5.7.0",
    "@truffle/hdwallet-provider": "^2.1.4",
    "ethers": "^5.7.2"
  }
}
    const provider_ETH = new ethers.providers.JsonRpcProvider(eth_rpc);
    const provider_FREN = new ethers.providers.JsonRpcProvider(fren_rpc);
    const provider_FREN_Testnet = new ethers.providers.JsonRpcProvider(fren_testnet_rpc);
    let web3;
    if(networks.toString() == "ETH"){
        provider = provider_ETH;
        web3 = await new Web3(eth_rpc);
        } else if(networks.toString() == "FREN"){
        web3 = await new Web3(fren_rpc);
    } else if(networks.toString() == "tFREN"){
        provider = provider_FREN_Testnet;
        web3 = await new Web3(fren_testnet_rpc);
    } else {
        console.log("Unrecognized network!"); return console.log(process.exit());
    };

    const opk = "ENTER_PRIVATE_KEY_HERE"; // change this 
    const wallet = new ethers.Wallet(opk, provider);
    
    let contract_adress = "0x0200193EB977D136Be164554dEa7FA2aAB025C43";

    const iSplit = new ethers.Contract(contract_adress.toString(), iSplitter__ABI, wallet);

    let hasBalance = false;

        async function get_balanceOf(iSplit,token,wallet_){
            let token_adress;
            if(token.toString() == "WETH"){
                token_adress = "";
                const erc20_token = new ethers.Contract(token_adress.toString(), IERC20_ABI, wallet);
                let token_balance = await erc20_token.balanceOf(wallet_.toString());
                console.log("erc20_balance (toString): ",token_balance.toString());
                console.log("erc20_balance (web3): ",web3.utils.fromWei(token_balance.toString(),"ether"));
            };
        };

        async function get_balanceOf_ETH(iSplit,provider){
            await provider.getBalance(contract_adress.toString()).then((balance) => {
                if(parseFloat(balance.toString()) > 0){
                    console.log("Found Balance: ",web3.utils.fromWei(balance.toString(),"ether"));
                    console.log("eth_balance (web3): ",web3.utils.fromWei(balance.toString(),"ether"));
                    hasBalance = true;
                    if(hasBalance.toString() == "true"){
                        return withdraw(iSplit,"v1");
                    };
                } else {
                    console.log("No Balance: ",web3.utils.fromWei(balance.toString(),"ether"));
                    console.log("eth_balance (web3): ",web3.utils.fromWei(balance.toString(),"ether"));
                };
            });
        };

        async function withdraw(iSplit,version){
            if(version.toString() == "v1"){
                async function withdraw_ETH_v1(){
                    let tx = await iSplit.withdraw_ETH_v1();
                    tx.wait();
                    if(tx.hash){
                        console.log("tx: ",tx);
                    };
                }; withdraw_ETH_v1();
            } else if(version.toString() == "v2"){
                async function withdraw_ETH_v2(){
                    let tx = await iSplit.withdraw_ETH_v2();
                    tx.wait();
                    if(tx.hash){
                        console.log("tx: ",tx);
                    };
                }; withdraw_ETH_v2();
            } else {
                return console.log("unsupported version");
            };
        };

        async function withdrawToken(iSplit,token){
            let tx = await iSplit.withdrawToken(token);
            tx.wait();
            if(tx.hash){
                console.log("tx: ",tx);
            };
        };

        async function change_Operations(iSplit,address){
            let tx = await iSplit.change_Operations(address);
            tx.wait();
            if(tx.hash){
                console.log("tx: ",tx);
            };
        };

        async function change_Development(iSplit,address){
            let tx = await iSplit.change_Development(address);
            tx.wait();
            if(tx.hash){
                console.log("tx: ",tx);
            };
        };

        async function adjust_Team_Distribution(iSplit,amount){
            let tx = await iSplit.adjust_Team_Distribution(amount);
            tx.wait();
            if(tx.hash){
                console.log("tx: ",tx);
            };
        };

        if(command.toString() == "withdraw_v1"){
            // Withdraw all ETH withdraw ETH (v1)
            return withdraw(iSplit,"v1");
        } else if(command.toString() == "withdraw_v2"){
            // Withdraw all ETH withdraw ETH (v2)
            return withdraw(iSplit,"v2");
        } else if(command.toString() == "withdrawToken"){
            // withdraw a token
            let token_ContractAddress = command_b ? command_b : "";
            return withdrawToken(iSplit,token_ContractAddress);
        } else if(command.toString() == "change_Operations"){
            // operations can change their wallet
            let operations_wallet = command_b ? command_b : "";
            return change_Operations(iSplit,operations_wallet);
        } else if(command.toString() == "change_Development"){
            // development can change their wallet
            let development_wallet = command_b ? command_b : "";
            return change_Development(iSplit,development_wallet);
        } else if(command.toString() == "adjust_Team_Distribution"){
            // make adjustments to team share
            let amount = command_b ? command_b : 90; // 90%
            amount = amount * 100;
            return adjust_Team_Distribution(iSplit,amount);
        } else if(command.toString() == "get_balanceOf"){
            // get balance of ERC20
            let token____ = command_b ? command_b : "";
            return get_balanceOf(iSplit,token____);
        } else if(command.toString() == "get_balanceOf_ETH"){
            // get balance of ETH
            return get_balanceOf_ETH(iSplit,provider);
        } else {
            console.log("Unrecognized process"); return console.log(process.exit());
        };
   };

async function initialize(networks,rpc,command,command_b) { 
    if(command_b){ } else {
        command_b = "";
    };
    return init(networks,rpc,command,command_b);
}; 

let _tokens; 
async function checkNetwork(networks){
    if(networks.toString() != 0){
        if(networks.toString() == "ETH"){
            return "https://mainnet.infura.io/v3/6688180b800147cd941952cb0fdfff7a";
        } else if(networks.toString() == "GOERLI"){
            return "https://goerli.infura.io/v3/6688180b800147cd941952cb0fdfff7a";
        } else if(networks.toString() == "KEK"){
            return "https://mainnet.kekchain.com";
        } else if(networks.toString() == "FREN"){
            return "https://rpc-02.frenscan.io";
        } else if(networks.toString() == "tKEK"){
            return "https://testnet.kekchain.com";
        } else if(networks.toString() == "tFREN"){
            return "https://rpc-01tn.frenchain.app";
        } else {
            return console.log("unidentified network");
        };
        console.log("networks: ",networks);
    };
};

// todo experimental, load tokens (set or individual?)
const start = async(process) => {
    if(tokens.toString() != 0){
        if(tokens.toString() == "ETH"){
            // _tokens;
        } else if(tokens.toString() == "goerli"){
            // _tokens;
        } else if(tokens.toString() == "KEK"){
            // _tokens;
        } else if(tokens.toString() == "FREN"){
            // _tokens;
        } else if(tokens.toString() == "tKEK"){
            // _tokens;
        } else if(tokens.toString() == "tFREN"){
            // _tokens;
        } else {
            return console.log("unsupported tokens");
        };
        console.log("tokens: ",tokens);
    }; 
    if(process.argv[2].toString() == "eth_balance"){
        let _rpc = await checkNetwork(networks);
        // ETH balance
        console.log("networks: ",networks);
        console.log("_rpc: ",_rpc);
        return initialize(networks,_rpc,"get_balanceOf_ETH");
    } else if(process.argv[2].toString() == "erc20_balance"){
        let _rpc = await checkNetwork(networks);
        // ERC20 balance
        return initialize(networks,_rpc,"get_balanceOf",_tokens);
    } else if(process.argv[2].toString() == "eth_withdrawal_v1"){
        let _rpc = await checkNetwork(networks);
        // ETH withdrawal
        return initialize(networks,_rpc,"withdraw_v1");
    } else if(process.argv[2].toString() == "eth_withdrawal_v2"){
        let _rpc = await checkNetwork(networks);
        // ETH withdrawal
        return initialize(networks,_rpc,"withdraw_v2");
    } else {
        console.log("Unrecognized process"); return console.log(process.exit());
    };
}; start(process);
