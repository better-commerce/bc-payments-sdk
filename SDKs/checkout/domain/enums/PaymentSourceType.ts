/**
 * @module
 * @description
 * Payment Source Type enum.
 *
 * This enum represents the different types of payment sources that can be used in a payment request.
 *
 * @ordinal {string} TOKEN - Token payment source type.
 * @ordinal {string} ID - ID payment source type.
 * @ordinal {string} CARD - Card payment source type.
 * @ordinal {string} CUSTOMER - Customer payment source type.
 * @ordinal {string} NETWORK_TOKEN - Network token payment source type.
 * @ordinal {string} PROVIDER_TOKEN - Provider token payment source type.
 * @ordinal {string} BANK_ACCOUNT - Bank account payment source type.
 * @ordinal {string} WE_CHAT_PAY - WeChat pay payment source type.
 * @ordinal {string} EPS - EPS payment source type.
 */
export enum PaymentSourceType {
    TOKEN = "token",
    ID = "id",
    CARD = "card",
    CUSTOMER = "customer",
    NETWORK_TOKEN = "network_token",
    PROVIDER_TOKEN = "provider_token",
    BANK_ACCOUNT = "bank_account",
    WE_CHAT_PAY = "wechatpay",
    EPS = "eps",
    GIRO_PAY = "giropay",
    PAYPAL = "paypal",
    ALIPAY_HK = "alipay_hk",
    ALIPAY_CN = "alipay_cn",
    ALIPAY_PLUS = "alipay_plus",
    GCASH = "gcash",
    BENEFIT = "benefit",
    FAWRY = "fawry",
    IDEAL = "ideal",
    SOFORT = "sofort",
    DANA = "dana",
    KAKAO_PAY = "kakaopay",
    TRUE_MONEY = "truemoney",
    TNG = "tng",
    QPAY = "qpay",
    AFTER_PAY = "afterpay",
    MBWAY = "mbway",
    STC_PAY = "stcpay",
    KLARNA = "klarna",
    P24 = "p24",
    KNET = "knet",
    MULTI_BANCO = "multibanco",
    POST_FINANCE = "postfinance",
    BANCONTACT = "bancontact",
    ALMA = "alma",
    ILLICADO = "illicado",
    CVCONNECT = "cvconnect",
    TAMARA = "tamara",
    TRUSTLY = "trustly",
    SEPA = "sepa",
};