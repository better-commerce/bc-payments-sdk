const { BCEnvironment, PaymentOperation, } = require("../../../dist");

const config = {
    systemName: "Stripe",
    settings: [{
        "key": "AccountCode",
        "value": "pk_test_51KRWcCJfqoPrHJKRzhrkGNWjX0O3vAa2CAdnCewx0oCxRKA8vsmCQwXBLKNbbCfegbRuVglq5e2TaVbN5M1ZQvwF00vwbgCF8z"
    }, {
        "key": "Signature",
        "value": "sk_test_51KRWcCJfqoPrHJKRqzK3GmyyqHxzTLmiaayk45IXE9NqIRBS4tSTgWK3xtFjmJHcrmTGJd5j3E0u70V2rRAwx3ck00wbdrqOlf"
    },]
};
BCEnvironment.init("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=", config);
const data = {
    amount: 10101,
    currency: "GBP",
    receipt_email: "test@gmail.com",
    description: "317984"
};
new PaymentOperation().initPaymentIntent(data).then(response => {
    console.log(JSON.stringify(response));
});