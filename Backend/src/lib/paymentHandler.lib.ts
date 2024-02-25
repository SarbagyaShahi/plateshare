import * as crypto from "crypto"
import { Singleton } from "./singleton";

//signature generator
export function generateSignature(data:string, secret:string){
    const signature = crypto.createHmac('sha256', secret).update(data).digest('base64');
    return signature
}

export function generateSignature512(data:string, secret:string){
    const signature = crypto.createHmac('sha512', secret).update(data).digest('hex');
    return signature
}

export function matchSignature(signature:string,secret:string){
    crypto.createDecipheriv
}

export interface PaymentFields{
    amount:number,
    tax_amount:number,
    total_amount:number,
    transaction_uuid:string,
    product_service_charge:number,
    product_delivery_charge:number,
    product_code:string
    success_url:string,
    failure_url:string,
}

export interface PaymentRequestPayload{
    
}

export enum ESEWA_PAYMENT_STATUS{
    COMPLETE="COMPLETE",
    PENDING="PENDING",
    FULL_REFUND="FULL_REFUND",
    PARTIAL_REFUND="PARTIAL_REFUND",
    AMBIGIOUS="AMBIGIOUS",
    NOT_FOUND="NOT_FOUND"
}

export enum FONEPAY_PAYMENT_STATUS{
    SUCCESSFULL="successful",
    FAILED="failed",
    CANCEL="cancel",
}

export interface EsewaPaymentFields extends PaymentFields{
    secretKey?:string
    signed_field_names?:string
}
export interface EsewaPaymentPayload extends PaymentRequestPayload{
    amount?:number,
    tax_amount?:number,
    total_amount?:number,
    transaction_uuid?:string,
    product_service_charge?:number,
    product_delivery_charge?:number,
    product_code?:string
    success_url?:string,
    failure_url?:string,
    signature?:string,
    signed_field_names?:string
}

export interface FonePayPaymentFields extends FonePayFields{
    secretKey?: string
}

export interface FonePayPaymentPayload extends FonePayFields{
    DV: string
}

export interface FonePayFields extends PaymentRequestPayload{
    RU: string,
    PID: string,
    PRN: string,
    AMT: number,
    CRN: string,
    DT: string,
    R1: string,
    R2: string,
    MD: string,
}

export interface EsewaResponsePayload{
    status: ESEWA_PAYMENT_STATUS,
    signature: string,
    transaction_code: string,
    total_amount: number,
    transaction_uuid: string,
    product_code: string,
    success_url: string,
    signed_field_names: string
} 

export interface KhaltiPaymentFields extends PaymentRequestPayload{
    return_url: string,
    website_url: string,
    amount: number,
    purchase_order_id:string,
    purchase_order_name: string,
    customer_info?: { [key: string]: string } | string[],
    amount_breakdown?:string[],
    product_details?:string[]

}

export interface khaltiSuccess{
    pidx:string,
    txnId:string
    amount:number
    mobile:string
    purchase_order_id:string
    purchase_order_name:string
    transaction_id:string
}

export interface FonePayResponsePayload{
    PRN?:string,
    PID?:string,
    PS?:"true"|"false"
    RC?:FONEPAY_PAYMENT_STATUS,
    DV?:string,
    UID?:string,
    BC?:string,
    INI?:string,
    P_AMT?:number,
    R_AMT?:number
}

export interface PaymentHandler{
    verifyPayment?:()=>void
    requestPayment(fields:PaymentFields):PaymentRequestPayload
}

@Singleton()
export class EsewaPaymentHandler implements PaymentHandler{

    requestPayment(fields:EsewaPaymentFields){
        let signature=generateSignature(`total_amount=${fields.total_amount},transaction_uuid=${fields.transaction_uuid},product_code=${fields.product_code}`,fields.secretKey)
        let returnValue:EsewaPaymentPayload={...fields,signature}
        return returnValue
    }
}

@Singleton()
export class FonePayPaymentHandler {
    // requestFonePayPayemnt(fields: FonePayFields): PaymentRequestPayload 
    requestFonePayPayemnt(fields: FonePayPaymentFields){
        let DV = generateSignature512(`${fields.PID},${fields.MD},${fields.PRN},${fields.AMT},${fields.CRN},${fields.DT},${fields.R1},${fields.R2},${fields.RU}`,fields.secretKey)
        let returnValue:FonePayPaymentPayload={...fields, DV}
        return returnValue
    }
}
@Singleton()
export class KhaltiPaymentHandler{
    requestKhaltiPayment(fields: KhaltiPaymentFields){
        return fields
    }

}

export class ConnectIpsPaymentHandler{

}
