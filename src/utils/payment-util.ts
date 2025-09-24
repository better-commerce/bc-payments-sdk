// Package Imports
import { PayPalPayment } from "../modules/payments/PayPalPayment"

// Other Imports
import { groupMatch, matchStrings, stringToBoolean, tryParseJson } from "./parse-util"
import { PaymentMethodType, PaymentMethodTypeId } from "../constants"
import { Checkout, Defaults, PaymentTransactionStatus, Paypal, RegularExpression, DEBUG_LOGGING_ENABLED } from "../constants/constants"
import { BCEnvironment } from "../base/config/BCEnvironment"
import { OmniCapital } from "../constants/enums/PaymentStatus"
import { Logger } from "../modules/better-commerce/Logger"

export const gatewayNameToIdMap = new Map<string, number>(
    Object.entries(PaymentMethodType).map(([key, value]) => [
        value.toLowerCase(),
        PaymentMethodTypeId[key as keyof typeof PaymentMethodTypeId],
    ])
);

export const idToGatewayNameMap = new Map<number, string>(
    Object.entries(PaymentMethodTypeId)
        .filter(([key, value]) => typeof value === 'number') // Filter out string keys (TS enum quirk)
        .map(([key, value]) => [value as number, PaymentMethodType[key as keyof typeof PaymentMethodType]])
);

/*export const getGatewayId = (gatewayName: string): number => {
    const normalizedGatewayName = gatewayName.toLowerCase();
    return gatewayNameToIdMap.get(normalizedGatewayName) ?? -1;
};*/

/**
 * Given a gateway name, returns the corresponding gateway ID.
 * @param gatewayName - The name of the payment gateway.
 * @returns The gateway ID if found, -1 otherwise.
 */
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
    } else if (matchStrings(gatewayName, PaymentMethodType.ACCOUNT_CREDIT, true)) {
        return PaymentMethodTypeId.ACCOUNT_CREDIT
    } else if (matchStrings(gatewayName, PaymentMethodType.CHEQUE, true)) {
        return PaymentMethodTypeId.CHEQUE
    } else if (matchStrings(gatewayName, PaymentMethodType.CHECKOUT_APPLE_PAY, true)) {
        return PaymentMethodTypeId.CHECKOUT_APPLE_PAY
    } else if (matchStrings(gatewayName, PaymentMethodType.CHECKOUT_KLARNA, true)) {
        return PaymentMethodTypeId.CHECKOUT_KLARNA
    } else if (matchStrings(gatewayName, PaymentMethodType.ELAVON, true)) {
        return PaymentMethodTypeId.ELAVON
    } else if (matchStrings(gatewayName, PaymentMethodType.OPAYO, true)) {
        return PaymentMethodTypeId.OPAYO
    } else if (matchStrings(gatewayName, PaymentMethodType.WALLET, true)) {
        return PaymentMethodTypeId.WALLET
    } else if (matchStrings(gatewayName, PaymentMethodType.OMNICAPITAL, true)) {
        return PaymentMethodTypeId.OMNICAPITAL
    } else if (matchStrings(gatewayName, PaymentMethodType.NUVEI, true)) {
        return PaymentMethodTypeId.NUVEI
    } else if (matchStrings(gatewayName, PaymentMethodType.NUVEI_GOOGLE_PAY, true)) {
        return PaymentMethodTypeId.NUVEI_GOOGLE_PAY
    } else if (matchStrings(gatewayName, PaymentMethodType.NUVEI_APPLE_PAY, true)) {
        return PaymentMethodTypeId.NUVEI_APPLE_PAY
    }
    return -1
}

/*export const getGatewayName = (id: number): string | -1 => {
    return idToGatewayNameMap.get(id) ?? -1;
};*/

