// SPDX-License-Identifier: MIT

//pragma
pragma solidity ^0.8.8;
//Imports
import "./PriceConverter.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

//Error Codes
error FundMe__NotOwner(); //error helps save gas

//Interfaces, Libraries, Contracts

/**
 * @title A Contract for crowd funding
 * @author Toshin Prince
 * @notice This contract is to demo sample Funding Contract
 * @dev This Implements price feeds as our library
 */
contract FundMe {
    //Type Declarations
    using PriceConverter for uint256;

    //State Variables
    // constant can not be changed - done for gas efficiency
    uint256 public constant MINIMUN_USD = 50 * 1e18; //1 * 10 ** 18
    // This array is tracking contributors addresses
    address[] public funders;
    //This mapping tracks the amount of contributions made by different Ethereum addresses.
    mapping(address => uint256) public addressToAmountFunded;

    // immutable can only be set once, here it will hammen in constructor - done for gas efficiency
    address public immutable i_owner;

    AggregatorV3Interface public priceFeed;

    modifier onlyOwner() {
        // require(i_owner == msg.sender, "Not the owner");

        if (msg.sender != i_owner) {
            revert FundMe__NotOwner(); //error helps save gas
        }
        _;
    }

    //Functions Order
    // //constructor
    // //receive
    // //fallback
    // //external
    // //public
    // //intrenal
    // //private
    // //view/pure

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    /**
     * @notice This function funds this contract
     * @dev This Implements price feeds as our library
     */
    function fund() public payable {
        require(
            // getConversionRate(msg.value) -> now we have transfered getConversionRate to library, so below code is valid.
            msg.value.getConversionRate(priceFeed) >= MINIMUN_USD,
            "Didn't Send Enough ETH"
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
        //2 way -> 1) loop through, each array index and set it 0
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
