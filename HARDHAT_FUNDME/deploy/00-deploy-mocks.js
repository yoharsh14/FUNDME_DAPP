const {network} = require("hardhat")
const {devlopmentChains,DECIMAL,INITIAL_ANSWER} = require("../helper-hardhat-config.js")

module.exports = async ({getNamedAccounts,deployments}) =>{
    const {deploy,log} = deployments
    const {deployer} = await getNamedAccounts()

    if(devlopmentChains.includes(network.name)){
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator",{
            contract:"MockV3Aggregator",
            from:deployer,
            log:true,
            args:[DECIMAL,INITIAL_ANSWER],
        })
        log("MOCKS DEPLOYED!!!!!!!!!!!!!!")
        log("________________------------------_________________")
    }
}

module.exports.tags = ["all","mocks"]