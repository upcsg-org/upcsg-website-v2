import { MerchVariant } from "@/store/merch";
import { User } from "./user";

export interface Cart {
    buyer?: User // Optional since user might not be logged in when adding items
    payment_method?: string
    proof_of_payment?: string
    total_price: number
    status: string
}

export interface CartItem {
    id: string // Temporary ID for cart management (combination of merch_variant.id + size)
    merch_variant: MerchVariant
    quantity: number
    subtotal_price: number
}