/**
 * Given a gateway ID, returns the corresponding gateway name.
 * @param {number} id the gateway ID.
 * @returns {string} the gateway name.
 */
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
    } else if (id === PaymentMethodTypeId.CHECKOUT_KLARNA) {
        return PaymentMethodType.CHECKOUT_KLARNA
    } else if (id === PaymentMethodTypeId.ELAVON) {
        return PaymentMethodType.ELAVON
    } else if (id === PaymentMethodTypeId.OPAYO) {
        return PaymentMethodType.OPAYO
    } else if (id === PaymentMethodTypeId.WALLET) {
        return PaymentMethodType.WALLET
    } else if (id === PaymentMethodTypeId.OMNICAPITAL) {
        return PaymentMethodType.OMNICAPITAL
    } else if (id === PaymentMethodTypeId.NUVEI) {
        return PaymentMethodType.NUVEI
    } else if (id === PaymentMethodTypeId.NUVEI_GOOGLE_PAY) {
        return PaymentMethodType.NUVEI_GOOGLE_PAY
    } else if (id === PaymentMethodTypeId.NUVEI_APPLE_PAY) {
        return PaymentMethodType.NUVEI_APPLE_PAY
    }
    return -1
}

/**
 * Determines the payment transaction status based on the payment method and transaction data.
 * 
 * This function evaluates the payment method ID and corresponding transaction data to ascertain
 * the status of a payment transaction. For the Checkout payment method, it checks the event type
 * and response summary to categorize the transaction as either charged or failed. For PayPal, it
 * assesses the event type to determine if the transaction was captured or if authentication failed.
 * If the conditions for a charged or failed transaction are not met, it defaults to returning a
 * status of 'NONE'.
 * 
 * @param methodId - The ID of the payment method, used to determine the applicable gateway logic.
 * @param data - The transaction data containing details necessary to determine the transaction status.
 * @returns A string representing the transaction status, such as 'TXN_CHARGED', 'TXN_FAILED', or 'NONE'.
 */
export const getPaymentTransactionStatus = (methodId: number, data: any): string => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        if (data?.type?.toLowerCase() === Checkout.EventType.PAYMENT_CAPTURED?.toLowerCase()) {
            if (data?.data?.response_summary === Checkout.ResponseSummaryType.APPROVED) {
                return PaymentTransactionStatus.TXN_CHARGED;
            } else if (data?.data?.response_summary === Checkout.ResponseSummaryType.DECLINED) {
                return PaymentTransactionStatus.TXN_FAILED;
            }
        } else if (data?.type?.toLowerCase() === Checkout.EventType.PAYMENT_AUTHENTICATION_FAILED?.toLowerCase()) {
            return PaymentTransactionStatus.TXN_FAILED;
        }
    } else if (methodId == PaymentMethodTypeId.PAYPAL) {
        if (data?.event_type === Paypal.EventType.PAYMENT_CAPTURED) {
            return PaymentTransactionStatus.TXN_CHARGED;
        } else if (data?.event_type === Paypal.EventType.PAYMENT_AUTHENTICATION_FAILED) {
            return PaymentTransactionStatus.TXN_FAILED;
        }
    } else if (methodId == PaymentMethodTypeId.OMNICAPITAL) {
        let paymentStatus = PaymentTransactionStatus.NONE

        if (DEBUG_LOGGING_ENABLED) {
            // TODO: Debugging Log
            Logger.logPayment({ data: { methodId, data }, message: `Log | getPaymentTransactionStatus` }, { headers: {}, cookies: {} })
        }
        const status = data?.Status?.toLowerCase() || Defaults.String.Value
        switch (status) {
            case 'complete':
                paymentStatus = PaymentTransactionStatus.TXN_CHARGED;
                break;
            case 'declined':
            case 'finance offer withdrawn':
            case 'order cancelled':
            case 'application lapsed':
            case 'credit check declined':
            case 'credit check pre decline':
                paymentStatus = PaymentTransactionStatus.TXN_FAILED;
                break;
            case 'awaiting fulfilment':
            case 'order fulfilled':
                paymentStatus = PaymentTransactionStatus.TXN_INITIATED;
                break;
            default:
                console.log('--- OmniCapital no case matched, returning NONE ---')
                break;
        }
        if (DEBUG_LOGGING_ENABLED) {
            // TODO: Debugging Log
            Logger.logPayment({ data: { paymentStatus }, message: `Log | getPaymentTransactionStatus` }, { headers: {}, cookies: {} })
        }
        return paymentStatus
    }
    return PaymentTransactionStatus.NONE;
}

