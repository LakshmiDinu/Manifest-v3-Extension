import { ethers } from "./ethers.min.js";

// Connect to the Ethereum node at localhost
const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/b4eba21f90b14af99e9f301986fde1f0");

// Connect to the contract
const contractAddress = "0xFdA2e3C545C1f0200cf9b71F5957BA9972CCb581";
const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_data",
        "type": "string"
      }
    ],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, signer);

async function storeData(value) {
  try {
    // Call the store function
    const tx = await contract.store(value);
    await tx.wait();
    console.log("Transaction completed: ", tx);
  } catch (error) {
    console.error("Failed to store data: ", error);
  }
}

async function retrieveData() {
  try {
    // Call the retrieve function
    const data = await contract.retrieve();
    console.log("Retrieved data: ", data);
    document.getElementById("retrievedData").innerText = `Retrieved Data: ${data}`;
  } catch (error) {
    console.error("Failed to retrieve data: ", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const storeButton = document.getElementById("storeButton");
  if (storeButton) {
    storeButton.addEventListener("click", async () => {
      const value = document.getElementById("data").value;
      if (value) {
        storeData(value);
      }
    });
  }

  const retrieveButton = document.getElementById("retrieveButton");
  if (retrieveButton) {
    retrieveButton.addEventListener("click", async () => {
      retrieveData();
    });
  }
});