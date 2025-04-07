const { StripeEnvironment, Payment } = require("../dist");

StripeEnvironment.init("pk_test_51KRWcCJfqoPrHJKRzhrkGNWjX0O3vAa2CAdnCewx0oCxRKA8vsmCQwXBLKNbbCfegbRuVglq5e2TaVbN5M1ZQvwF00vwbgCF8z", "sk_test_51KRWcCJfqoPrHJKRqzK3GmyyqHxzTLmiaayk45IXE9NqIRBS4tSTgWK3xtFjmJHcrmTGJd5j3E0u70V2rRAwx3ck00wbdrqOlf");
const data = {
    amount: 10101,
    currency: "GBP",
    receipt_email: "test@gmail.com",
    description: "317984"
};
new Payment().initIntent(data)
    .then(response => {
        console.log(JSON.stringify(response))
    });