/**
 * Retrieves the order ID from the payment transaction data.
 * @param methodId - The ID of the payment method.
 * @param data - The payment transaction data.
 * @returns A promise that resolves to the order ID as a string.
 */
export const getPaymentTransactionOrderId = async (methodId: number, data: any): Promise<string> => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return data?.data?.metadata?.udf1;
    } else if (methodId == PaymentMethodTypeId.PAYPAL) {
        console.log('--- data ---', JSON.stringify(data))
        const payPalOrderId = data?.resource?.supplementary_data?.related_ids?.order_id;
        console.log('--- payPalOrderId ---', payPalOrderId)
        if (payPalOrderId) {
            const { extras } = data
            const { clientId, sharedSecret, apiToken, refreshToken, config, authUrl, baseUrl } = extras
            if (!clientId && !sharedSecret) {
                BCEnvironment.init(clientId, sharedSecret, config, authUrl, baseUrl);
            }
            if (!apiToken && !refreshToken) {
                BCEnvironment.initSession(apiToken, refreshToken, config, authUrl, baseUrl);
            }
            const paypalOrderDetails = await new PayPalPayment().getOrderDetails(payPalOrderId);
            console.log('--- paypalOrderDetails ---', JSON.stringify(paypalOrderDetails))
            if (paypalOrderDetails?.purchase_units?.length) {
                const description = paypalOrderDetails?.purchase_units[0]?.description;
                console.log('--- description ---', description)
                if (description) {
                    return parseOrderId(description)?.trim() || Defaults.String.Value;
                }
            }
        }
    } else if (methodId == PaymentMethodTypeId.OMNICAPITAL) {
        const retailerUniqueRef = data?.["Identification[RetailerUniqueRef]"]
        if (retailerUniqueRef) {
            const json: any = tryParseJson(retailerUniqueRef)
            if (json?.id) {
                return json?.id
            }
        }
    }
    return Promise.resolve(Defaults.String.Value);
}

/*export const getPaymentTransactionOrderNo = async (methodId: number, data: any): Promise<string> => {
    if (methodId == PaymentMethodTypeId.PAYPAL) {
        console.log('--- data ---', JSON.stringify(data))
        const payPalOrderId = data?.resource?.supplementary_data?.related_ids?.order_id;
        console.log('--- payPalOrderId ---', payPalOrderId)
        if (payPalOrderId) {
            const { extras } = data
            const { clientId, sharedSecret, config, authUrl, baseUrl } = extras
            BCEnvironment.init(clientId, sharedSecret, config, authUrl, baseUrl);
            const paypalOrderDetails = await new PayPalPayment().getOrderDetails(payPalOrderId);
            console.log('--- paypalOrderDetails ---', JSON.stringify(paypalOrderDetails))
            if (paypalOrderDetails?.purchase_units?.length) {
                const description = paypalOrderDetails?.purchase_units[0]?.description;
                console.log('--- description ---', description)
                if (description) {
                    return parseOrderPaymentNo(description)?.trim() || Defaults.String.Value;
                }
            }
        }
    }
    return Promise.resolve(Defaults.String.Value);
}*/

/**
 * Retrieves the order number from the given data based on the payment method type.
 * 
 * @param methodId - The payment method type identifier.
 * @param data - The data object containing the order number.
 * @param extras - The extras object containing additional information.
 * 
 * @returns The order number if found, otherwise the default integer value.
 */
export const getOrderNo = (methodId: number, data: any, extras?: any): number => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return data?.metadata?.udf4.split('-')[0];
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return parseInt(data?.order_id?.split('-')[0]);
    } else if (methodId == PaymentMethodTypeId.OMNICAPITAL) {
        return data?.orderNo;
    }
    return Defaults.Int.Value;
}

