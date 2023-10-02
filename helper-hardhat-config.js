const networkConfig = {
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

module.exports = {
  networkConfig,
};
