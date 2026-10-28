import { BCEnvironment } from "./base/config/BCEnvironment";
import { PaymentSourceType as CheckoutPaymentSourceType, PaymentType as CheckoutPaymentType, PaymentRequest as CheckoutPaymentRequest } from "bc-checkout-sdk";
import { IPaymentIntent as KlarnaPaymentIntent } from "bc-klarna-sdk/dist/models/IPaymentIntent";
import { PaymentIntent as KlarnaPaymentIntentType } from "bc-klarna-sdk/dist/constants/enums/PaymentIntent";
import { IOrderLine as KlarnaOrderLine } from "bc-klarna-sdk/dist/models/IOrderLine";
import { OrderLine as ClearPayOrderLine, Address as ClearPayAddress, PaymentIntent as ClearPayPaymentIntent } from "bc-clearpay-sdk";
import { APIConnectionException, APIException, AuthenticationException, BCException, InvalidRequestException } from "./base/entity";
import { IPaymentInfo } from "./models/better-commerce/IPaymentInfo";
import { IBillingAddress as IWorldpayBillingAddress, IHostedPaymentForm as IWorldpayHostedPaymentForm, IPaymentRequest as IWorldpayPaymentRequest, IPaymentResult as IWorldpayPaymentResult, VerificationMethod as WorldpayVerificationMethod, PaymentStatus as WorldpayPaymentStatus, TransStatus as WorldpayTransStatus, TransactionOutcome as WorldpayTransactionOutcome } from "bc-worldpay-sdk";
import { PaymentStatus, PayPal, Checkout, Stripe, Klarna, Juspay } from "./constants/enums/PaymentStatus";

import { PaymentMethodType, PaymentMethodTypeId, PaymentSelectionType } from "./constants";
import { getGatewayId, getGatewayName } from "./utils/payment-util";
import { JuspayPaymentType } from "./constants/enums";

// Generic Enums
export { PaymentMethodType, PaymentMethodTypeId, JuspayPaymentType, PaymentSelectionType, };

// Payments Module
export { PayPal as PayPalConstants, Checkout as CheckoutConstants, Stripe as StripeConstants, Klarna as KlarnaConstants, Juspay as JuspayConstants, PaymentStatus, };
import { PaymentOperation } from "./operations/PaymentOperation";

// BetterCommerce Module
import { BetterCommerceOperation } from "./operations/BetterCommerceOperation";

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

// Worldpay Types
export { IWorldpayBillingAddress, IWorldpayHostedPaymentForm, IWorldpayPaymentRequest, IWorldpayPaymentResult, WorldpayVerificationMethod, WorldpayPaymentStatus, WorldpayTransStatus, WorldpayTransactionOutcome };

// Payment Types
export { PaymentOperation };

// Commerce Types
export { BetterCommerceOperation };

// Generic Methods
export { getGatewayId, getGatewayName };