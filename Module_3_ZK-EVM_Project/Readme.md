# zkSNARK Circuit Implementation for Logical Operations

## Overview

This project demonstrates the implementation of a zkSNARK circuit using the Circom programming language. The circuit integrates basic logical operations (`AND`, `NOT`, and `OR` gates) to verify inputs `A = 0` and `B = 1`, which yield an output `C = 0`. The verification process is carried out on-chain using a Solidity verifier deployed on the Amoy Testnet.

The primary objective is to prove knowledge of inputs that satisfy the circuit and subsequently verify this proof using a smart contract deployed on a test network.

## Circuit Design

<img src="https://authoring.metacrafters.io/assets/cms/Assessment_b05f6ed658.png?updated_at=2023-02-24T00:00:37.278Z">

The `Multiplier2` template combines fundamental logic gates:

- **AND Gate**: Multiplies inputs `A` and `B`.
- **NOT Gate**: Computes the negation of input `B`.
- **OR Gate**: Computes the logical OR between the output of the `AND` gate and the negated value of `B`.

### Circuit Code (`circuit.circom`):

```circom
pragma circom 2.0.0;

/*This circuit template checks that c is the multiplication of a and b.*/  

template Multiplier2 () {  

   // Declaration of signals.  
   signal input a;  
   signal input b;
   signal x;  
   signal y;  
   signal output c;

   //component
   component andGate = AND();
   component notGate = NOT();
   component orGate = OR();

   // Logic From AND to singals
   andGate.a <== a;
   andGate.b <== b;
   x <== andGate.out;

   // Logic From Signals to Not Gate 
   notGate.in <== b;
   y <== notGate.out;

   //Logic From Not gate to Output C
   orGate.a <== x;
   orGate.b <== y;
   c <== orGate.out;

}

template AND() {
    signal input a;
    signal input b;
    signal output out;

    out <== a*b;
}

template NOT() {
    signal input in;
    signal output out;

    out <== 1 + in - 2*in;
}

template OR() {
    signal input a;
    signal input b;
    signal output out;

    out <== a + b - a*b;
}

component main = Multiplier2();
```
This Circom code defines a simple logic circuit using three basic gates: AND, NOT, and OR. 
The main template, `Multiplier2`, takes two input signals `a` and `b`, and computes an output signal `c` based on a series of logic operations. 

First, the inputs `a` and `b` are fed into an `AND` gate, whose output is stored in signal `x`. The input `b` is also passed through a `NOT` gate, and the result is stored in signal `y`. 
Finally, the circuit combines the results of the `AND` and `NOT` gates by passing `x` and `y` through an `OR` gate, and the result is assigned to the output signal `c`. The AND gate multiplies its inputs (`a * b`), the NOT gate uses an arithmetic formula (`1 - in`) to invert its input, and the OR gate uses a formula (`a + b - a * b`) to compute the logical OR. 

The `Multiplier2` template is instantiated as the main component of the circuit, creating a small digital logic system that integrates these basic gates.


## Project Structure

- **circuits/circuit.circom**: The Circom file containing the circuit design.
- **scripts/deploy.js**: The deployment script to deploy the verifier contract.
- **artifacts/**: Contains compiled Circom and Solidity outputs.
- **hardhat.config.js**: Configuration file for Hardhat.

# Testnet Deployment

The circuit verifier is deployed on the Polygon Amoy Testnet. You can interact with the deployed contract using Hardhat scripts or directly on Etherscan.

# Tools and Technologies Used

- **Circom**: For designing zkSNARK circuits.
- **Hardhat**: Ethereum development environment for compiling, testing, and deploying Solidity contracts.
- **zkSNARK**: Zero-knowledge succinct non-interactive arguments of knowledge, used for proving the correctness of the circuit.
- **Polygon Amoy Testnet**: Used for on-chain verification of the zkSNARK proofs.

# Commands Reference

- **Install Dependencies**: `npm install`
- **Compile Circuits**: `npx hardhat circom`
- **Deploy Contract**: `npx hardhat run scripts/deploy.js --network amoy`
- **Verify Proof**: Use `verifyProof()` method on the deployed contract.

# License

This project is licensed under the MIT License. See the `LICENSE` file for details.
