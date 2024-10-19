const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/YakuMan.sol/YakuMan.json");

const tokenAddress = process.env.ContractAddress;
const tokenABI = tokenContractJSON.abi;
const FxERC721RootTunnel = process.env.BridgeAddress;
const walletAddress = process.env.WalletAddress;

async function main() {
  try {
    const tokenContract = await hre.ethers.getContractAt(
      tokenABI,
      tokenAddress
    );
    const fxContract = await hre.ethers.getContractAt(
      fxRootContractABI,
      FxERC721RootTunnel
    );

    const approveTx = await tokenContract.setApprovalForAll(
      FxERC721RootTunnel,
      true
    );

    TokensID = [0,1,2,3,4];

    await approveTx.wait();    

    for (let i = 0; i < TokensID.length; i++) {
      const depositTx = await fxContract.deposit(
        tokenAddress,
        walletAddress,
        TokensID[i],
        "0x6556"
      );
      await depositTx.wait();
      console.log(`YakuArmy token ${TokensID[i]} bridged successfully!`);
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

main();
