const algosdk = require('algosdk')
const { getTransactionParams, sendRawTransaction } = require('./helpers/algoexplorer')
const { account, account2, multiSigAccount } = require('./helpers/credentials')

async function multisigTransaction () {
    // Fet transaction params from API
    const suggestedParams = await getTransactionParams()

    // Create multisig account
    const multisigAddress = algosdk.multisigAddress(multiSigAccount)

    // Create transaction
    const tx = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        suggestedParams,
        from: multisigAddress,
        to: "G7QDMQ4D4JKH36PF2QIW7IEG2AP6JJ7G6HDJKA2JILLTWTTZC7NUZS2Y6Q",
        amount: 100000 // 0.1 Algo
    })

    // Sign transaction
    const oneSigTx = algosdk.signMultisigTransaction(tx, multiSigAccount, account.sk)
    const signedMultisigTx = algosdk.appendSignMultisigTransaction(oneSigTx.blob, multiSigAccount, account2.sk)

    // Send transaction
    const txid = await sendRawTransaction(signedMultisigTx.blob)

    return txid
}

module.exports = multisigTransaction