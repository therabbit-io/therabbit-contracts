const { expect } = require("chai");
const { ethers } = require("hardhat");

function bigNumberify(n) {
  return ethers.BigNumber.from(n)
}

function expandDecimals(n, decimals) {
  return bigNumberify(n).mul(bigNumberify(10).pow(decimals))
}

describe("MintingStation", function () {

  let owner;
  let addr1;
  let addr2;
  let addrs;
  let tokenA;
  let tokenB;
  let swap;
  let rateAB = 1000;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const TokenA = await hre.ethers.getContractFactory("Rabbit");
    tokenA = await TokenA.deploy();
    await tokenA.deployed();
    await tokenA.mint(addr1.address, expandDecimals(1000, 18));

    const TokenB = await hre.ethers.getContractFactory("Rabbit");
    tokenB = await TokenB.deploy();
    await tokenB.deployed();

    const Swap = await hre.ethers.getContractFactory("Swap");
    swap = await Swap.deploy(tokenA.address, tokenB.address);
    await tokenB.mint(swap.address, expandDecimals(1, 18));
    await tokenA.connect(addr1).approve(swap.address, expandDecimals(1000, 18));
  });

  describe('Deployment', function() {
    it("Should set the right owner", async function() {
      // check nft owner
      expect(await tokenA.owner()).to.equal(owner.address);
    });
  });

  describe('Test', function() {
    it("Should swap", async function() {
      await swap.connect(addr1).swap(expandDecimals(1000, 18));
      const amountA = await tokenA.balanceOf(addr1.address);
      const amountB = await tokenB.balanceOf(addr1.address);
      console.log('amountA: ', amountA.toString());
      console.log('amountB: ', amountB.toString());
      expect(await tokenB.balanceOf(addr1.address)).to.equal(expandDecimals(1, 18));
    });
  });
});
