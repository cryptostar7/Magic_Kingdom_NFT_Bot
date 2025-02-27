require('dotenv').config();
const { ethers } = require('ethers');

const RPC_URL = process.env.BERA_RPC_URL;

const errorSignatures = require('./magic_error.js');



// ABI for the mint functions we need
const contractABI = [
    "function mint(uint32 qty, uint32 limit, bytes32[] calldata proof, uint256 timestamp, bytes calldata signature) external payable",
    "function getStageInfo(uint256 index) external view returns (tuple(uint256 price, uint80 mintFee, uint32 walletLimit, bytes32 merkleRoot, uint256 maxStageSupply, uint256 startTimeUnixSeconds, uint256 endTimeUnixSeconds), uint32, uint256)",
    "function getActiveStageFromTimestamp(uint256 timestamp) public view returns (uint256)",
    "function getNumberStages() external view returns (uint256)"
];


async function mintMagicNFT(userState) {
    try {
        // Get current active stage
        const contractAddress = userState.contractAddress;
        const privateKey = userState.privateKey;
        const quantity = userState.quantity;

        console.log("Collecting Stage Info...\n");

        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const wallet = new ethers.Wallet(privateKey, provider);
        console.log(`Private Key: ${privateKey}`);

        const contract = new ethers.Contract(contractAddress, contractABI, wallet);
        console.log(`Contract Address: ${contractAddress}`);

        const currentTimestamp = Math.floor(Date.now() / 1000);
        console.log(`Current Timestamp: ${currentTimestamp}`);
        const activeStateNumber = await contract.getNumberStages();
        if (Number(activeStateNumber) === 0) {
            console.log("No active stage found.");
            return;
        }
        const activeStage = await contract.getActiveStageFromTimestamp(currentTimestamp);
        
        // Get stage info
        const [stageInfo] = await contract.getStageInfo(activeStage);

        console.log("Stage Info Getted");
        
        // Calculate total cost
        const totalPrice = stageInfo.price.mul(quantity);
        const totalFee = stageInfo.mintFee.mul(quantity);
        const totalCost = totalPrice.add(totalFee);
        console.log(`Quantity: ${quantity}`);

        console.log(`Stage Price: ${ethers.utils.formatEther(stageInfo.price)} ETH`);
        console.log(`Mint Fee: ${ethers.utils.formatEther(stageInfo.mintFee)} ETH`);
        console.log(`Total Cost: ${ethers.utils.formatEther(totalCost)} ETH`);

        // For public mint without merkle proof
        const emptyProof = [];
        const limit = 0;
        const timestamp = currentTimestamp;
        const signature = "0x"; // Empty signature if no cosigner

        console.log("Minting...");

        // Execute mint transaction
        const tx = await contract.mint(
            quantity,
            limit,
            emptyProof,
            timestamp,
            signature,
            {
                value: totalCost,
                gasLimit: 500000
            }
        );

        console.log(`Mint transaction sent: ${tx.hash}`);
        const receipt = await tx.wait();
        console.log(`Mint successful! Gas used: ${receipt.gasUsed.toString()}`);

        return {success: 'Success'}

    } catch (error) {
        if((getErrorName(error.data) === undefined) == false) {
            console.log("Error is Occured:", getErrorName(error.data));
            return getErrorName(error.data);
        } else if((error.shortMessage === undefined) == false) {
            console.log("Error is Occured on Short Message:", error.shortMessage);
            return error.shortMessage;
        } else {
            console.log("Error is Occured on Custom Error:", error);
            return "Custom Error is occured";
        }
    }
}

function getErrorName(signature) {
    return Object.keys(errorSignatures).find(key => errorSignatures[key] === signature);
}

module.exports = { mintMagicNFT };
