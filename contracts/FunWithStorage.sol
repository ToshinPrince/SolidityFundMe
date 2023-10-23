// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract FunWithStorage {
    uint256 favoriteNumber;
    bool someBool;
    uint256[] myArray;
    mapping(uint256 => bool) myMap;

    uint256 constant NOT_IN_STORAGE = 123;
    uint256 immutable i_not_in_storage;

    constructor() {
        favoriteNumber = 25; // See stored spot above // SSTORE
        someBool = true; // See stored spot above // SSTORE
        myArray.push(222); // SSTORE
        myMap[0] = true; // SSTORE
        i_not_in_storage = 123;
    }

    function doStuff() public {
        uint256 newVar = favoriteNumber + 1; // SLOAD
        bool otherVar = someBool; // SLOAD
        // ^^ memory variables
    }
}
