const algosdk = require('algosdk')

/**
 * @type {import('algosdk').Algodv2}
 */
let algodV2

if (!algodV2) {
    algodV2 = new algosdk.Algodv2(
        "", // No token required
        "https://testnet.algoexplorerapi.io", // Algoexplorer API testnet endpoint
        "" // Default HTTPS port
    )
}

/**
 * @description Returns suggested params with minimum fee as a default fee and flatFee option to true
 * @returns {import('algosdk').SuggestedParams}
 */
async function getTransactionParams () {
    const suggestedParams = await algodV2.getTransactionParams().do()

    suggestedParams.fee = 1000 // Minimum is 0.001 Algos ~~ $0.0017
    suggestedParams.flatFee = true

    return suggestedParams
}

/**
 * @description Send signed trasnaction
 * @param {Uint8Array|Uint8Array[]} txs Signed transactions
 * @returns {Promise<string>}
 */
async function sendRawTransaction (txs) {
    const {txId} = await algodV2.sendRawTransaction(txs).do()
    return txId
}

module.exports = {
    algodV2,
    getTransactionParams,
    sendRawTransaction
}