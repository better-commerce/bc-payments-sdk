const { BCEnvironment, BetterCommerceOperation } = require("../../../dist");

BCEnvironment.initSession("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuYmV0dGVyY29tbWVyY2UuaW8iLCJpc3MiOiJhdXRoLmJldHRlcmNvbW1lcmNlLmlvIiwiZXhwIjoxNzUxODkzNjY1LCJzdWIiOiI2MTZDRkI1RS0wQjFFLTQ2OTUtQTZEQS1CNUFBNTVGRTZFNDkiLCJlbWFpbCI6InNhbmpheUB0ZXN0cGMuY29tIiwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwiVXNlcklkIjoiNjE2Q0ZCNUUtMEIxRS00Njk1LUE2REEtQjVBQTU1RkU2RTQ5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlN1cGVyQWRtaW4iLCJTdXBlciBBZG1pbiJdLCJwZXJtaXNzaW9uIjpbImFjY291bnQ6dXNlcjp2aWV3IiwiYWNjb3VudDp1c2VyOmNyZWF0ZSIsImFjY291bnQ6dXNlcjp1cGRhdGUiLCJhY2NvdW50OnVzZXI6ZGVsZXRlIiwiYWNjb3VudDp1c2VyOmFzc2lnblJvbGUiLCJhY2NvdW50OnVzZXI6ZGVsZXRlUm9sZSIsImFjY291bnQ6dXNlcjpyZXNldFBhc3N3b3JkIiwiYWNjb3VudDp1c2VyOmxvY2siLCJhY2NvdW50OnVzZXI6dW5sb2NrIiwiY29tbWVyY2U6cXVvdGU6Y3JlYXRlIiwiY29tbWVyY2U6cXVvdGU6YWNjZXB0UHJpY2UiLCJjb21tZXJjZTpxdW90ZTpyZWplY3RQcmljZSIsImNvbW1lcmNlOnF1b3RlOmxpc3QiLCJjb21tZXJjZTpxdW90ZTp2aWV3IiwiY29tbWVyY2U6cXVvdGU6Y2xvbmUiLCJjb21tZXJjZTpxdW90ZTpjYW5jZWwiLCJjb21tZXJjZTpxdW90ZWxpbmU6YWRkIiwiY29tbWVyY2U6cXVvdGVsaW5lOnJlbW92ZSIsImNvbW1lcmNlOmFzc2Vzc21lbnQ6aW5pdGlhdGUiLCJjb21tZXJjZTphc3Nlc3NtZW50OmV4aXQiLCJjb21tZXJjZTphc3Nlc3NtZW50OmZpbmlzaCIsImNvbW1lcmNlOmFzc2Vzc21lbnQ6YW1lbmQiLCJjb21tZXJjZTphc3Nlc3NtZW50OmlucHV0U2VyaWFsIiwiY29tbWVyY2U6YXNzZXNzbWVudDp1cGRhdGVTZXJpYWwiLCJjb21tZXJjZTphc3Nlc3NtZW50OnZpZXdTZXJpYWwiLCJjb21tZXJjZTphc3Nlc3NtZW50OnVwZGF0ZUNvbmRpdGlvbiIsImNvbW1lcmNlOmFzc2Vzc21lbnQ6dmlld0NvbmRpdGlvbiIsImNvbW1lcmNlOmFzc2Vzc21lbnQ6dmFsaWRhdGVQYXJlbnRQcm9kdWN0IiwiY29tbWVyY2U6YXNzZXNzbWVudDp1cGRhdGVBY2Nlc3NvcmllcyIsImNvbW1lcmNlOmFzc2Vzc21lbnQ6dmlld0FjY2Vzc29yaWVzIiwiY29tbWVyY2U6YXNzZXNzbWVudDp1cGRhdGVDaGVja2xpc3QiLCJjb21tZXJjZTphc3Nlc3NtZW50OnZpZXdDaGVja2xpc3QiLCJjb21tZXJjZTphc3Nlc3NtZW50OnZpZXdQcmljZUJyZWFrZG93biIsImNvbW1lcmNlOmFzc2Vzc21lbnQ6dXBkYXRlUHJpY2UiLCJjb21tZXJjZTphc3Nlc3NtZW50OmFkZEJvbnVzIiwiY29tbWVyY2U6YXNzZXNzbWVudDp2aWV3Qm9udXMiLCJjb21tZXJjZTphc3Nlc3NtZW50Om1vZGlmeUJvbnVzIiwiY29tbWVyY2U6YXNzZXNzbWVudDphY2NlcHRBc3Nlc3NlZFF1b3RlIiwiY29tbWVyY2U6YXNzZXNzbWVudDpyZWplY3RBc3Nlc3NlZFF1b3RlIiwiY29tbWVyY2U6YWdyZWVtZW50OnZpZXciLCJjb21tZXJjZTphZ3JlZW1lbnQ6cHJpbnQiLCJjb21tZXJjZTpub3RlOmFkZCIsImNvbW1lcmNlOm5vdGU6dmlldyIsImNvbW1lcmNlOndhbGxldDppbml0aWF0ZVRyYW5zZmVyIiwiY29tbWVyY2U6d2FsbGV0OmFkZEJhbmtEZXRhaWwiLCJjb21tZXJjZTp3YWxsZXQ6aW5pdGlhdGVCYW5rVHJhbnNmZXIiLCJjb21tZXJjZTp3YWxsZXQ6dmlld1RyYW5zZmVyRGV0YWlsIiwiY29tbWVyY2U6cmV0dXJuOmluaXRpYXRlIiwiY29tbWVyY2U6cmV0dXJuOnVwZGF0ZVN0YXR1cyIsImNvbW1lcmNlOnByb2R1Y3Q6Z2VuZXJhdGUiXSwiT3JnSWQiOiJiZDRmY2QyZS02MzgzLTRmMWEtOTlhYS03ZTU5ZTVjM2M0NzUiLCJEb21haW5JZCI6IjI1OGQxZDFhLTRlMDgtNDE2Yy1hMzAzLWE5ZDZlYjY0MWI4MyIsIkRvbWFpbk5hbWUiOiJQYXJrQ2FtZXJhcyIsIk9yZ0NvZGUiOiJwYXJrY2FtZXJhcyIsIk9yZ05hbWUiOiJQYXJrQ2FtZXJhcyIsIlVzZXJOYW1lIjoic2FuamF5QHRlc3RwYy5jb20iLCJFbWFpbCI6InNhbmpheUB0ZXN0cGMuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InNhbmpheUB0ZXN0cGMuY29tIiwiQ2hhbm5lbCI6IldlYiIsIkRvbWFpbnMiOiJbe1wiUmVjb3JkSWRcIjpcIjI1OGQxZDFhLTRlMDgtNDE2Yy1hMzAzLWE5ZDZlYjY0MWI4M1wiLFwiQnJhbmNoSWRcIjpcIjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMFwiLFwiTmFtZVwiOlwiUGFya0NhbWVyYXNcIixcIkRlZmF1bHRDdWx0dXJlXCI6XCJlbi1HQlwiLFwiRGVmYXVsdEN1cnJlbmN5XCI6XCJHQlBcIixcIklzRGVmYXVsdFwiOnRydWUsXCJNb2R1bGVDb2RlQ3N2XCI6bnVsbH1dIiwiQ3VycmVuY3kiOiJHQlAiLCJMYW5nQ3VsdHVyZSI6ImVuLUdCIiwiU3RvcmVzIjoiW3tcIklkXCI6XCJjN2I0NTIyNS1mNjE1LWYwMTEtOTBjYy1jNzZiNGFjNzVkMDNcIixcIk5hbWVcIjpcIlBhcmsgQ2FtZXJhcyBCdXJnZXNzIEhpbGwgU3RvcmVcIixcIkNvZGVcIjpcIjEyMzQ1Njc4XCJ9XSIsImlhdCI6MTc1MTg5MTg2NSwibmJmIjoxNzUxODkxODY1fQ.XdGS79arlv9YBpfUG0o984Bhd-v6w_iygDRS0-xUA2w", {}, "https://auth2.bettercommerce.io", "https://api20.bettercommerce.io") //LIVE
BCEnvironment.addExtras({ country: "GB", currency: "", language: "en-GB", })
const params = {
  basketId: "499c2219-315b-f011-9fa5-f0f4c50cfd55",
  customerId: "5ba7d95f-9f51-f011-9fa5-b74c4164bde9",
  basket: null,
  billingAddress: {
    customerId: "5ba7d95f-9f51-f011-9fa5-b74c4164bde9",
    id: 5591624,
    title: "",
    state: "Greater London",
    firstName: "Sanjay",
    lastName: "Pathak",
    city: "London",
    address1: "123",
    address2: "Conduit House",
    address3: "",
    phoneNo: "0090900909",
    country: "GB",
    countryCode: "GB",
    postCode: "W4 4HH",
    companyName: "",
    mobileNo: null,
  },
  shippingAddress: {
    customerId: "5ba7d95f-9f51-f011-9fa5-b74c4164bde9",
    id: 5591624,
    title: "",
    state: "Greater London",
    firstName: "Sanjay",
    lastName: "Pathak",
    city: "London",
    address1: "123",
    address2: "Conduit House",
    address3: "",
    phoneNo: "0090900909",
    country: "GB",
    countryCode: "GB",
    postCode: "W4 4HH",
    companyName: "",
    mobileNo: null,
  },
  selectedPayment: {
    id: 10,
    systemName: "COD",
    displayName: "COD",
    slug: null,
    isOnsite: false,
    enabled: true,
    isBillingAddressRequired: true,
    displayOrder: 0,
    iconCssClass: "Apps-cod.png",
    description: "Use Cash on Delivery payment gateway and provide liberty to customers of not paying online.",
    enableImmediateCapture: false,
    forSubscription: false,
    inputType: 15,
    notificationUrl: "/cod/paymentresponse",
    settings: [
      {
        key: "AccountCode",
        value: null,
      },
      {
        key: "Signature",
        value: null,
      },
      {
        key: "MotoUserName",
        value: null,
      },
      {
        key: "MotoPassword",
        value: null,
      },
      {
        key: "MotoSignature",
        value: null,
      },
      {
        key: "MotoAccountCode",
        value: null,
      },
      {
        key: "TestUrl",
        value: null,
      },
      {
        key: "ProductionUrl",
        value: null,
      },
      {
        key: "CancelUrl",
        value: null,
      },
      {
        key: "Version",
        value: null,
      },
      {
        key: "UseSandbox",
        value: "True",
      },
      {
        key: "EnablePayInInstallment",
        value: "False",
      },
      {
        key: "InstallmentDisplayText",
        value: null,
      },
      {
        key: "AdditionalServiceCharge",
        value: "0",
      },
      {
        key: "EnableSplitPayment",
        value: "False",
      },
      {
        key: "PrepaidValueType",
        value: "Price",
      },
      {
        key: "MinimumPrepaidValue",
        value: "0",
      },
      {
        key: "EnableImmediateCapture",
        value: "False",
      },
    ],
    basicSettings: [
      {
        key: "Version",
        value: null,
      },
      {
        key: "OrderTypes",
        value: "[\"Standard\",\"Subscription\"]",
      },
    ],
    message: null,
  },
  storeId: "",
  Payment: {
    selectedPayment: {
      id: 10,
      systemName: "COD",
      displayName: "COD",
      slug: null,
      isOnsite: false,
      enabled: true,
      isBillingAddressRequired: true,
      displayOrder: 0,
      iconCssClass: "Apps-cod.png",
      description: "Use Cash on Delivery payment gateway and provide liberty to customers of not paying online.",
      enableImmediateCapture: false,
      forSubscription: false,
      inputType: 15,
      notificationUrl: "/cod/paymentresponse",
      settings: [
        {
          key: "AccountCode",
          value: null,
        },
        {
          key: "Signature",
          value: null,
        },
        {
          key: "MotoUserName",
          value: null,
        },
        {
          key: "MotoPassword",
          value: null,
        },
        {
          key: "MotoSignature",
          value: null,
        },
        {
          key: "MotoAccountCode",
          value: null,
        },
        {
          key: "TestUrl",
          value: null,
        },
        {
          key: "ProductionUrl",
          value: null,
        },
        {
          key: "CancelUrl",
          value: null,
        },
        {
          key: "Version",
          value: null,
        },
        {
          key: "UseSandbox",
          value: "True",
        },
        {
          key: "EnablePayInInstallment",
          value: "False",
        },
        {
          key: "InstallmentDisplayText",
          value: null,
        },
        {
          key: "AdditionalServiceCharge",
          value: "0",
        },
        {
          key: "EnableSplitPayment",
          value: "False",
        },
        {
          key: "PrepaidValueType",
          value: "Price",
        },
        {
          key: "MinimumPrepaidValue",
          value: "0",
        },
        {
          key: "EnableImmediateCapture",
          value: "False",
        },
      ],
      basicSettings: [
        {
          key: "Version",
          value: null,
        },
        {
          key: "OrderTypes",
          value: "[\"Standard\",\"Subscription\"]",
        },
      ],
      message: null,
    },
    id: null,
    cardNo: null,
    orderNo: 0,
    paidAmount: 0,
    balanceAmount: 0,
    isValid: false,
    status: 0,
    authCode: null,
    issuerUrl: null,
    paRequest: null,
    pspSessionCookie: null,
    pspResponseCode: null,
    pspResponseMessage: null,
    paymentGatewayId: 10,
    paymentGateway: "COD",
    token: null,
    payerId: null,
    cvcResult: null,
    avsResult: null,
    secure3DResult: null,
    cardHolderName: null,
    issuerCountry: null,
    info1: null,
    fraudScore: null,
    paymentMethod: "COD",
    isVerify: false,
    isValidAddress: false,
    lastUpdatedBy: null,
    operatorId: null,
    refStoreId: null,
    tillNumber: null,
    externalRefNo: null,
    expiryYear: null,
    expiryMonth: null,
    isMoto: false,
    additionalServiceCharge: "0",
  },
  extras: {
    cookies: {
      deviceId: "826cc2d7-3026-4b93-9d85-7c88a09e54f3",
      __stripe_mid: "9b8873d3-2538-4426-bdac-9817506a058792249b",
      sessionId: "616CFB5E-0B1E-4695-A6DA-B5AA55FE6E49",
      isDeviceApproved: "true",
      basketId: "499c2219-315b-f011-9fa5-f0f4c50cfd55",
      Currency: "GBP",
    },
    headers: {
      Channel: "Store",
    },
  },
};

new BetterCommerceOperation().convertOrder(params)
    .then(response => {
        console.log(response);
    });