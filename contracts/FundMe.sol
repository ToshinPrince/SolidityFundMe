// SPDX-License-Identifier: MIT

//Get Funds from Users
//Withdraw Funds
//Set a minimum Funding value in USD

pragma solidity ^0.8.8;
import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;

    uint256 public minimumUsd = 50 * 1e18; //1 * 10 ** 18
    // This array is tracking contributors addresses
    address[] public funders;
    //This mapping tracks the amount of contributions made by different Ethereum addresses.
    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable {
        require(
            // getConversionRate(msg.value) -> now we have transfered getConversionRate to library, so below code is valid.
            msg.value.getConversionRate() >= minimumUsd,
            "Didn't Send Enough"
        ); //1e18 == 1 * 10 ** 18 == 1000000000000000000
        //18 decimals
        //Pushing funder address to the Array
        funders.push(msg.sender);
        //Mapping amount of ETH to address
        addressToAmountFunded[msg.sender] = msg.value;
    }

    // function withdraw() {}
}
