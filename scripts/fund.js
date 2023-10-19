const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const fundMe = await ethers.getContract("FundMe", deployer);
  console.log(`Got Contract FundMe at ${fundMe.address}`);
  console.log("Funding COntract...");
  const transactionResponse = await fundMe.fund({
    value: ethers.utils.parseEther("0.1"),
    gasLimit: 1000000,
    gasPrice: ethers.utils.parseUnits("50", "gwei"),
  });

  await transactionResponse.wait();
  console.log("Funded!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
