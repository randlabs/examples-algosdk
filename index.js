const paymentTx = require("./src/payment")
const assetTransfer = require("./src/assetTransfer")
const assetOptIn = require("./src/assetOptIn")
const assetCreate = require("./src/assetCreate")
const assetFreeze = require("./src/assetFreeze")
const assetClawback = require("./src/assetClawback")
const multisigTx = require("./src/multisigTx")
const atomicTxs = require("./src/atomicTxs")
const leaseTx = require("./src/leaseTx")
const pollingFees = require("./src/pollingFees")

async function sendTxs () {
    const requests = await Promise.allSettled([
        paymentTx(),
        assetTransfer(),
        assetOptIn(),
        assetCreate(),
        assetFreeze(),
        assetClawback(),
        multisigTx(),
        atomicTxs(),
        leaseTx(),
        pollingFees()
    ])
    requests.forEach((result) => {
        if (result.status === "fulfilled") {
            console.log(result.value)
        }
        else {
            console.log(result.reason.response.text)
        }
    })
}

sendTxs().catch(console.log)