const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
const { developmentChains } = require("../../helper-hardhat-config");
const { network } = require("hardhat/internal/lib/hardhat-lib");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", function () {
      let fundMe;
      let deployer;
      let mockV3Aggregator;
      beforeEach(async () => {
        //deploy our fundMe Contract
        //using hardhat-deploy
        // const accounts = await ethers.getSigners();
        // const accountZero = accounts[0];

        // const { deployer } = await getNamedAccounts();
        // This account is used outside, so
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);

        // Use getContractFactory to create the contract instance
        fundMe = await ethers.getContract("FundMe", deployer);
        // fundMe = await ethers.getContract("FundMe", deployer);

        // Get the MockV3Aggregator contract
        // mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);

        mockV3Aggregator = await ethers.getContract(
          "MockV3Aggregator",
          deployer
        );
      });

      describe("constructor", function () {
        it("Sets the Aggregator Address Correctly", async function () {
          const response = await fundMe.priceFeed();
          assert.equal(response, mockV3Aggregator.address);
        });
      });
    });
