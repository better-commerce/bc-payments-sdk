import IAddress from "./IAddress";
import IConsumer from "./IConsumer";
import IOrderLine from "./IOrderLine";

export default interface IPaymentIntent {

    // The country where the purchase is made
    readonly purchaseCountry: string;
    readonly amount: { amount: number, currency: string };
    readonly consumer: IConsumer;
    readonly billing: IAddress;
    readonly shipping: IAddress;
    readonly courier?: { shippedAt: string, name: string, tracking: string, priority: string };
    readonly description: string;

    // The details of order lines in the purchase.
    readonly items: Array<IOrderLine>;
    readonly discounts: Array<{ displayName: string, amount: { amount: number, currency: string } }>;
    readonly merchant: { redirectConfirmUrl: string, redirectCancelUrl: string, popupOriginUrl: string, name?: string };
    readonly merchantReference?: string;
    readonly taxAmount: { amount: number, currency: string };
    readonly shippingAmount: { amount: number, currency: string };
    readonly shippingOptions?: { shippingCountry: string, supportedShippingCountries: string };
}