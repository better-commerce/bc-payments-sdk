export default interface IOrderLine {
    readonly type: string;
    readonly reference: string;
    readonly name: string;
    readonly quantity: number;
    readonly unit_price: number;
    readonly tax_rate: number;
    readonly total_amount: number;
    readonly total_discount_amount: number;
    readonly total_tax_amount: number;
    readonly image_url: string;
    readonly product_url: string;
}