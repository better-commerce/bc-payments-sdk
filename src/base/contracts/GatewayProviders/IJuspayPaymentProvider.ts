export interface IJuspayPaymentProvider {
    // ******* Merchant *******
    getPaymentMethods(data: any): any;

    // ******* Customer *******
    getCustomer(data: any): any;
    createCustomer(data: any): any;

    // ******* Order *******
    createOrder(data: any): any;
    updateOrder(data: any): any;

    // ******* Card *******
    getCardInfo(data: any): any;
    tokenizeCard(data: any): any;
    saveCard(data: any): any;
    deleteCard(data: any): any;
    getCards(data: any): any;

    // ******* UPI *******
    verifyVPA(data: any): any;

    // ******* Offers *******
    getOffers(data: any): any;
}