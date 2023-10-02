require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.8",
  solidity: {
    compilers: [
      {
        version: "0.8.8",
      },
      {
        version: "0.6.6",
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {},
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  //what happnes when we want to change chains
  //When going for localhost or hardhat network we want to use a mock
};
