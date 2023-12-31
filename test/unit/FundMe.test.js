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
          const response = await fundMe.getPriceFeed();
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
          const response = await fundMe.getAddressToAmountFunded(deployer);
          assert.equal(response.toString(), sendValue.toString());
        });

        it("add s_funders to array of s_funders", async function () {
          await fundMe.fund({ value: sendValue });
          const funder = await fundMe.getFunder(0);
          assert(funder, deployer.address);
        });
      });

      describe("Withdraw", function () {
        beforeEach(async function () {
          await fundMe.fund({ value: sendValue });
        });

        it("Withdraw ETH from Single founder", async function () {
          //Arrange
          //fundMe contract already has ethers
          //so  we can use fundMe.provider in place of ethers.provider, doesnt matter
          //Both are correct
          const startingFundMeBalance = await fundMe.provider.getBalance(
            fundMe.address
          );
          // we can also use this code-
          // const startingFundMeBalance = await ethers.provider.getBalance(
          //   fundMe.address
          // );
          const startingDeployerBalance = await fundMe.provider.getBalance(
            deployer
          );

          //act
          const transactionResponse = await fundMe.withdraw();
          const transactionReceipt = await transactionResponse.wait(1);
          const { gasUsed, effectiveGasPrice } = transactionReceipt;
          const gasCost = gasUsed.mul(effectiveGasPrice);

          const endingFundMeBalance = await fundMe.provider.getBalance(
            fundMe.address
          );

          // we can also use console.log for debugging - console.log is buildin
          // console.log("endingFundMeBalance:", endingFundMeBalance.toString());

          const endingDeployerBalance = await fundMe.provider.getBalance(
            deployer
          );
          //assert
          assert.equal(endingFundMeBalance, 0);
          assert.equal(
            startingFundMeBalance.add(startingDeployerBalance).toString(),
            endingDeployerBalance.add(gasCost).toString()
          );
        });

        it("Allows us to withdraw with multiple s_funders", async function () {
          const accounts = await ethers.getSigners();
          for (let i = 1; i < 6; i++) {
            const fundMeConnectedContract = await fundMe.connect(accounts[i]);
            await fundMeConnectedContract.fund({ value: sendValue });
          }

          //Arrange
          const startingFundMeBalance = await fundMe.provider.getBalance(
            fundMe.address
          );

          const startingDeployerBalance = await fundMe.provider.getBalance(
            deployer
          );

          console.log(
            "Starting FundMe Balance:",
            startingFundMeBalance.toString()
          );
          console.log(
            "Starting Deployer Balance:",
            startingDeployerBalance.toString()
          );

          //Act
          const transactionResponse = await fundMe.withdraw();
          const transactionReceipt = await transactionResponse.wait(1);
          const { gasUsed, effectiveGasPrice } = transactionReceipt;
          const gasCost = gasUsed.mul(effectiveGasPrice);

          const endingFundMeBalance = await fundMe.provider.getBalance(
            fundMe.address
          );
          const endingDeployerBalance = await fundMe.provider.getBalance(
            deployer
          );

          console.log("Ending FundMe Balance:", endingFundMeBalance.toString());
          console.log(
            "Ending Deployer Balance:",
            endingDeployerBalance.toString()
          );

          //Assert
          assert.equal(endingFundMeBalance, 0);
          assert.equal(
            startingFundMeBalance.add(startingDeployerBalance).toString(),
            endingDeployerBalance.add(gasCost).toString()
          );

          //Make sure that the s_funders are reset Properly
          await expect(fundMe.getFunder(0)).to.be.reverted;

          for (i = 1; i < 6; i++) {
            let account = await fundMe.getAddressToAmountFunded(
              accounts[i].address
            );
            // console.log(account.toString());
            assert.equal(account, 0);
          }
        });

        it("only Allows the Owner to withdraw", async function () {
          const accounts = await ethers.getSigners();
          const fundMeConnectedAddress = await fundMe.connect(accounts[1]);

          await expect(fundMeConnectedAddress.withdraw()).to.be.revertedWith(
            "FundMe__NotOwner"
          );
        });

        it("Withdraw ETH from Single founder, cheaperWithdraw", async function () {
          //Arrange
          //fundMe contract already has ethers
          //so  we can use fundMe.provider in place of ethers.provider, doesnt matter
          //Both are correct
          const startingFundMeBalance = await fundMe.provider.getBalance(
            fundMe.address
          );
          // we can also use this code-
          // const startingFundMeBalance = await ethers.provider.getBalance(
          //   fundMe.address
          // );
          const startingDeployerBalance = await fundMe.provider.getBalance(
            deployer
          );

          //act
          const transactionResponse = await fundMe.cheaperWithdraw();
          const transactionReceipt = await transactionResponse.wait(1);
          const { gasUsed, effectiveGasPrice } = transactionReceipt;
          const gasCost = gasUsed.mul(effectiveGasPrice);

          const endingFundMeBalance = await fundMe.provider.getBalance(
            fundMe.address
          );

          // we can also use console.log for debugging - console.log is buildin
          // console.log("endingFundMeBalance:", endingFundMeBalance.toString());

          const endingDeployerBalance = await fundMe.provider.getBalance(
            deployer
          );
          //assert
          assert.equal(endingFundMeBalance, 0);
          assert.equal(
            startingFundMeBalance.add(startingDeployerBalance).toString(),
            endingDeployerBalance.add(gasCost).toString()
          );
        });

        it("Cheaper Withdraw testing, cheaperWithdraw", async function () {
          const accounts = await ethers.getSigners();
          for (let i = 1; i < 6; i++) {
            const fundMeConnectedContract = await fundMe.connect(accounts[i]);
            await fundMeConnectedContract.fund({ value: sendValue });
          }

          //Arrange
          const startingFundMeBalance = await fundMe.provider.getBalance(
            fundMe.address
          );

          const startingDeployerBalance = await fundMe.provider.getBalance(
            deployer
          );

          console.log(
            "Starting FundMe Balance:",
            startingFundMeBalance.toString()
          );
          console.log(
            "Starting Deployer Balance:",
            startingDeployerBalance.toString()
          );

          //Act
          const transactionResponse = await fundMe.cheaperWithdraw();
          const transactionReceipt = await transactionResponse.wait(1);
          const { gasUsed, effectiveGasPrice } = transactionReceipt;
          const gasCost = gasUsed.mul(effectiveGasPrice);

          const endingFundMeBalance = await fundMe.provider.getBalance(
            fundMe.address
          );
          const endingDeployerBalance = await fundMe.provider.getBalance(
            deployer
          );

          console.log("Ending FundMe Balance:", endingFundMeBalance.toString());
          console.log(
            "Ending Deployer Balance:",
            endingDeployerBalance.toString()
          );

          //Assert
          assert.equal(endingFundMeBalance, 0);
          assert.equal(
            startingFundMeBalance.add(startingDeployerBalance).toString(),
            endingDeployerBalance.add(gasCost).toString()
          );

          //Make sure that the s_funders are reset Properly
          await expect(fundMe.getFunder(0)).to.be.reverted;

          for (i = 1; i < 6; i++) {
            let account = await fundMe.getAddressToAmountFunded(
              accounts[i].address
            );
            // console.log(account.toString());
            assert.equal(account, 0);
          }
        });
      });
    });
