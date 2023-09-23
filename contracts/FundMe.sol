// SPDX-License-Identifier: MIT

//Get Funds from Users
//Withdraw Funds
//Set a minimum Funding value in USD

pragma solidity ^0.8.8;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    uint256 public minimumUsd = 50 * 1e18; //1 * 10 ** 18

    function fund() public payable {
        require(getConversionRate(msg.value) > 1e18, "Didn't Send Enough"); //1e18 == 1 * 10 ** 18 == 1000000000000000000
        //18 decimals
    }

    function getPrice() public view returns (uint256) {
        //ABI
        // ADDRESS(ETH/USD -Goreli) - 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        //ETH in terms of USD
        //3000.00000000 - 8 Decimals
        //where ether has 18 decimals, so we convert this USD to 18 decimals by *1e10(1**10)
        return uint256(price * 1e10); //1**10 == 10000000000
    }

    function getVersion() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
        return priceFeed.version();
    }

    function getConversionRate(
        uint256 ethAmount
    ) public view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUsd;
    }

    // function withdraw() {}
}
