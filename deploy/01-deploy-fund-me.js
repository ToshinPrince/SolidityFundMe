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
  const { deploy, log } = deployments;
  const { deployer } = getNamedAccounts;
  const chainId = network.config.chainId;
};
