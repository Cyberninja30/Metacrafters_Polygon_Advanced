const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/YakuMan.sol/YakuMan.json");

const ContractAddress = process.env.ContractAddress;
const tokenABI = tokenContractJSON.abi;
const walletAddress = process.env.WalletAddress;

async function main() {
  try {
    const token = await hre.ethers.getContractAt(tokenABI, ContractAddress);
    const balance = await token.balanceOf(walletAddress);
    console.log(`Sepolia Balance: ${balance} NFT`);
  } catch (error) {
    console.log(error);
    process.exitCode = 1;
  }
}

main();
