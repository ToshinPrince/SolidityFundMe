const { network } = require("hardhat");

const DECIMALS = "8";
const INITIAL_PRICE = "200000000000"; // 2000
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  // If we are on a local development network, we need to deploy mocks!
  if (chainId == 31337) {
    log("Local network detected! Deploying mocks...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    });
    log("Mocks Deployed!");
    log("------------------------------------------------");
    log(
      "You are deploying to a local network, you'll need a local network running to interact"
    );
    log(
      "Please run `npx hardhat console` to interact with the deployed smart contracts!"
    );
    log("------------------------------------------------");
  }
};
module.exports.tags = ["all", "mocks"];

// //.........----------------.................---------------.......................----------........
// const { network } = require("hardhat");
// const { developmentChains } = require("../helper-hardhat-config");

// //THIS is to pass to constructor arguments of AggregatorV3 Mock
// const DECIMALS = "8"; //This is 8 decimals - can check more in AggregatorV3 Contract
// const INITIAL_ANSWER = "200000000000"; //2000 This is the initial input

// module.exports = async ({ getNamedAccounts, deployments }) => {
//   const { deploy, log } = deployments;
//   const { deployer } = await getNamedAccounts();
//   const chainId = network.config.chainId;

//   if (chainId == 31337) {
//     log("Local Network Detected Deploying Mocks...");
//     await deploy("MockV3Aggregator", {
//       contract: "MockV3Aggregator",
//       from: deployer,
//       log: true,
//       args: [DECIMALS, INITIAL_ANSWER],
//     });
//     log("Mocks Deployed");
//     log(
//       "---------------------------------------------------------------------------"
//     );
//   }
// };

// module.exports.tags = ["all", "mocks"];
