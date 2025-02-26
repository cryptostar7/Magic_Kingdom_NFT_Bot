require('dotenv').config();
const { ethers } = require('ethers');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const RPC_URL = process.env.BERA_RPC_URL;

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const contractABI = [
    "function batchMint(uint256 amount, uint256 mintId) external payable returns (uint256)",
    "function quoteBatchMint(uint256 mintId, uint256 amount) public view returns (uint256 totalCostWithFee, uint256 feeAmount)"
];

const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

async function mintNFT(amount) {
    try {
        // Get required ETH amount from quoteBatchMint
        const [totalCostWithFee, feeAmount] = await contract.quoteBatchMint(0, amount);
        console.log(`Total cost including fees: ${ethers.formatEther(totalCostWithFee)} ETH`);

        // Execute mint with exact ETH amount
        const tx = await contract.batchMint(amount, 0, {
            value: totalCostWithFee,
            gasLimit: 500000
        });

        console.log(`Mint transaction sent: ${tx.hash}`);
        const receipt = await tx.wait();
        console.log(`Mint successful! Gas used: ${receipt.gasUsed.toString()}`);

    } catch (error) {
        console.log('Mint failed:', error);
    }
}

// Example usage
const mintAmount = 1; // User input amount
mintNFT(mintAmount);
