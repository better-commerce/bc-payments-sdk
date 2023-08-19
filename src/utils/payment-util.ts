// Other Imports
import { PaymentMethodType, PaymentMethodTypeId } from "../constants"

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

const matchStrings = (
    input1: string,
    input2: string,
    ignoreCase = false
) => {
    if (input1 && input2) {
        if (ignoreCase) {
            return input1.toLowerCase() === input2.toLowerCase()
        }
        return input1 === input2
    }
    return false
}