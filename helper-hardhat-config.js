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

// //package.json.....................................
// {
//   "devDependencies": {
//     "@nomicfoundation/hardhat-chai-matchers": "^2.0.0",
//     "@nomicfoundation/hardhat-ethers": "^3.0.0",
//     "@nomicfoundation/hardhat-network-helpers": "^1.0.0",
//     "@nomicfoundation/hardhat-toolbox": "^3.0.0",
//     "@nomicfoundation/hardhat-verify": "^1.0.0",
//     "@nomiclabs/hardhat-ethers": "npm:hardhat-deploy-ethers",
//     "@typechain/ethers-v6": "^0.4.0",
//     "@typechain/hardhat": "^8.0.0",
//     "chai": "^4.2.0",
//     "ethers": "^6.7.1",
//     "hardhat": "^2.17.4",
//     "hardhat-deploy": "^0.11.37",
//     "hardhat-gas-reporter": "^1.0.8",
//     "solidity-coverage": "^0.8.0",
//     "typechain": "^8.1.0"
//   },
//   "version": "0.0.0",
//   "dependencies": {
//     "@chainlink/contracts": "^0.7.1",
//     "dotenv": "^16.3.1",
//     "solhint": "^3.6.2"
//   }
// }
