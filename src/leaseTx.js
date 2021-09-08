const algosdk = require('algosdk')
const { getTransactionParams, sendRawTransaction } = require('./helpers/algoexplorer')
const { account } = require('./helpers/credentials')
const crypto = require('crypto')

async function leaseTx () {
    // Fet transaction params from API
    const suggestedParams = await getTransactionParams()

    // Create transaction #1
    const tx_1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        suggestedParams,
        from: account.addr,
        to: "G7QDMQ4D4JKH36PF2QIW7IEG2AP6JJ7G6HDJKA2JILLTWTTZC7NUZS2Y6Q",
        amount: 10000000, // 10 PC
        assetIndex: 25640426, // Papaya Coin
    })

    // Create transaction #2
    const tx_2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        suggestedParams,
        from: account.addr,
        to: "G7QDMQ4D4JKH36PF2QIW7IEG2AP6JJ7G6HDJKA2JILLTWTTZC7NUZS2Y6Q",
        amount: 1000000 // 1 Algo
    })

    // Add lease
    const randomBytes = new Uint8Array(crypto.randomBytes(32))
    tx_1.addLease(randomBytes, 0)
    tx_2.addLease(randomBytes, 0)

    // Sign transactions
    const signedTx_1 = tx_1.signTxn(account.sk)
    const signedTx_2 = tx_2.signTxn(account.sk)

    // Send transactions
    const txs = await Promise.allSettled([
        sendRawTransaction(signedTx_1),
        sendRawTransaction(signedTx_2)
    ])

    let txid
    txs.forEach((tx) => {
        if (tx.status === "fulfilled") {
            txid = tx.value
        }
        else {
            console.log(tx.reason.response.text)
        }
    })

    return txid
}

module.exports = leaseTx