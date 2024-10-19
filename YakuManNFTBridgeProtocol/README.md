# ERC271A NFT Bridge Protocol 

The objective of this project is to deploy a 5-item NFT collection on the Ethereum blockchain and then map it to the Polygon network to reduce gas fees and increase accessibility. The NFTs will be generated using an AI image generation tool like DALLE 2 or Midjourney, with the images stored securely on IPFS via Pinata.cloud. The collection will be deployed using an ERC721 or ERC1155 smart contract on the Goerli Ethereum Testnet, and the smart contract will include a `promptDescription` function to return the prompt used to create each image.

Once deployed, the NFTs will be batch minted using an optimized ERC721A contract and transferred to the Polygon Mumbai Testnet using the FxPortal Bridge. This will involve approving the NFTs for transfer, depositing them into the bridge, and validating the transfer by testing the `balanceOf` function on Mumbai. By leveraging the Polygon network, the project will reduce transaction costs and enhance the scalability of the NFT collection.

## Introduction To ERC271A Standard

ERC721A is an extension of the ERC721 standard designed to optimize gas usage when minting multiple NFTs in a single transaction. Created by the team at Azuki, ERC721A enables more efficient batch minting, significantly reducing the costs associated with creating multiple tokens, especially compared to the standard ERC721 implementation.

## YakuMan Contract Explanation 

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract YakuMan is ERC721A {
    
    address public owner;
    uint256 public constant NFT_LIMIT = 5;
    string public mustandCarDescription = "YakuArmy that have powerful personality."; 
    string private BaseUrl = "https://rose-cheerful-dingo-749.mypinata.cloud/ipfs/QmWWg5LNpyYhQYTisz2twuDSs525yu8cbCm1vjGiTCa19z/";

    constructor() ERC721A("YakuMan", "YMA") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "YakuArmy: You are not authorized to mint.");
        _;
    }

    function mint(uint256 quantity) external onlyOwner {
        require(totalSupply() + quantity <= NFT_LIMIT, "YakuArmy: Minting would exceed the maximum supply.");
        _mint(msg.sender, quantity);
    }

    function _baseURI() internal view override returns (string memory) {
        return BaseUrl;
    }

    function getMustandCarDescription() external view returns (string memory) {
        return mustandCarDescription;
    }
}
```

This YakuMan contract is an implementation of the ERC721A standard, which is designed for efficient gas usage during batch minting of NFTs. The contract defines a collection of NFTs with a maximum supply of 5 tokens, set by the constant NFT_LIMIT. It inherits from ERC721A, a variation of the standard ERC721, and allows for the minting of multiple tokens at once with lower gas costs. The contract constructor sets the name and symbol of the NFT collection as "YakuMan" and "YMA" and assigns the deployer’s address as the owner.

The minting function, mint, can only be called by the owner, enforced through the onlyOwner modifier, and it ensures that the total minted supply doesn’t exceed the predefined limit. The contract stores metadata for the NFTs on IPFS, using the private variable BaseUrl to define the base URI for the token metadata, which is returned by the _baseURI function. Additionally, there is a public description field mustandCarDescription, which provides a narrative for the NFT collection. Users can retrieve this description via the getMustandCarDescription function, offering insight into the theme of the collection. Overall, the contract ensures gas efficiency, access control, and proper metadata management for an NFT project.

## Installation and Execution Guide

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (version 16.x or later)
- **npm** (Node Package Manager) or **yarn**
- **Hardhat** (A development environment for Ethereum)
- **Metamask** (Or any other Ethereum-compatible wallet)

### Step 1: Clone the Repository
First, clone the project repository to your local machine.

```bash
git clone https://github.com/your-username/your-nft-project.git
cd your-nft-project
```

### Step 2: Install Dependencies
Once in the project directory, install the required dependencies.

```bash
npm install
```
or, if using Yarn:
```bash
yarn install
```

### Step 3: Set Up Environment Variables
Create a `.env` file in the root directory and add the following variables, replacing the placeholder values with your own:

```bash
PRIVATE_KEY = ""
ContractAddress =""
WalletAddress = ""
BridgeAddress = ""
AmoyContractAddress = ""
```
- **PRIVATE_KEY**: Your wallet's private key for deploying contracts (use a test wallet for security).
- **INFURA_PROJECT_ID**: Infura project ID for connecting to Ethereum or Polygon networks.
- **ETHERSCAN_API_KEY**: (Optional) Used for contract verification.

### Step 4: Compile the Contracts
Compile the smart contracts using Hardhat.

```bash
npx hardhat compile
```

### Step 5: Deploy the Contract
Deploy the NFT contract to the Sepolia Testnet (or any desired network). Make sure your wallet has testnet ETH for gas fees.

```bash
npx hardhat run scripts/Deploy.js --network sepolia
```

### Step 6: Mint NFTs
After deployment, use the following command to mint NFTs:

```bash
npx hardhat run scripts/YakuManNFTMint.js --network sepolia
```

### Step 7: Transfer NFTs
Once the NFTs are minted, transfer them using the following command:

```bash
npx hardhat run scripts/TransferNFTAmoy.js --network sepolia
```

### Step 8: Check NFT Balances
You can verify the balance of NFTs on both Sepolia and Amoy networks using these commands:

For Sepolia:
```bash
npx hardhat run scripts/SepoliaBalance.js --network sepolia
```

For Amoy:
```bash
npx hardhat run scripts/AmoyBalance.js --network amoy
```

---

### Optional: Configure Polygon Bridge

To transfer NFTs between Ethereum (Sepolia) and Polygon (Mumbai), use the FxPortal Bridge and follow the steps provided in the project documentation.

### Final Notes
- Ensure that you have sufficient testnet ETH for deploying and minting transactions.
- You can use **Pinata.cloud** for storing your NFT images on IPFS.

