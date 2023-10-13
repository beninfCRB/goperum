import { CustomerType } from "../customer";
import { MarketingType } from "../marketing";
import { ProductType } from "../product";
import { PurchaseMethodType } from "../purchase-method";
import { TypeDPType } from "../type-dp";

export interface TransactionType {
    id?: string,
    code?: string,
    customer_id?: string,
    marketing_id?: string,
    product_id?: string,
    purchase_method_id?: string,
    type_down_payment_id?: string,
    down_payment?: number,
    length_installments_dp?: number,
    monthly_installments_dp?: number,
    principal?: number,
    length_principal?: number,
    monthly_principal?: number,
    total_bill?: number,

    Customer?: CustomerType,
    Marketing?: MarketingType,
    Product?: ProductType,
    TypeDownPayment?: TypeDPType,
    PurchaseMethod?: PurchaseMethodType,
}