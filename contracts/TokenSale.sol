// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IMyERC20 {
    function mint(address to, uint256 amount) external;
}

contract TokenSale is IMyERC20 {
    uint256 public ratio;
    address public paymentToken;
    // underscore helps us make a state variable
    constructor(uint256 _ratio, address _paymentToken) {
        ratio = _ratio;
        paymentToken = IMyERC20(_paymentToken);

    }


    function buyTokens() external payable {
        uint256 amountToBeMinted = msg.value / ratio;
        paymentToken.mint(msg.sender, amount);
    }
}
