import { MerchItem, MerchSize } from "./merch";
import { Color } from "./generic";

export interface ShoppingCartItem {
    id: number;
    merch: MerchItem;
    sizeChoice: MerchSize;
    colorChoice: Color;
    quantity: number;
}
