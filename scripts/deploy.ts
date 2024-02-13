import { ethers } from "hardhat";

async function main() {
  const todos = await ethers.deployContract("Todos");

  await todos.waitForDeployment();

  console.log(
    `Todos Contract deployed to ${todos.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
