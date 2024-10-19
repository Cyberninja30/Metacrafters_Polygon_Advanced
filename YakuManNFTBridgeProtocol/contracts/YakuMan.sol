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
