// Validate private key
function isValidPrivateKey(privateKey) {
    try {
        // Remove '0x' prefix if present
        const cleanPrivateKey = privateKey.startsWith('0x') ? privateKey.slice(2) : privateKey;
        
        // Check length and hex format
        if (!/^[0-9a-fA-F]{64}$/.test(cleanPrivateKey)) {
            return false;
        }
        
        // Try creating a wallet with the key
        const wallet = new ethers.Wallet(privateKey);
        return true;
    } catch {
        return false;
    }
}

// Validate contract address
async function isValidContract(provider, address) {
    try {
        // Check address format
        if (!ethers.utils.isAddress(address)) {
            return false;
        }
        
        // Check if contract exists
        const code = await provider.getCode(address);
        return code !== '0x';
    } catch {
        return false;
    }
}

module.exports = {
    isValidPrivateKey,
    isValidContract
};