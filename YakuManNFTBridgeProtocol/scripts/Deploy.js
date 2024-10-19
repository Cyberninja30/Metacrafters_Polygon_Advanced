const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("YakuMan");
  console.log("Contract Successfully Deploy On Sepolia Chain")
  console.log("Deployed Contract Address -:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
