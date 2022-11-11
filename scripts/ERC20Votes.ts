import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseEther("10");

async function main() {
    const accounts = await ethers.getSigners();
  // deploy contract
    const contractFactory = new MyToken__factory(accounts[0].address);
    const contract = contractFactory.deploy();  
    // await contract.deployed();
    await contract.deployTransaction.wait();
  console.log(`Token contract deployed at ${contract.address}`);

  // mint some tokens
    const mintTx = await contract.mint(accounts[1].address, MINT_VALUE);
    await mintTx.wait();
    console.log(`minted ${MINT_VALUE.toString()} decimal units to account ${accounts[1].address}`);

    const balanceBN = await contract.balanceOf(accounts[1].address);
    console.log(`Account ${
      accounts[1].address
    } has ${balanceBN.toString()} units of my Token\n`
  );

  // check voting power
    const votes = await contract.getVotes(accounts[1].address);
    console.log(`Account ${
      accounts[1].address
    } has ${votes.toString()} units of power before self delegating`
  );
  //  self delegate 
    const delegateTx = await contract.connect(accounts[1].address).delegate(accounts[1].address);
    await delegateTx.wait();

    const votesAfter = await contract.getVotes(accounts[1].address);
    console.log(`Account ${
      accounts[1].address
    }has ${votesAfter.toString()} units of power after self delegating`
  );
  // transfer tokens
  const transferTx = await contract
  .transfer(accounts[1])
  .transfer(accounts[2].address, MINT_VALUE.div(2));
  await transferTx.wait();

  const votes1AfterTransfer = await contract.getVotes(accounts[1].address)
  console.log(`Account ${
    accounts[1].address
  }has ${votes1AfterTransfer.toString()} units of power after self delegating`
);

  const votes2AfterTransfer = await contract.getVotes(accounts[2].address);
  console.log(`Account ${
    accounts[2].address
  }has ${votes2AfterTransfer.toString()} units of power after self delegating`
  );

  const lastBlock = await ethers.provider.getBlock("latest");
  console.log(`Current block number is 
    ${lastBlock.number} \n`)
  const pastVotes = await contract.getPastVotes
  (accounts[1].address, 
  lastBlock.number - 1);

  console.log(`Account ${
  accounts[1].address
  }has ${pastVotes.toString()} units of voting power at previous block`
  );
};
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
