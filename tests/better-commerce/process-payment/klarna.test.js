const { BCEnvironment, BetterCommerceOperation } = require("../../../dist");

const config = {"id":14,"systemName":"Klarna","displayName":"Klarna","slug":null,"isOnsite":false,"enabled":true,"isBillingAddressRequired":true,"displayOrder":0,"iconCssClass":"Apps-klarna.png","description":"Klarna","enableImmediateCapture":false,"forSubscription":false,"inputType":15,"notificationUrl":"/payment-notification/klarna","settings":[{"key":"AccountCode","value":"PK73987_e7a735db38e5"},{"key":"Signature","value":"h9CzUwm0pBhEhLOl"},{"key":"MotoUserName","value":null},{"key":"MotoPassword","value":null},{"key":"MotoSignature","value":null},{"key":"MotoAccountCode","value":null},{"key":"TestUrl","value":"https://api.playground.klarna.com/"},{"key":"ProductionUrl","value":null},{"key":"CancelUrl","value":"/payment-notification/klarna/canceled"},{"key":"Version","value":null},{"key":"UseSandbox","value":"True"},{"key":"EnablePayInInstallment","value":"False"},{"key":"InstallmentDisplayText","value":null},{"key":"AdditionalServiceCharge","value":"0.0"}],"basicSettings":[{"key":"Version","value":null},{"key":"OrderTypes","value":"[\"Standard\",\"Replacement\",\"\"]"}],"message":null};
BCEnvironment.init("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=", config);
const params = {
    isCOD: false,
    orderId: '4518c296-2805-ee11-b1c2-000d3a211cf7',
    txnOrderId: '318060-1109437',
    extras: {
        token: '',
        orderId: 'ae5648c8-0cb1-460d-8886-3b88a34d24b7',
        payerId: '',
        gateway: 'klarna',
        isCancelled: false,
        cookies: {
            basketId: 'bba015cf-0ade-4330-b77d-0350c3d3825b',
            deviceId: '9666f4f1-16f6-4c5a-867b-a1f9d7f8d85e',
            Currency: 'GBP',
            Language: 'en',
            Country: 'GB',
            accept_cookies: 'accepted',
            __stripe_mid: '20710d57-5cf3-4369-8037-c5026aed600529f884',
            __stripe_sid: '93b59e9c-d7e6-45f9-ac6e-483e0d20baa5051e07',
            _vwo_uuid: 'D43DF71784F7EF0DB4DDC91A9A0334D5E',
            _vwo_ds: '3$1686139658:65.15493613::',
            _vis_opt_s: '1|',
            _vis_opt_test_cookie: '1',
            _gcl_au: '1.1.1441793561.1686139659',
            PR_SourceMed: '',
            _ga: 'GA1.1.215654087.1686139660',
            _gid: 'GA1.1.914407210.1686139660',
            ln_or: 'eyIzNzI3NjkyIjoiZCJ9',
            tkClid: 'undefined',
            _uetsid: 'e705da70052b11ee8781cb42270f5643',
            _uetvid: 'e35f8140eef611edb52465e9ae189930',
            'rtb-global': '42b2e6b8-5aad-4289-adf6-f595bbf9b234',
            'utopia-rtg': 'mBthdRd5Rrs86umhCd8pmV66SfM2wXB6',
            audienso: 'b3677e9c-b67b-44f6-8da9-7e10e812b64c',
            _clck: 'd25pe1|2|fc9|0|1253',
            _scid: '9366f116-0316-4f07-8866-7182f0820019',
            _sctr: '1|1686076200000',
            _vwo_uuid_v2: 'D4F399244C57E86A9F29E178A91D674BB|234c5633b2dad447cdfab54cdd04834b',
            _scid_r: '9366f116-0316-4f07-8866-7182f0820019',
            _clsk: '1qe23ev|1686139710928|2|1|u.clarity.ms/collect',
            moe_uuid: '6c76ded6-29e6-49a8-ab63-ace1aa8d02f8',
            _ga_BBLYJRQTTH: 'GS1.1.1686139659.1.1.1686139780.60.0.0',
            sessionId: '870a029d-1415-4a34-bc22-baaebd236766',
            defaultSession: '0be2f4cd-7508-40f9-a2c2-51ac124e1c8c'
        }
    }
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });