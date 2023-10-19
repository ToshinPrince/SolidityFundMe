const { assert } = require("chai");
const { network, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe Staging Tests", function () {
      let deployer;
      let fundMe;
      const sendValue = ethers.utils.parseEther("0.1");
      console.log("Deploying Contract, before each");
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;

        fundMe = await ethers.getContract("FundMe", deployer);
        console.log(
          "Initial contract balance: ",
          (await fundMe.provider.getBalance(fundMe.address)).toString()
        );
      });

      it("allows people to fund and withdraw", async function () {
        console.log("fundTxResponse");
        const fundTxResponse = await fundMe.fund({
          value: sendValue,
          gasLimit: 1000000,
          gasPrice: ethers.utils.parseUnits("50", "gwei"),
        });
        console.log("fundTxResponse.wait()");
        await fundTxResponse.wait();
        console.log("withdrawTxResponse");
        const withdrawTxResponse = await fundMe.withdraw({
          gasLimit: 1000000,
          gasPrice: ethers.utils.parseUnits("50", "gwei"),
        });
        await withdrawTxResponse.wait();

        const endingFundMeBalance = await fundMe.provider.getBalance(
          fundMe.address
        );
        console.log(
          endingFundMeBalance.toString() +
            " should equal 0, running assert equal..."
        );
        assert.equal(endingFundMeBalance.toString(), "0");
      });
    });

//...........................................................................
// const { assert } = require("chai");
// const { network, ethers, getNamedAccounts } = require("hardhat");
// const { developmentChains } = require("../../helper-hardhat-config");

// developmentChains.includes(network.name)
//   ? describe.skip
//   : describe("FundMe Staging Tests", function () {
//       let fundMe;
//       let deployer;
//       const sendValue = ethers.utils.parseEther("0.1");
//       beforeEach(async function () {
//         deployer = (await getNamedAccounts()).deployer;
//         fundMe = await ethers.getContract("FundMe", deployer);
//       });
//       //Allows to fund and withdraw
//       it("Allows People to fund and withdraw", async function () {
//         const fundTxResponse = await fundMe.fund({ value: sendValue });
//         await fundTxResponse.wait(1);
//         const withdrawTxResponse = await fundMe.withdraw();
//         await withdrawTxResponse.wait(1);

//         const endingFundMeBalance = await fundMe.provider.getBalance(
//           fundMe.address
//         );

//         console.log(
//           endingFundMeBalance.toString() +
//             " should equal 0, running assert equal..."
//         );

//         assert.equal(endingFundMeBalance.toString(), "0");
//       });
//     });
