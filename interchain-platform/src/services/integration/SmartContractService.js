import Web3 from 'web3';
import { ethers } from 'ethers';

class SmartContractService {
    constructor() {
        this.web3 = null;
        this.provider = null;
        this.signer = null;
        this.contracts = new Map();
    }

    async initialize() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();
        } else {
            throw new Error('No Web3 provider detected');
        }
    }

    async loadContract(address, abi) {
        try {
            const contract = new ethers.Contract(address, abi, this.signer);
            this.contracts.set(address, contract);
            return contract;
        } catch (error) {
            console.error('Error loading contract:', error);
            throw error;
        }
    }

    async executeTransaction(contractAddress, method, params = []) {
        try {
            const contract = this.contracts.get(contractAddress);
            if (!contract) {
                throw new Error('Contract not loaded');
            }
            const tx = await contract[method](...params);
            return await tx.wait();
        } catch (error) {
            console.error('Transaction error:', error);
            throw error;
        }
    }

    async queryContract(contractAddress, method, params = []) {
        try {
            const contract = this.contracts.get(contractAddress);
            if (!contract) {
                throw new Error('Contract not loaded');
            }
            return await contract[method](...params);
        } catch (error) {
            console.error('Query error:', error);
            throw error;
        }
    }
}

export default new SmartContractService();
