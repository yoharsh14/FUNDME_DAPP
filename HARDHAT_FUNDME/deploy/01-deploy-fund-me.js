// import
//main-function
// calling of main function

const { network } = require("hardhat")
const { networkConfig, devlopmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
//hre = hardhat runtime enviroment
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //if chainId is X use priceFeed address Y
    //else use A address or anything else
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    let ethUsdPriceFeedAddress
    if (devlopmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    const args = [ethUsdPriceFeedAddress]
    // if the contract doesn't exist, we deploy a minimal version for out local testing(mocking)
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    // if (!devlopmentChains.includes(network.name) &&
    //     process.env.ETHERSCAN_API_KEY
    // ) {
    //     await verify(fundMe.address, args)
    // }
    log("-------------------------------------")
}
module.exports.tags = ["all", "fundMe"]
