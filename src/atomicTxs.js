const algosdk = require('algosdk')
const { getTransactionParams, sendRawTransaction } = require('./helpers/algoexplorer')
const { account } = require('./helpers/credentials')

async function atomicTxs () {
    // Fet transaction params from API
    const suggestedParams = await getTransactionParams()

    // Create transaction #1
    const tx_1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        suggestedParams,
        from: account.addr,
        to: "G7QDMQ4D4JKH36PF2QIW7IEG2AP6JJ7G6HDJKA2JILLTWTTZC7NUZS2Y6Q",
        amount: 10000000, // 10 PC
        assetIndex: 25640426 // Papaya Coin
    })

    // Create transaction #2
    const tx_2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        suggestedParams,
        from: account.addr,
        to: "G7QDMQ4D4JKH36PF2QIW7IEG2AP6JJ7G6HDJKA2JILLTWTTZC7NUZS2Y6Q",
        amount: 100000 // 0.1 Algo
    })

    // Group transactions
    const txGroup = algosdk.assignGroupID([
        tx_1,
        tx_2
    ])

    // Sign transactions
    const signedTxs = txGroup.map((tx) => {
        return tx.signTxn(account.sk)
    })

    const txid = await sendRawTransaction(signedTxs)

    return txid
}

module.exports = atomicTxs