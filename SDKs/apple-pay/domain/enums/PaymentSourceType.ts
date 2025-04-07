/**
 * Enum {PaymentSourceType} provides the possible payment source types that can be used in requests.
 * 
 * @ordinal {string} TOKEN - The source of the payment is a token.
 * @ordinal {string} ID - The source of the payment is an ID.
 * @ordinal {string} CARD - The source of the payment is a card.
 * @ordinal {string} CUSTOMER - The source of the payment is a customer.
 * @ordinal {string} NETWORK_TOKEN - The source of the payment is a network token.
 * @ordinal {string} PROVIDER_TOKEN - The source of the payment is a provider token.
 * @ordinal {string} BANK_ACCOUNT - The source of the payment is a bank account.
 * @ordinal {string} WE_CHAT_PAY - The source of the payment is WeChat Pay.
 * @ordinal {string} EPS - The source of the payment is EPS.
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