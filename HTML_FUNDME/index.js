// in node js we will use require()

//in front-end javascript will use import

import { ethers } from "./ether-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"
const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw
connectButton.onclick = connect
fundButton.onclick = fund

// console.log(ethers)

async function connect() {
    if (typeof window.ethereum != "undefinde") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        console.log("Connected")
        document.getElementById("connectButton").innerHTML = "Connected!!"
    } else {
        console.log("no MetaMask")
        document.getElementById("connectButton").innerHTML =
            "Please install metamask Wallet"
    }
}
async function getBalance(){
    if(typeof window.ethereum!="undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress);
        console.log(ethers.utils.formatEther(balance))
    }
}
async function withdraw(){
    if(typeof window.ethereum!="undefined"){
        console.log("Withdrawing.......")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress,abi,signer)
        try{
            const transactionResponse = await contract.withdraw()
            await listenForTransactionMine(transactionResponse,provider)
        }catch(error){console.log(error)}
    }
}
async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum != "undefined") {
        //provider / connection to the blockchain
        //signer / wallet /somone with gas
        //contract that we are intracting with
        // ABI & Address
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        console.log(signer)
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            //listen for teh tx to be mined//
            // listen for an event <- we haven't learned about yet!!
            //hey,wait for this tx to complete
            await listenForTransactionMine(transactionResponse, provider)
            console.log("Done!!!!!!BTTT")
        } catch (error) {
            console.log(error)
        }
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}....`)
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `completed with ${transactionReceipt.confirmations} confirmations`
            )
            resolve()
        })
    })
    // return new Promise()
    //listen for transaction to finish
    // create a listner for the blockchain
}
//fund function

//withdraw
