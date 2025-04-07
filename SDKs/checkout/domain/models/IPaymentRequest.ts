import IAddress from "./IAddress";
import ICustomer from "./ICustomer";
import IPaymentSource from "./IPaymentSource";
import IPhoneNumber from "./IPhoneNumber";

export default interface IPaymentRequest {
    readonly source: IPaymentSource;
    readonly amount: number;
    readonly currency: string;
    readonly payment_type: string;
    readonly reference: string;
    readonly description: string;
    readonly capture: boolean;
    readonly capture_on: Date | string;
    
    // Required if source.type is "tamara"
    readonly customer?: ICustomer;
    
    readonly shipping: { address: IAddress, phone: IPhoneNumber };
    readonly processing_channel_id: string;
    readonly metadata: Object;
    readonly success_url: string;
    readonly failure_url: string;
    readonly "3ds": any;
}