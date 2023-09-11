import { ethers  } from "hardhat";

async function main() {
  
  // const Chai = await hre.ethers.getContractFactory("chai"); //fetching bytecode and ABI
  // const chai = await Chai.deploy(); //creating an instance of our smart contract

  // await chai

  const Starbucks = await ethers.getContractFactory("starbuckTeaShop");
const starbucks = await Starbucks.deploy(); //creating an instance of our smart contract 

  await starbucks.deploymentTransaction();//deploying your smart contract

  const address = await starbucks.getAddress()
  console.log("Deployed contract address:", `${address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
