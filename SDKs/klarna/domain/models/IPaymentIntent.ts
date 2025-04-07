import IOrderLine from "./IOrderLine";

export default interface IPaymentIntent {

    // The language of information presented on the Klarna widget
    readonly locale: string;

    // The country where the purchase is made
    readonly purchase_country: string;

    // The currency in which the customer is charged
    readonly purchase_currency: string;

    // The total price of the order, including tax and discounts.
    readonly order_amount: number;

    readonly order_tax_amount: number;

    // The details of order lines in the purchase.
    readonly order_lines: Array<IOrderLine>;

    // The purpose of the payment session.
    readonly intent: string;
}