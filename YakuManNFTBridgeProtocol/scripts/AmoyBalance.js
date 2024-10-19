const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/YakuMan.sol/YakuMan.json");

const AmoytokenAddress = process.env.AmoyContractAddress;
const tokenABI = tokenContractJSON.abi;
const walletAddress = process.env.WalletAddress;

async function main() {
  try {
    const token = await hre.ethers.getContractAt(tokenABI, AmoytokenAddress);
    const balance = await token.balanceOf(walletAddress);
    console.log(`Amoy Polygon Balance: ${balance} NFT`);
  } catch (error) {
    console.log(error);
    process.exitCode = 1;
  }
}

main();
