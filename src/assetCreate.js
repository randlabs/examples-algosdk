const algosdk = require('algosdk')
const { getTransactionParams, sendRawTransaction } = require('./helpers/algoexplorer')
const { account } = require('./helpers/credentials')

async function assetCreate () {
    // Fet transaction params from API
    const suggestedParams = await getTransactionParams()

    // Create transaction
    const tx = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        suggestedParams,
        from: account.addr,
        assetName: "Mango Coin",
        unitName: "mango",
        decimals: 6,
        total: BigInt("1000000000000000"), // 1_000_000_000 Total Supply
        manager: account.addr,
        reserve: account.addr,
        freeze: account.addr,
        clawback: account.addr
    })

    // Sign transaction
    const signedTx = tx.signTxn(account.sk)

    // Send transaction
    const txid = await sendRawTransaction(signedTx)

    return txid
}

module.exports = assetCreate