import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseEther("10");

async function main() {
    const accounts = await ethers.getSigners();
        // deploy contract
    const contractFactory = new MyToken__factory(accounts[0]);
    const contract = contractFactory.deploy();  
    await contract.deployed();
    // can also write: await contract.deployTransaction.wait();
       // mint some tokens
    const mintTx = await contract.mint(accounts[1].address, MINT_VALUE);
    await mintTx.wait();
       // check voting power
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
