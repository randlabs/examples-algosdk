const algosdk = require("algosdk")

// Account Address:
// LASP5ZTSYZDYLJLASOHKTKM5SGMTAIPHRNMGUHGFXJ4DL4CCVEWNMMP3LM
const mnemonic = "motor endless wolf parrot gauge chat okay define double phone twist update bargain gap retreat coast sponsor uncover coffee vicious denial sound expand ability smoke"

/**
 * @type {import("algosdk").Account}
 */
let account

if (!account) {
    account = algosdk.mnemonicToSecretKey(mnemonic)
}

// Account Address:
// ZJKA5Z7KAMN472UKP7S7SZBTMEJB35JIQDROAGDCDLDPX6YQAB2PCDXNR4
const mnemonic2 = "struggle fashion lesson option invest install century run muffin caught tilt lady hover arctic always ocean carpet cradle hint hotel actor exhaust shuffle about arrange"

/**
 * @type {import("algosdk").Account}
 */
let account2

if (!account2) {
    account2 = algosdk.mnemonicToSecretKey(mnemonic2)
}

/**
 * @type {import("algosdk").MultisigMetadata}
 */
let multiSigAccount

if (!multiSigAccount) {
    // OYENBCXANSMX3XSNBCJTHMIK7AWAMNU55UL5RNEMXKDT23NSLDC26W4WWA
    multiSigAccount = {
        addrs: [
            account.addr,
            account2.addr
        ],
        threshold: 2,
        version: 1
    }
}

module.exports = {
    account,
    account2,
    multiSigAccount
}