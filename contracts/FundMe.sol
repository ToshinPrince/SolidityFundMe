// SPDX-License-Identifier: MIT

//Get Funds from Users
//Withdraw Funds
//Set a minimum Funding value in USD

pragma solidity ^0.8.8;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    uint256 public minimumUsd = 50;

    function fund() public payable {
        require(msg.value > 1e18, "Didn't Send Enough"); //1e18 == 1 * 10 ** 18 == 1000000000000000000
        //18 decimals
    }

    function getVersion() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
        return priceFeed.version();
    }

    // function withdraw() {}
}
