const { takeSnapshot } = require("@nomicfoundation/hardhat-network-helpers");
const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();

  const fundMe = await ethers.getContract("FundMe", deployer);
  console.log(`Got Contract FundMe at ${fundMe.address}`);
  console.log(`Withdrawing from contract...`);
  const transactionResponse = await fundMe.withdraw();
  await transactionResponse.wait();

  console.log("Withdrawing Completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
