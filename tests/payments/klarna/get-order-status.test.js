const { BCEnvironment, PaymentOperation, } = require("../../../dist");

const config = {
  systemName: 'Klarna',
  notificationUrl: '/payment-notification/klarna',
  settings: [
    { key: 'AccountCode', value: 'PK73987_e7a735db38e5' },
    { key: 'Signature', value: 'h9CzUwm0pBhEhLOl' },
    {
      "key": "UseSandbox",
      "value": "True"
    },
    {
      key: 'CancelUrl',
      value: '/payment-notification/klarna/canceled'
    },
  ],
};
BCEnvironment.init("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=", config);
new PaymentOperation().getOrderDetails("f20da212-79ca-460f-b490-9958c7acfd52")
  .then(response => {
    console.log(JSON.stringify(response))
  });