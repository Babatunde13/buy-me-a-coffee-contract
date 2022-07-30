// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log(`Account ${deployer.address} has ${accountBalance} ETH`);
  
  // Deploy the contract
  const [owner, giver1, giver2] = await hre.ethers.getSigners();
  const CoffeePortal = await hre.ethers.getContractFactory("CoffeePortal");
  const coffeePortal = await CoffeePortal.deploy();

  console.log(`CoffeePortal contract deployed at ${coffeePortal.address}`);

  await coffeePortal.deployed();

  const ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  const giver1Balance = await hre.ethers.provider.getBalance(giver1.address);
  const giver2Balance = await hre.ethers.provider.getBalance(giver2.address);

  console.log("Owner balance:", hre.ethers.utils.formatEther(ownerBalance));
  console.log("Giver 1 balance:", hre.ethers.utils.formatEther(giver1Balance));
  console.log("Giver 2 balance:", hre.ethers.utils.formatEther(giver2Balance));

  /**
   * Let's buy a coffee
   */
  const coffeeTxn = await coffeePortal.connect(giver1).buyCoffee(
    "Jordan",
    "This is a test coffee #2",
    {
      value: ethers.utils.parseEther("5"),
    }
  );
  await coffeeTxn.wait();
  console.log(coffeeTxn.hash);
  console.log("")
  console.log("Coffee 1 bought by", giver1.address)
  console.log("")

  const ownerBalanceResult = await hre.ethers.provider.getBalance(owner.address);
  const giver1BalanceResult = await hre.ethers.provider.getBalance(giver1.address);
  const giver2BalanceResult = await hre.ethers.provider.getBalance(giver2.address);

  console.log("Owner balance after 1st txn:", hre.ethers.utils.formatEther(ownerBalanceResult));
  console.log("Giver 1 balance after 1st txn:", hre.ethers.utils.formatEther(giver1BalanceResult));
  console.log("Giver 2 balance after 1st txn:", hre.ethers.utils.formatEther(giver2BalanceResult));

  console.log("===============================");
  console.log("")
  console.log("")
  console.log("")
  console.log("")


  /**
   * Let's buy a coffee
   */
   const coffeeTxn2 = await coffeePortal.connect(giver2).buyCoffee(
    "Jordan",
    "This is a test coffee #2",
    {
      value: ethers.utils.parseEther("5"),
    }
  );
  await coffeeTxn2.wait();
  console.log(coffeeTxn2.hash);
  console.log("")
  console.log("Coffee 2 bought by", giver2.address)
  console.log("")

  const ownerBalanceResultLater2 = await hre.ethers.provider.getBalance(owner.address);
  const giver1BalanceResultLater2 = await hre.ethers.provider.getBalance(giver1.address);
  const giver2BalanceResultLater2 = await hre.ethers.provider.getBalance(giver2.address);

  console.log("Owner balance after 2nd txn:", hre.ethers.utils.formatEther(ownerBalanceResultLater2));
  console.log("Giver 1 balance after 2nd txn:", hre.ethers.utils.formatEther(giver1BalanceResultLater2));
  console.log("Giver 2 balance after 2nd txn:", hre.ethers.utils.formatEther(giver2BalanceResultLater2));

  console.log("===============================");
  console.log("")
  console.log("")
  console.log("")
  console.log("")

  const allCoffee = await coffeePortal.getAllCoffee();

  console.log("All coffee:", allCoffee);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
