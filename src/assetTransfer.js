const algosdk = require('algosdk')
const { getTransactionParams, sendRawTransaction } = require('./helpers/algoexplorer')
const { account } = require('./helpers/credentials')

async function assetTransfer () {
    // Fet transaction params from API
    const suggestedParams = await getTransactionParams()

    // Create transaction
    const tx = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        suggestedParams,
        from: account.addr,
        to: "G7QDMQ4D4JKH36PF2QIW7IEG2AP6JJ7G6HDJKA2JILLTWTTZC7NUZS2Y6Q",
        amount: 10000000, // 10 PC
        assetIndex: 25640426 // Papaya Coin
    })

    // Sign transaction
    const signedTx = tx.signTxn(account.sk)

    // Send transaction
    const txid = await sendRawTransaction(signedTx)

    return txid
}

module.exports = assetTransfer