// Other Imports
import { matchStrings, stringToBoolean } from "./parse-util"
import { PaymentMethodType, PaymentMethodTypeId } from "../constants"
import { Checkout, Defaults, PaymentTransactionStatus } from "../constants/constants"

export const getGatewayId = (gatewayName: string) => {
    if (matchStrings(gatewayName, PaymentMethodType.PAYPAL, true)) {
        return PaymentMethodTypeId.PAYPAL
    } else if (matchStrings(gatewayName, PaymentMethodType.CHECKOUT, true)) {
        return PaymentMethodTypeId.CHECKOUT
    } else if (matchStrings(gatewayName, PaymentMethodType.KLARNA, true)) {
        return PaymentMethodTypeId.KLARNA
    } else if (matchStrings(gatewayName, PaymentMethodType.CLEAR_PAY, true)) {
        return PaymentMethodTypeId.CLEAR_PAY
    } else if (matchStrings(gatewayName, PaymentMethodType.MASTER_CARD, true)) {
        return PaymentMethodTypeId.MASTER_CARD
    } else if (matchStrings(gatewayName, PaymentMethodType.JUSPAY, true)) {
        return PaymentMethodTypeId.JUSPAY
    } else if (matchStrings(gatewayName, PaymentMethodType.STRIPE, true)) {
        return PaymentMethodTypeId.STRIPE
    } else if (matchStrings(gatewayName, PaymentMethodType.COD, true)) {
        return PaymentMethodTypeId.COD
    } else if (
        matchStrings(gatewayName, PaymentMethodType.ACCOUNT_CREDIT, true)
    ) {
        return PaymentMethodTypeId.ACCOUNT_CREDIT
    } else if (matchStrings(gatewayName, PaymentMethodType.CHEQUE, true)) {
        return PaymentMethodTypeId.CHEQUE
    } else if (matchStrings(gatewayName, PaymentMethodType.CHECKOUT_APPLE_PAY, true)) {
        return PaymentMethodTypeId.CHECKOUT_APPLE_PAY
    }
    return -1
}

export const getGatewayName = (id: number) => {
    if (id === PaymentMethodTypeId.PAYPAL) {
        return PaymentMethodType.PAYPAL
    } else if (id === PaymentMethodTypeId.CHECKOUT) {
        return PaymentMethodType.CHECKOUT
    } else if (id === PaymentMethodTypeId.KLARNA) {
        return PaymentMethodType.KLARNA
    } else if (id === PaymentMethodTypeId.CLEAR_PAY) {
        return PaymentMethodType.CLEAR_PAY
    } else if (id === PaymentMethodTypeId.MASTER_CARD) {
        return PaymentMethodType.MASTER_CARD
    } else if (id === PaymentMethodTypeId.JUSPAY) {
        return PaymentMethodType.JUSPAY
    } else if (id === PaymentMethodTypeId.STRIPE) {
        return PaymentMethodType.STRIPE
    } else if (id === PaymentMethodTypeId.COD) {
        return PaymentMethodType.COD
    } else if (id === PaymentMethodTypeId.ACCOUNT_CREDIT) {
        return PaymentMethodType.ACCOUNT_CREDIT
    } else if (id === PaymentMethodTypeId.CHEQUE) {
        return PaymentMethodType.CHEQUE
    } else if (id === PaymentMethodTypeId.CHECKOUT_APPLE_PAY) {
        return PaymentMethodType.CHECKOUT_APPLE_PAY
    }
    return -1
}

export const getPaymentTransactionStatus = (methodId: number, data: any): string => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        if (data?.data?.response_summary === Checkout.ResponseSummaryType.APPROVED) {
            return PaymentTransactionStatus.TXN_CHARGED;
        } else if (data?.data?.response_summary === Checkout.ResponseSummaryType.DECLINED) {
            return PaymentTransactionStatus.TXN_FAILED;
        }
    }
    return PaymentTransactionStatus.NONE;
}

export const getPaymentTransactionOrderId = (methodId: number, data: any): string => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return data?.data?.metadata?.udf1;
    }
    return Defaults.String.Value;
}

export const getOrderNo = (methodId: number, data: any): number => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return data?.metadata?.udf4.split('-')[0];
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return parseInt(data?.order_id?.split('-')[0]);
    }
    return Defaults.Int.Value;
}

export const getPaymentNo = (methodId: number, data: any): string => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return data?.metadata?.udf4.split('-')[1];
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return data?.udf6?.split('-')[1];
    }
    return Defaults.String.Value;
}

export const getAuthCode = (methodId: number, data: any): string => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return data?.id;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return data?.txn_id;
    }
    return Defaults.String.Value;
}

export const getSignature = (methodId: number, data: any): string => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return `scheme_id=${data?.scheme_id || Defaults.String.Value}&acquirer_transaction_id=${data?.processing?.acquirer_transaction_id || Defaults.String.Value}&retrieval_reference_number=${data?.processing?.retrieval_reference_number || Defaults.String.Value}&merchant_category_code=${data?.processing?.merchant_category_code || Defaults.String.Value}&scheme_merchant_id=${data?.processing?.scheme_merchant_id || Defaults.String.Value}`;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return data?.content?.txn?.payment_gateway_response?.epg_txn_id;
    }
    return Defaults.String.Value;
}

export const getPSPResponseMsg = (methodId: number, data: any): string => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return `id=${data?.id || Defaults.String.Value}&status=${data?.status || Defaults.String.Value}`;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return data?.content?.txn?.status;
    }
    return Defaults.String.Value;
}

export const getIsSavePSPInfo = (methodId: number, data: any): boolean => {

    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return true;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        const payGatewayId = data?.udf4;
        if (payGatewayId) {
            return stringToBoolean(payGatewayId.split('_')[1]) ?? false;
        }
    }
    return false;
}

export const getPSPInfo = (methodId: number, data: any): string => {

    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return `3ds`;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        const payGatewayId = data?.udf4;
        if (payGatewayId) {
            return data?.udf7 ? data?.udf7?.split('_')[1] : Defaults.String.Value;
        }
    }
    return Defaults.String.Value;
}

export const getPaymentIdentifier = (methodId: number, data: any): string => {

    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return `3ds`;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return data?.udf7 ? data?.udf7?.split('_')[0] : Defaults.String.Value;
    }
    return Defaults.String.Value;
}

export const getPSPGatewayInfo = (methodId: number, data: any): string => {

    if (methodId == PaymentMethodTypeId.JUSPAY) {
        return data?.txn_detail?.gateway;
    }
    return Defaults.String.Value;
}

export const getCardType = (methodId: number, data: any): string => {

    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return data?.source?.card_type;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return matchStrings(data?.udf5, 'card', true)
            ? data?.card?.card_type
            : null;
    }
    return Defaults.String.Value;
}

export const getCardIssuer = (methodId: number, data: any): string => {

    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return data?.source?.card_category;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return matchStrings(data?.udf5, 'card', true)
            ? data?.card?.card_issuer
            : null;
    }
    return Defaults.String.Value;
}

export const getCardBrand = (methodId: number, data: any): string => {

    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return data?.source?.product_type;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return matchStrings(data?.udf5, 'card', true)
            ? data?.card?.card_brand
            : null;
    }
    return Defaults.String.Value;
}