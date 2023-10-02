const networkConfig = {
  31337: {
    name: "localhost",
  },
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e", //chainlink ethUsdPriceFeed for sepolia network
  },
  80001: {
    name: "polygonMumbai",
    ethUsdPriceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A", //chainlink ethUsdPriceFeed for polygon mumbai testnet network
  },
  //31337-hardhat
};
const developmentChains = ["hardhat", "localhost"];

//THIS is to pass to constructor arguments of AggregatorV3 Mock
// const DECIMALS = 8; //This is 8 decimals - can check more in AggregatorV3 Contract
// const INITIAL_ANSWER = 200000000000; //This is the initial input

module.exports = {
  networkConfig,
  developmentChains,
};
