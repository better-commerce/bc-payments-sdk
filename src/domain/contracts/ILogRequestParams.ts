export interface ILogRequestParams {
    readonly shortMessage: string
    readonly fullMessage: string | null
    readonly ipAddress: string
    readonly objectId: string
    readonly requestData: string | null
    readonly pageUrl: string
    readonly referrerUrl?: string
    readonly userId?: string
    readonly userName?: string
    readonly additionalinfo1?: string
    readonly additionalinfo2?: string
    readonly logLevelId: number
    readonly paymentGatewayId?: number
}