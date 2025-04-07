const { StripeEnvironment, Payment } = require("../dist");

StripeEnvironment.init("pk_test_51KRWcCJfqoPrHJKRzhrkGNWjX0O3vAa2CAdnCewx0oCxRKA8vsmCQwXBLKNbbCfegbRuVglq5e2TaVbN5M1ZQvwF00vwbgCF8z", "sk_test_51KRWcCJfqoPrHJKRqzK3GmyyqHxzTLmiaayk45IXE9NqIRBS4tSTgWK3xtFjmJHcrmTGJd5j3E0u70V2rRAwx3ck00wbdrqOlf");
new Payment().getDetails("pi_3NFXuVJfqoPrHJKR1cm9BX6J")
    .then(response => {
        console.log(JSON.stringify(response))
    });