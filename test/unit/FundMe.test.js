const { deployments, ethers, getNamedAccounts } = require("hardhat");

describe("FundMe", () => {
  let fundMe;
  beforeEach(async () => {
    //deploy our fundMe Contract
    //using hardhat-deploy
    // const accounts = await ethers.getSigners();
    // const accountZero = accounts[0];

    const { deployer } = await getNamedAccounts();
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContract("FundMe", deployer);
  });
  describe("constructor", () => {});
});
