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

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Not the owner");
        _;
    }

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

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex > funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        //reset the array
        //2 way -> 1) loop through the each array index and set it 0
        //2) given below
        funders = new address[](0);

        // // There are 3 ways to withdraw(transfer, send & call)
        // //1)transfer -> msg.sender = address, payable(msg.sender) = payable address
        // payable(msg.sender).transfer(address(this).balance);
        // // send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send Failed");
        //call
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call Failed");
    }
}
