const fs = require('fs')
const path = require('path')
const { ApplePayEnvironment, Payment } = require("../dist");

const pemCert = fs.readFileSync(
    path.join(__dirname, '/certificates/ApplePayMerchant.pem')
)
const keyCert = fs.readFileSync(
    path.join(__dirname, '/certificates/ApplePayMerchant.key')
)

ApplePayEnvironment.init("merchant.com.ffx", "ffx.co.uk", "merchant.com.ffx", pemCert, keyCert, false)

const data = {
    validationUrl: "https://apple-pay-gateway-cert.apple.com/paymentservices/startSession",
}
new Payment().validateSession(data).then(result => {
    console.log(JSON.stringify(result))
}).then((error) => {
    if (error) {
        console.log(error)
    }
})