require('dotenv').config();
const { ethers } = require('ethers');

const RPC_URL = process.env.BERA_RPC_URL;

const contractABI = [
    "function batchMint(uint256 amount, uint256 mintId) external payable returns (uint256)",
    "function quoteBatchMint(uint256 mintId, uint256 amount) public view returns (uint256 totalCostWithFee, uint256 feeAmount)"
];


async function mintKingdomNFT(userState) {
    try {
        const contractAddress = userState.contractAddress;
        const privateKey = userState.privateKey;
        const quantity = userState.quantity;

        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const wallet = new ethers.Wallet(privateKey, provider);
        console.log(`Private Key: ${privateKey}`);
        const contract = new ethers.Contract(contractAddress, contractABI, wallet);
        console.log(`Contract Address: ${contractAddress}`);
        // Get required ETH amount from quoteBatchMint
        const [totalCostWithFee, feeAmount] = await contract.quoteBatchMint(0, quantity);
        console.log(`Total cost including fees: ${ethers.formatEther(totalCostWithFee)} ETH`);
        console.log(`Quantity: ${quantity}`);

        // Execute mint with exact ETH amount
        const tx = await contract.batchMint(quantity, 0, {
            value: totalCostWithFee,
            gasLimit: 500000
        });

        console.log(`Mint transaction sent: ${tx.hash}`);
        const receipt = await tx.wait();
        console.log(`Mint successful! Gas used: ${receipt.gasUsed.toString()}`);

        return { success: 'Success' }

    } catch (error) {
        if((error.shortMessage === undefined) == false) {
            console.log("Error is Occured on Short Message:", error.shortMessage);
            return error.shortMessage;
        } else {
            console.log("Error is Occured on Custom Error:", error);
            return "Custom Error is occured";
        }
            
    }
}

module.exports = { mintKingdomNFT };
