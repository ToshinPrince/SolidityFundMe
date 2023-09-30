// async function deployFunc(hre) {
//   console.log("Hi");
// }
// module.exports.default = deployFunc;

const { network } = require("hardhat");

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
  const { deployer } = getNamedAccounts;
  const chainId = network.config.chainId;
};
