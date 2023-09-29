// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

//Library
//Libraries are similar to contracts, but you can't declare any state variable and you can't send ether.
//A library is embedded into the contract if all library functions are internal.
//Otherwise the library must be deployed and then linked before the contract is deployed.
library PriceConverter {
    function getPrice(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        // //ABI
        // // ADDRESS(ETH/USD -Goreli) - 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        // AggregatorV3Interface priceFeed = AggregatorV3Interface(
        //     0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        // );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        //ETH in terms of USD
        //3000.00000000 - 8 Decimals
        //where ether has 18 decimals, so we convert this USD to 18 decimals by *1e10(1**10)
        return uint256(price * 1e10); //1**10 == 10000000000
    }

    // //Don't need this function for this particular contract, which we are using this Library for
    // function getVersion() internal view returns (uint256) {
    //     AggregatorV3Interface priceFeed = AggregatorV3Interface(
    //         0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
    //     );
    //     return priceFeed.version();
    // }

    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUsd;
    }
}
