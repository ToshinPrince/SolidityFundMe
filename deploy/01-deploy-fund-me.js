// async function deployFunc(hre) {
//   console.log("Hi");
// }
// module.exports.default = deployFunc;

const { network } = require("hardhat");

// const helperConfig = require("../helper-hardhat-config");//or use these 2 lines ->Line1
// const networkConfig = helperConfig.networkConfig;//->Line1
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");

const { verify } = require("../utils/verify");
require("dotenv").config();

// module.exports = async (hre) => {
//   const { getNamedAccounts, deployments } = hre;
//or
// // hre.getNamedAccounts;
// // hre.deployments;
// };

module.exports = async ({ getNamedAccounts, deployments }) => {
  // Destructuring
  //deploy is a function that allows you to deploy contracts.
  //log is a function for logging messages to the console.
  //deployer is an address provided by Hardhat. It typically represents the address that will deploy the contract.
  //network.config.chainId. The chain ID uniquely identifies the blockchain network you are connected to. Different blockchains and testnets have different chain IDs.
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  let ethUsdPriceFeedAddress;

  if (chainId == 31337) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = await networkConfig[chainId]["ethUsdPriceFeed"];
  }

  log("--------------------------------------------------------------------");
  log("Deploying FundMe and waiting for Confirmations....");

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress], //Put Price Feed Address
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log("----------------------------------------------------------------------");

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, [ethUsdPriceFeedAddress]);
  }
  log("----------------------------------------------------------------------");
};

module.exports.tags = ["all", "fundme"];
