export * as Infra from "./infrastructure"
export * as Domain from "./domain"
import * as Utils from "./utils"

import { BCEnvironment } from "./domain/config/BCEnvironment";
import { PaymentRequest as CheckoutPaymentRequest } from "../SDKs/checkout/domain/models";
import { PaymentSourceType as CheckoutPaymentSourceType, PaymentType as CheckoutPaymentType } from "../SDKs/checkout/domain/enums";
import { IPaymentIntent as KlarnaPaymentIntent } from "../SDKs/klarna/domain/models";
import { PaymentIntent as KlarnaPaymentIntentType } from "../SDKs/klarna/domain/enums";
import { IOrderLine as KlarnaOrderLine } from "../SDKs/klarna/domain/models";
import { IOrderLine as ClearPayOrderLine, IAddress as ClearPayAddress, IPaymentIntent as ClearPayPaymentIntent } from "../SDKs/clearpay/domain/models";
import { APIConnectionException, APIException, AuthenticationException, BaseException as BCException, InvalidRequestException } from "./domain/entity";
import { IPaymentInfo } from "./domain/models/better-commerce/IPaymentInfo";
import { PaymentStatus, PayPal, Checkout, Stripe, Klarna, Juspay } from "./domain/enums/PaymentStatus";

import { PaymentMethodType } from "./domain/enums";
import { PaymentMethodTypeId } from "./domain/enums";
const { getGatewayId, getGatewayName } = Utils.PaymentUtil;
import { JuspayPaymentType } from "./domain/enums";

// Generic Enums
export { PaymentMethodType, PaymentMethodTypeId, JuspayPaymentType, };

// Payments Module
export { PayPal as PayPalConstants, Checkout as CheckoutConstants, Stripe as StripeConstants, Klarna as KlarnaConstants, Juspay as JuspayConstants, PaymentStatus, };
import { PaymentOperation } from "./domain/operations/PaymentOperation";

// BetterCommerce Module
import { BetterCommerceOperation } from "./domain/operations/BetterCommerceOperation";

// Generic Types
export { BCEnvironment, APIConnectionException, APIException, AuthenticationException, BCException, InvalidRequestException };

// BetterCommerce Types
export { IPaymentInfo };

// Checkout Types
export { CheckoutPaymentSourceType, CheckoutPaymentType, CheckoutPaymentRequest };

// Klarna Types
export { KlarnaPaymentIntentType, KlarnaOrderLine, KlarnaPaymentIntent };

// ClearPay Types
export { ClearPayAddress, ClearPayOrderLine, ClearPayPaymentIntent };

// Payment Types
export { PaymentOperation };

// Commerce Types
export { BetterCommerceOperation };

// Generic Methods
export { getGatewayId, getGatewayName };

export { Utils };