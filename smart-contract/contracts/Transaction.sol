// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transaction {
    event Transfer(address indexed from, address indexed to, uint256 amount, uint256 timestamp);

    function transferFunds(address payable _to) public payable {
        require(msg.value > 0, "Transfer amount must be greater than zero.");

        _to.transfer(msg.value);

        emit Transfer(msg.sender, _to, msg.value, block.timestamp);
    }

    receive() external payable {}

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
