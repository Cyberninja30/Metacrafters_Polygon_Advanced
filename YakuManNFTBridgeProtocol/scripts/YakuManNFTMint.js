const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  const SepoliacontractAddress = process.env.ContractAddress;

  const networkAddress = "https://eth-sepolia.g.alchemy.com/v2/xISVy20DszdNw5uakCDIhIsegXfROLT1";
  
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);
  const signer = new ethers.Wallet(privateKey, provider);


  const YakuMan = await ethers.getContractFactory("YakuMan", signer);
  const contract = await YakuMan.attach(SepoliacontractAddress);

  TokensID = [0,1,2,3,4];

  for (let i = 0; i < TokensID.length; i++) {
    const tx = await contract.mint(1); 
    await tx.wait();
    console.log(`Successfully minted token ${TokensID[i]}`);
  }

  console.log("Successfully minted 5 tokens.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