/**
 * Retrieves the payment number from the provided data based on the payment method type.
 * For CHECKOUT payment method, it retrieves the payment number from the `udf4` field.
 * For JUSPAY payment method, it retrieves the payment number from the `udf6` field.
 * @param {number} methodId - The ID of the payment method.
 * @param {any} data - The data object containing the payment number information.
 * @param {any} extras - Optional additional data containing configuration or environment information.
 * @returns {string} The payment number corresponding to the payment method.
 */
export const getPaymentNo = (methodId: number, data: any, extras?: any): string => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return data?.metadata?.udf4.split('-')[1];
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return data?.udf6?.split('-')[1];
    } else if (methodId == PaymentMethodTypeId.OMNICAPITAL) {
        return data?.paymentNo;
    }
    return Defaults.String.Value;
}

/**
 * Retrieves the authorization code from the provided data.
 * 
 * This function extracts the authorization code based on the payment method ID.
 * For the CHECKOUT method, it returns the transaction ID.
 * For the PAYPAL method, it returns the capture ID from the purchase unit.
 * For the JUSPAY method, it returns the transaction ID.
 * 
 * @param {number} methodId - The id of the payment method.
 * @param {any} data - The data object containing the authorization code information.
 * @returns {string} The authorization code corresponding to the payment method.
 *                   Returns a default string value if no relevant information is found.
 */
export const getAuthCode = (methodId: number, data: any): string => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return data?.id;
    } else if (methodId == PaymentMethodTypeId.PAYPAL) {
        //return data?.id;
        return data?.purchase_units?.[0].payments?.captures?.[0].id || Defaults.String.Value;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return data?.txn_id;
    }
    return Defaults.String.Value;
}

/**
 * Generates a signature string necessary for payment verification.
 * 
 * This function constructs a signature based on the payment method ID. 
 * For CHECKOUT, it includes various transaction identifiers in the signature.
 * For PAYPAL, it returns a JSON string containing token, order ID, payer ID, and gateway.
 * For JUSPAY, it retrieves the EPG transaction ID from the payment gateway response.
 * 
 * @param {number} methodId - The ID of the payment method.
 * @param {any} data - The data object containing information related to the payment.
 * @param {any} hookData - The hook data object containing additional resource information.
 * @returns {string} The signature string specific to the payment method.
 *                   Returns a default string value if no relevant information is found.
 */
export const getSignature = (methodId: number, data: any, hookData: any): string => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return `scheme_id=${data?.scheme_id || Defaults.String.Value}&acquirer_transaction_id=${data?.processing?.acquirer_transaction_id || Defaults.String.Value}&retrieval_reference_number=${data?.processing?.retrieval_reference_number || Defaults.String.Value}&merchant_category_code=${data?.processing?.merchant_category_code || Defaults.String.Value}&scheme_merchant_id=${data?.processing?.scheme_merchant_id || Defaults.String.Value}`;
    } else if (methodId == PaymentMethodTypeId.PAYPAL) {
        return JSON.stringify({
            token: `${hookData?.resource?.id}`,
            orderId: `${data?.id}`,
            payerId: `${data?.payer?.payerId}`,
            gateway: `${PaymentMethodTypeId.PAYPAL}`,
            isCancelled: false
        });
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return data?.content?.txn?.payment_gateway_response?.epg_txn_id;
    }
    return Defaults.String.Value;
}

/**
 * Retrieves the PSP (Payment Service Provider) response message from the provided data.
 * 
 * This function constructs a response message based on the payment method ID.
 * For the CHECKOUT method, it includes the transaction ID and status in the message.
 * For the PAYPAL method, it includes only the transaction ID in the message.
 * For the JUSPAY method, it retrieves the status from the transaction content.
 * 
 * @param {number} methodId - The ID of the payment method.
 * @param {any} data - The data object containing information related to the payment.
 * @returns {string} The PSP response message corresponding to the payment method.
 *                   Returns a default string value if no relevant information is found.
 */
