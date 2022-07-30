// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract CoffeePortal {
    uint256 totalCoffee;
    address payable public owner;

    /**
    * A little magi, Events in solidity! 
    */
    event NewCoffee(
        address indexed sender,
        uint256 timestamp,
        string name,
        string message
    );

    constructor() payable {
       console.log("Smart contract Deployed!");
        //    user who is calling the function address(this).balance;
        owner = payable(msg.sender);
    }

    /*
    * Create a struct named Coffee
    */
    struct Coffee {
        address giver;
        uint256 timestamp;
        string name;
        string message;
    }

    Coffee[] coffee;

    function getAllCoffee() public view returns (Coffee[] memory) {
        return coffee;
    }

    function getTotalCoffee() public view returns (uint256) {
        return totalCoffee;
    }
    
    function buyCoffee (string memory _name, string memory _message) public payable {
        // must accept more than 0 ether to buy coffee
        require(msg.value > 0, "Can't buy coffee for free");

        totalCoffee++;
        coffee.push(Coffee(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));
        emit NewCoffee(msg.sender, block.timestamp, _name, _message);
    }
}
