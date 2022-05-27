//SPDX-License-Identifier: MIT
pragma solidity >0.4.14;

contract ytbet{
    address public player1;
    address public player2;
    uint256 public betAmount;
    bool public isBetOpen;

    constructor() public payable{
        require(msg.value>=1,"bet amount too low");
        player1=msg.sender;
        betAmount=msg.value;
        isBetOpen=true;
    }

    function bet() public payable{
        require(isBetOpen==true, "betting over!");
        require(msg.sender!=player1, "already betted");
        require(msg.value==betAmount, "not equal to bet amount");
        
        player2=msg.sender;
        isBetOpen=false;

    }

    
}