export const getPSPResponseMsg = (methodId: number, data: any): string => {
    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return `id=${data?.id || Defaults.String.Value}&status=${data?.status || Defaults.String.Value}`;
    } else if (methodId == PaymentMethodTypeId.PAYPAL) {
        return `id=${data?.id || Defaults.String.Value}`;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return data?.content?.txn?.status;
    }
    return Defaults.String.Value;
}

/**
 * Retrieves a boolean indicating whether the PSP info should be saved.
 * @param {number} methodId - The id of the payment method.
 * @param {any} data - The data object containing the PSP info.
 * @returns {boolean} A boolean indicating whether the PSP info should be saved.
 */
export const getIsSavePSPInfo = (methodId: number, data: any): boolean => {

    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return true;
    } else if (methodId == PaymentMethodTypeId.PAYPAL) {
        return false;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        const payGatewayId = data?.udf4;
        if (payGatewayId) {
            return stringToBoolean(payGatewayId.split('_')[1]) ?? false;
        }
    }
    return false;
}

/**
 * Retrieves the PSP (Payment Service Provider) information from the provided data.
 * 
 * This function extracts PSP-specific information based on the payment method ID.
 * For the CHECKOUT method, it returns a fixed value indicating 3D Secure (3ds).
 * For the JUSPAY method, it attempts to extract the PSP info from the `udf7` field.
 * 
 * @param {number} methodId - The ID of the payment method.
 * @param {any} data - The data object containing information related to the payment.
 * @returns {string} The PSP information corresponding to the payment method.
 *                   Returns a default string value if no relevant information is found.
 */
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

/**
 * Retrieves the payment identifier from the provided data.
 * @param {number} methodId - The id of the payment method.
 * @param {any} data - The data object containing the payment identifier information.
 * @returns {string} The payment identifier.
 */
export const getPaymentIdentifier = (methodId: number, data: any): string => {

    if (methodId == PaymentMethodTypeId.CHECKOUT) {
        return `3ds`;
    } else if (methodId == PaymentMethodTypeId.JUSPAY) {
        return data?.udf7 ? data?.udf7?.split('_')[0] : Defaults.String.Value;
    }
    return Defaults.String.Value;
}

/**
 * Retrieves the PSP gateway information from the provided data.
 * @param {number} methodId - The id of the payment method.
 * @param {any} data - The data object containing the PSP gateway information.
 * @returns {string} The PSP gateway information.
 */
export const getPSPGatewayInfo = (methodId: number, data: any): string => {

    if (methodId == PaymentMethodTypeId.JUSPAY) {
        return data?.txn_detail?.gateway;
    } else if (methodId == PaymentMethodTypeId.PAYPAL) {
        return PaymentMethodType.PAYPAL;
    }
    return Defaults.String.Value;
}

/**
 * Retrieves the card type from the provided data.
 * @param {number} methodId - The id of the payment method.
 * @param {any} data - The data object containing the card type information.
 * @returns {string} The card type name.
 */
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

/**
 * Retrieves the card issuer from the provided data.
 * @param {number} methodId - The id of the payment method.
 * @param {any} data - The data object containing the card issuer information.
 * @returns {string} The card issuer name.
 */
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

/**
 * Retrieves the card brand from the provided data.
 * @param {number} methodId - The id of the payment method.
 * @param {any} data - The data object containing the card brand information.
 * @returns {string} The card brand name.
 */
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

/**
 * This function takes an input string that contains the order and basket IDs
 * and extracts them. The IDs are returned as a comma-separated string.
 * @param {string} input - Input string containing the order and basket IDs.
 * @returns {string} A comma-separated string containing the order and basket IDs.
 */
const parseOrderId = (input: string): string => {
    const matches = groupMatch(input?.trim(), new RegExp(RegularExpression.ORDER_BASKET_ID_MATCH));
    console.log('--- matches ---', JSON.stringify(matches));
    if (matches?.length >= 3) {
        return `${matches[1]},${matches[3]}`
    }
    return Defaults.String.Value;
}