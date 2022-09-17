# Lesson 6 - Building unit tests for HelloWorld.sol
## (Review) Coding in VS Code
* Syntax for typescript scripts
* How the project operates
* Writing a test file
* Using Ethers.js library
* Using Hardhat toolbox
* Using Typechain library
* Testing syntax
* Running a test file
### References
https://docs.ethers.io/v5/

https://hardhat.org/hardhat-runner/docs/getting-started#overview

https://mochajs.org/

https://hardhat.org/hardhat-chai-matchers/docs/overview

https://www.chaijs.com/guide/

https://github.com/dethcrypto/TypeChain

## TDD methodology
* Writing unit tests that fail first
* Filling code that completes the test
* Refactoring
* Measuring code smell
* Measuring coverage
* Iteration process
* How HelloWorld.sol could be tested
### References
https://www.agilealliance.org/glossary/tdd/

https://www.browserstack.com/guide/what-is-test-driven-development

## Running tests on HelloWorld.sol
* Contract
<pre><code>// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld {
    string private text;
    address public owner;

    constructor() {
        text = "Hello World";
        owner = msg.sender;
    }

    function helloWorld() public view returns (string memory) {
        return text;
    }

    function setText(string calldata newText) public onlyOwner {
        text = newText;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    modifier onlyOwner()
    {
        require (msg.sender == owner, "Caller is not the owner");
        _;
    }
}
</code></pre>
* Tests
<pre><code>import { expect } from "chai";
import { ethers } from "hardhat";
import { HelloWorld } from "../typechain";

describe("HelloWorld", function () {
  let helloWorldContract: HelloWorld;

  this.beforeEach(async function () {
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    helloWorldContract = await helloWorldFactory.deploy();
    await helloWorldContract.deployed();
  });

  it("Should give a Hello World", async function () {
    expect(await helloWorldContract.helloWorld()).to.equal("Hello World");
  });

  it("Should set owner to deployer account", async function () {
    const accounts = await ethers.getSigners();
    expect(await helloWorldContract.owner()).to.equal(accounts[0].address);
  });

  it("Should not allow anyone other than owner to call transferOwnership", async function () {
    const accounts = await ethers.getSigners();
    await expect(
      helloWorldContract
        .connect(accounts[1])
        .transferOwnership(accounts[1].address)
    ).to.be.revertedWith("Caller is not the owner");
  });

  it("Should change text correctly", async function () {
    // TODO
    throw Error("Not implemented");
  });

  it("Should not allow anyone other than owner to change text", async function () {
    // TODO
    throw Error("Not implemented");
  });
});
</code></pre>

# Homework
* Create Github Issues with your questions about this lesson
* Read the references