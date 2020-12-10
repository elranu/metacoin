import jsonConvertLib from "./build/contracts/ConvertLib.json";
import jsonMetaCoin from "./build/contracts/MetaCoin.json";
import Web3 from "web3";

var contract = require("@truffle/contract");


class Main {
    
    //Setup the next 3 properties
    private libAddress = "0xc19ACB71D5b66091eBf910b71a5B86B3eb5fc007"; //first truffle migrate and copy de address here
    private rpcUrl = "http://127.0.0.1:8545";
    private privateKey = "0x084dc47c14df76e6771eabd5f309cc8607c5be6a9861090d0ee17ab99d8ecd78";

    private web3: Web3;
    
    constructor()
    {
        this.web3 = new Web3(this.rpcUrl);
        const account = this.web3.eth.accounts.privateKeyToAccount(this.privateKey);
        this.web3.eth.accounts.wallet.add(account);
        this.web3.eth.defaultAccount = account.address;
    }

    public async deploy() {
        const proxyLib = contract(jsonConvertLib);
        proxyLib.setProvider(this.web3.currentProvider);
        
        await proxyLib.detectNetwork();
        const libInstance = await proxyLib.at(this.libAddress);
        
        const metacoinContract = contract(jsonMetaCoin);

        metacoinContract.setProvider(this.web3.currentProvider);
        
        await metacoinContract.detectNetwork();
        await metacoinContract.link(libInstance);
        
        const instanceMetacoin = await metacoinContract.new();

        console.log('Proxy address (owner): ' + instanceMetacoin.address);
        return instanceMetacoin;
    }
}

const main = new Main();
main.deploy();