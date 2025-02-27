const { ethers } = require('ethers');

const errorSignatures = {
    'CannotIncreaseMaxMintableSupply': ethers.keccak256(ethers.toUtf8Bytes('CannotIncreaseMaxMintableSupply()')).slice(0, 10),
    'GlobalWalletLimitOverflow': ethers.keccak256(ethers.toUtf8Bytes('GlobalWalletLimitOverflow()')).slice(0, 10),
    'InsufficientStageTimeGap': ethers.keccak256(ethers.toUtf8Bytes('InsufficientStageTimeGap()')).slice(0, 10),
    'InsufficientBalance': ethers.keccak256(ethers.toUtf8Bytes('InsufficientBalance()')).slice(0, 10),
    'InvalidProof': ethers.keccak256(ethers.toUtf8Bytes('InvalidProof()')).slice(0, 10),
    'InvalidStage': ethers.keccak256(ethers.toUtf8Bytes('InvalidStage()')).slice(0, 10),
    'InvalidStageArgsLength': ethers.keccak256(ethers.toUtf8Bytes('InvalidStageArgsLength()')).slice(0, 10),
    'InvalidStartAndEndTimestamp': ethers.keccak256(ethers.toUtf8Bytes('InvalidStartAndEndTimestamp()')).slice(0, 10),
    'NoSupplyLeft': ethers.keccak256(ethers.toUtf8Bytes('NoSupplyLeft()')).slice(0, 10),
    'NotEnoughValue': ethers.keccak256(ethers.toUtf8Bytes('NotEnoughValue()')).slice(0, 10),
    'NotMintable': ethers.keccak256(ethers.toUtf8Bytes('NotMintable()')).slice(0, 10),
    'Mintable': ethers.keccak256(ethers.toUtf8Bytes('Mintable()')).slice(0, 10),
    'StageSupplyExceeded': ethers.keccak256(ethers.toUtf8Bytes('StageSupplyExceeded()')).slice(0, 10),
    'TransferFailed': ethers.keccak256(ethers.toUtf8Bytes('TransferFailed()')).slice(0, 10),
    'WalletGlobalLimitExceeded': ethers.keccak256(ethers.toUtf8Bytes('WalletGlobalLimitExceeded()')).slice(0, 10),
    'WalletStageLimitExceeded': ethers.keccak256(ethers.toUtf8Bytes('WalletStageLimitExceeded()')).slice(0, 10),
    'WithdrawFailed': ethers.keccak256(ethers.toUtf8Bytes('WithdrawFailed()')).slice(0, 10),
    'WrongMintCurrency': ethers.keccak256(ethers.toUtf8Bytes('WrongMintCurrency()')).slice(0, 10),
    'NotSupported': ethers.keccak256(ethers.toUtf8Bytes('NotSupported()')).slice(0, 10),
    'NewSupplyLessThanTotalSupply': ethers.keccak256(ethers.toUtf8Bytes('NewSupplyLessThanTotalSupply()')).slice(0, 10),
    'NotTransferable': ethers.keccak256(ethers.toUtf8Bytes('NotTransferable()')).slice(0, 10),
    'InitialOwnerCannotBeZero': ethers.keccak256(ethers.toUtf8Bytes('InitialOwnerCannotBeZero()')).slice(0, 10),
    'ContractAlreadySetup': ethers.keccak256(ethers.toUtf8Bytes('ContractAlreadySetup()')).slice(0, 10),
    'TransferableAlreadySet': ethers.keccak256(ethers.toUtf8Bytes('TransferableAlreadySet()')).slice(0, 10)
  };

  module.exports = errorSignatures;