const hre = require("hardhat");

const rab = "0x24Ef78C7092d255Ed14a0281ac1800C359aF3afe";
const antex = "0xCA1aCAB14e85F30996aC83c64fF93Ded7586977C";

async function main() {
  const Token = await hre.ethers.getContractFactory("Swap");
  const token = await Token.deploy(antex, rab);
  await token.deployed();

  console.log("Swap deployed to:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
