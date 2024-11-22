// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

contract Storage {

    string data;

    function store(string memory _data) public {
        data = _data;
    }

    function retrieve() public view returns (string memory){
        return data;
    }
}