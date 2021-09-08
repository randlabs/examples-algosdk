const algosdk = require('algosdk')
const { getTransactionParams, sendRawTransaction } = require('./helpers/algoexplorer')
const { account, account2 } = require('./helpers/credentials')

async function pollingFees () {
    // Fet transaction params from API
    const suggestedParams = await getTransactionParams()

    // Create transaction #1
    const tx_1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        suggestedParams: {
            ...suggestedParams,
            fee: 0, // Force fee to be zero
        },
        from: account2.addr,
        to: "G7QDMQ4D4JKH36PF2QIW7IEG2AP6JJ7G6HDJKA2JILLTWTTZC7NUZS2Y6Q",
        amount: 0
    })

    // Create transaction #2
    const tx_2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        suggestedParams: {
            ...suggestedParams,
            fee: 2000 // 0.002 Algos
        },
        from: account.addr,
        to: "G7QDMQ4D4JKH36PF2QIW7IEG2AP6JJ7G6HDJKA2JILLTWTTZC7NUZS2Y6Q",
        amount: 1000000
    })

    // Group transactions
    const txGroup = algosdk.assignGroupID([
        tx_1,
        tx_2
    ])

    // Sign and Send
    const txid = await sendRawTransaction([
        txGroup[0].signTxn(account2.sk),
        txGroup[1].signTxn(account.sk)
    ])

    return txid
}

module.exports = pollingFees