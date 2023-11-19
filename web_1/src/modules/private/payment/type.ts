import { ApprovalStatusType } from "../approval-status";
import { BankType } from "../bank";
import { PaymentMethodType } from "../payment-method";
import { TransactionType } from "../transaction";

export interface PaymentType {
    id?: string,
    code?: string,
    confirm_date?: Date,
    transaction_id?: string,
    total_payment?: number,
    information?: string,
    approval_status_id?: string,
    payment_method_id?: string,
    bank_id?: string,
    account_name?: string,
    account_number?: string,
    account_receivable?: string,
    prof_payment?: string,

    Transaction?: TransactionType,
    ApprovalStatus?: ApprovalStatusType,
    PaymentMethod?: PaymentMethodType,
    Bank?: BankType,
}