const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("CoffeePortal", function () {
  it ("should be able to deploy a contract", async function () {
    const CoffeePortal = await ethers.getContractFactory("CoffeePortal");
    const coffeePortal = await CoffeePortal.deploy();
    expect(coffeePortal.address).to.be.a("string");
  })

  it ("should be able to buy a coffee", async function () {
    const CoffeePortal = await ethers.getContractFactory("CoffeePortal");
    const coffeePortal = await CoffeePortal.deploy();
    const [giver] = await ethers.getSigners();
    const coffeeTxn = await coffeePortal.connect(giver).buyCoffee(
      "Clinton",
      "This is a test coffee",
      {
        value: ethers.utils.parseEther("0.1"),
      }
    );
    await coffeeTxn.wait();
    expect(coffeeTxn.hash).to.be.a("string");
  })

  it ("should be able to buy a coffee from 2 different accounts", async function () {
    const CoffeePortal = await ethers.getContractFactory("CoffeePortal");
    const coffeePortal = await CoffeePortal.deploy();
    const [giver1, giver2] = await ethers.getSigners();
    const coffeeTxn1 = await coffeePortal.connect(giver1).buyCoffee(
      "Clinton",
      "This is a test coffee",
      {
        value: ethers.utils.parseEther("0.1"),
      }
    );
    await coffeeTxn1.wait();
    expect(coffeeTxn1.hash).to.be.a("string");

    const coffeeTxn2 = await coffeePortal.connect(giver2).buyCoffee(
      "Clinton",
      "This is a test coffee #2",
      {
        value: ethers.utils.parseEther("0.1"),
      }
    );
    await coffeeTxn2.wait();
    expect(coffeeTxn2.hash).to.be.a("string");
  })

  it ("should be able to get total coffee", async function () {
    const CoffeePortal = await ethers.getContractFactory("CoffeePortal");
    const coffeePortal = await CoffeePortal.deploy();
    const [giver1, giver2] = await ethers.getSigners();
    const coffeeTxn1 = await coffeePortal.connect(giver1).buyCoffee(
      "Clinton",
      "This is a test coffee",
      {
        value: ethers.utils.parseEther("0.1"),
      }
    );
    await coffeeTxn1.wait();
    expect(coffeeTxn1.hash).to.be.a("string");

    const coffeeTxn2 = await coffeePortal.connect(giver2).buyCoffee(
      "Clinton",
      "This is a test coffee #2",
      {
        value: ethers.utils.parseEther("0.1"),
      }
    );
    await coffeeTxn2.wait();
    expect(coffeeTxn2.hash).to.be.a("string");

    const totalCoffee = await coffeePortal.getTotalCoffee();
    expect(totalCoffee).to.equal(2);
  })

  it ("should be able to get all coffees", async function () {
    const CoffeePortal = await ethers.getContractFactory("CoffeePortal");
    const coffeePortal = await CoffeePortal.deploy();
    const [giver1, giver2] = await ethers.getSigners();
    const coffeeTxn1 = await coffeePortal.connect(giver1).buyCoffee(
      "Clinton",
      "This is a test coffee",
      {
        value: ethers.utils.parseEther("0.1"),
      }
    );
    await coffeeTxn1.wait();
    expect(coffeeTxn1.hash).to.be.a("string");

    const coffeeTxn2 = await coffeePortal.connect(giver2).buyCoffee(
      "Clinton",
      "This is a test coffee #2",
      {
        value: ethers.utils.parseEther("0.1"),
      }
    );
    await coffeeTxn2.wait();
    expect(coffeeTxn2.hash).to.be.a("string");

    const allCoffees = await coffeePortal.getAllCoffee();
    expect(allCoffees).to.be.a("array");
    expect(allCoffees.length).to.equal(2);
  })
});
