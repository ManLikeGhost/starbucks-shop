// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract starbuckTeaShop{

    struct Context{
        string name;
        string message;
        string teaTypePurchased;
        uint timestamp;
        address from;
    }

    Context[] contexts;
    address payable owner; //owner is going to receive funds
    constructor(){
        owner = payable(msg.sender);
    }

    function buyChai(string calldata name,string calldata message, string calldata teaTypePurchased) external payable{
        require(msg.value>0,"Please pay more than 0 ether");
        owner.transfer(msg.value);
        contexts.push(Context(name,message,teaTypePurchased,block.timestamp,msg.sender));
    }

    function fetchContext() public view returns(Context[] memory){
        return contexts;
    }
}