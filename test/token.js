const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MintingStation", function () {

  let owner;
  let addr1;
  let addr2;
  let addrs;
  let tokenErc20;
  let amount = 1000;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const Token = await hre.ethers.getContractFactory("Rabbit");
    tokenErc20 = await Token.deploy();
    await tokenErc20.deployed();
  });

  describe('Deployment', function() {
    it("Should set the right owner", async function() {
      // check nft owner
      expect(await tokenErc20.owner()).to.equal(owner.address);
    });
  });

  describe('Test', function() {
    it("Should minting", async function() {
      await tokenErc20.mint(addr1.address, amount)

      expect(await tokenErc20.balanceOf(addr1.address)).to.equal(amount);
    });

    it("Mint over max supply", async function() {
      expect(tokenErc20.mint(addr1.address, '200000000000000000000000000')).to.be.revertedWith("RAB::max total supply");
    });
  });
});
