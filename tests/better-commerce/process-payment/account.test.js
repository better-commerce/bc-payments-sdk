
const { BCEnvironment, BetterCommerceOperation } = require("../../../dist");

const config = {
    id: 8,
    systemName: "AccountCredit",
    displayName: "Account",
    slug: null,
    isOnsite: true,
    enabled: false,
    isBillingAddressRequired: false,
    displayOrder: 1,
    iconCssClass: "",
    description: "Account Credit",
    enableImmediateCapture: false,
    forSubscription: false,
    inputType: 0,
    notificationUrl: 7664131185e5728d6f2da82ed9156158dfbc9ed45ae22ed620a50421752176ccfe54babc0fddbbaae42a0a46c62c42cc",
    settings: [
        {
            key: "AvailableCredit",
            value: "2999963.67"
        },
        {
            key: "CreditLimit",
            value: "3000000.00"
        }
    ],
    basicSettings: null,
    message: null
};

BCEnvironment.init("12C2E62B-33B1-4D9B-9782-7F3BB1EDB951", "o6obMjODUNK7QEEK8x4Ir3NfxJaUa5qGDs34SBKhsKo=", config);
const params = {
    id: '1145169',
    cardNo: null,
    orderNo: 50126,
    orderAmount: 12.11,
    paidAmount: 0,
    balanceAmount: '0.00',
    isValid: true,
    status: 0,
    authCode: '',
    issuerUrl: null,
    paRequest: null,
    pspSessionCookie: '{"token":"","orderId":"","payerId":"","gateway":"AccountCredit","isCancelled":false}',
    pspResponseCode: null,
    pspResponseMessage: null,
    paymentGatewayId: 8,
    paymentGateway: 'AccountCredit',
    token: null,
    payerId: null,
    cvcResult: null,
    avsResult: null,
    secure3DResult: null,
    cardHolderName: null,
    issuerCountry: null,
    info1: '',
    fraudScore: null,
    paymentMethod: 'AccountCredit',
    paymentInfo1: '',
    paymentInfo2: '',
    paymentInfo3: '',
    paymentInfo4: null,
    paymentInfo5: null,
    paymentInfo6: null,
    cardType: null,
    operatorId: null,
    refStoreId: null,
    tillNumber: null,
    externalRefNo: null,
    expiryYear: null,
    expiryMonth: null,
    isMoto: false,
    upFrontPayment: false,
    upFrontAmount: '0.00',
    isPrePaid: true,
    discountedTotal: 0,
    externalPromoCode: null,
    externalVoucher: null
},
    orderId: 'f698882a-ee1f-ee11-b1c4-000d3a211cf7',
    headers: undefined,
    cookies: {
        Currency: 'GBP',
        Language: 'en',
        deviceId: '237e66d4-3ea8-4faf-ba7c-8148afd37a28',
        'next-auth.csrf-token': 'e60cc940fff8a9a8a483bae7451eed99c6a7efca256342af9f56404d86aaa9b4|c43f583da93e586c2525b19528c9c24ab2d7b5e2fd2efe487b3afe5f802b5945',
        'next-auth.callback-url': 'http://localhost:3000',
        selection: '{"analytics":true,"advertisement":true}',
        basketId: '634d1176-3071-4173-9bda-4131aa48713c',
        CompanyId: 'b197869c-9e62-4703-b008-317e68c27401',
        __stripe_mid: 'a7529019-6632-432b-9466-0c1c4b363b98cdb70f',
        __stripe_sid: '238a9cc9-0c5d-4ee4-8614-f47cebd42e385bf95e',
        defaultSession: '584b0bf6-23a4-49ef-b0bc-c19a4bedb8a0',
        sessionId: '3d665e7e-57fa-42ac-900b-2724f4825f74',
        ClientIP: '::1'
    }
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });