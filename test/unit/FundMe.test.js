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
      const sendValue = ethers.utils.parseEther("1"); //1Ether

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

      describe("fund", function () {
        it("Fails, If you dont send enough ETH", async function () {
          await expect(fundMe.fund()).to.be.revertedWith(
            "Didn't Send Enough ETH"
          );
        });

        it("Update the Amount Funded Data structure", async function () {
          await fundMe.fund({ value: sendValue });
          const response = await fundMe.addressToAmountFunded(deployer);
          assert.equal(response.toString(), sendValue.toString());
        });

        it("add funders to array of funders", async function () {
          await fundMe.fund({ value: sendValue });
          const funder = await fundMe.funders(0);
          assert(funder, deployer.address);
        });
      });
    });
