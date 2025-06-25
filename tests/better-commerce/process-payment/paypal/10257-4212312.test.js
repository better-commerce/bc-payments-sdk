const { BCEnvironment, BetterCommerceOperation } = require("../../../../dist");

const config = {
  id: 2,
  systemName: "Paypal",
  displayName: "Pay by Paypal",
  slug: null,
  isOnsite: false,
  enabled: true,
  isBillingAddressRequired: false,
  displayOrder: 0,
  iconCssClass: "Apps-paypal.png",
  description: "Configure Paypal standard and help customers reach paypals secured site to complete paymen",
  enableImmediateCapture: true,
  forSubscription: false,
  inputType: 15,
  notificationUrl: "/payment-notification/paypal",
  settings: [
    {
      key: "AccountCode",
      value: "AT3ftGisLykS3-fzXAPXuT6QKBbOS8HLPuv9Xo6GVEGMGnNSrjORUcAhou1sfrF-_189ISIRyO7pWQok",
    },
    {
      key: "Signature",
      value: "EE7JVUNBFA0rS5iqyNxHlIzJ07wpunxF7uYGr4WjChaWC2mWkyi3kjdLxLBVz43OB-sjWQdgdmVK--CD",
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
      value: "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=",
    },
    {
      key: "ProductionUrl",
      value: "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=",
    },
    {
      key: "CancelUrl",
      value: "/payment-notification/paypal/canceled",
    },
    {
      key: "Version",
      value: "82.0",
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
      value: "0.0",
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
      value: "0.0",
    },
    {
      key: "EnableImmediateCapture",
      value: "True",
    },
  ],
  basicSettings: [
    {
      key: "Version",
      value: "82.0",
    },
    {
      key: "OrderTypes",
      value: "[\"Standard\"]",
    },
  ],
  message: null,
};

BCEnvironment.initSession("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuYmV0dGVyY29tbWVyY2UuaW8iLCJpc3MiOiJhdXRoLmJldHRlcmNvbW1lcmNlLmlvIiwiZXhwIjoxNzUwODM0OTE0LCJzdWIiOiI2MTZDRkI1RS0wQjFFLTQ2OTUtQTZEQS1CNUFBNTVGRTZFNDkiLCJlbWFpbCI6InNhbmpheUB0ZXN0cGMuY29tIiwiVXNlcklkIjoiNjE2Q0ZCNUUtMEIxRS00Njk1LUE2REEtQjVBQTU1RkU2RTQ5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsIk9yZ0lkIjoiYmQ0ZmNkMmUtNjM4My00ZjFhLTk5YWEtN2U1OWU1YzNjNDc1IiwiRG9tYWluSWQiOiIyNThkMWQxYS00ZTA4LTQxNmMtYTMwMy1hOWQ2ZWI2NDFiODMiLCJPcmdDb2RlIjoicGFya2NhbWVyYXMiLCJPcmdOYW1lIjoidGVzdHBjIiwiVXNlck5hbWUiOiJzYW5qYXlAdGVzdHBjLmNvbSIsIkVtYWlsIjoic2FuamF5QHRlc3RwYy5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic2FuamF5QHRlc3RwYy5jb20iLCJDaGFubmVsIjoiV2ViIiwiRG9tYWlucyI6Ilt7XCJSZWNvcmRJZFwiOlwiMjU4ZDFkMWEtNGUwOC00MTZjLWEzMDMtYTlkNmViNjQxYjgzXCIsXCJCcmFuY2hJZFwiOlwiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwXCIsXCJOYW1lXCI6XCJQYXJrQ2FtZXJhc1wiLFwiRGVmYXVsdEN1bHR1cmVcIjpcImVuLUdCXCIsXCJEZWZhdWx0Q3VycmVuY3lcIjpcIkdCUFwiLFwiSXNEZWZhdWx0XCI6dHJ1ZSxcIk1vZHVsZUNvZGVDc3ZcIjpudWxsfV0iLCJDdXJyZW5jeSI6IkdCUCIsIkxhbmdDdWx0dXJlIjoiZW4tR0IiLCJpYXQiOjE3NTA4MzMxMTQsIm5iZiI6MTc1MDgzMzExNH0.k5ZDDNGSWZKThf7YWbxcaRirEAWYkcxB2TL8uFZRFW4", "rGUKEXyFZzr3K4VQ/T8u31XM6/uDT05s6WtgzZNIjhA=", config, "https://auth2.bettercommerce.io", "https://api20.bettercommerce.io") //LIVE
BCEnvironment.addExtras({ country: "GB", currency: "", language: "en-GB", })
const params = {
  isCOD: false,
  orderId: "68bb5424-8d51-f011-9fa5-b74c4164bde9",
  txnOrderId: "10257-4212312",
  bankOfferDetails: undefined,
  extras: {
    gateway: "paypal",
    isCancelled: false,
    paymentType: "full",
    partialAmount: 0,
    cookies: {
      basketId: "d8621be4-9602-423c-af28-68580faa05d3",
      deviceId: "826cc2d7-3026-4b93-9d85-7c88a09e54f3",
      __stripe_mid: "9b8873d3-2538-4426-bdac-9817506a058792249b",
      sessionId: "616CFB5E-0B1E-4695-A6DA-B5AA55FE6E49",
      agentId: "F7CC793F-5741-47DF-8332-8713381A747B",
      Currency: "",
    },
  },
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });