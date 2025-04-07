export default interface IOrderLine {
    readonly name: string;
    readonly sku: string;
    readonly quantity: number;
    readonly imageUrl: string;
    readonly pageUrl: string;
    readonly price: { amount: number, currency: string };
    readonly categories: string;
    readonly estimatedShipmentDate?: string;
}