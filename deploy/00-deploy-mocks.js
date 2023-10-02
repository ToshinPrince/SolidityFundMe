const { network } = require("hardhat");

module.exports = async ({ getNamendAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamendAccounts;
  const chainId = network.config.chainId;
};
