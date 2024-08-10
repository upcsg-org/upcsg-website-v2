import { Color } from "./generic";

export interface MerchSize {
    id: number;
    text: string;
}

export interface MerchType {
    id: number;
    text: string;
}

export interface MerchItem {
    id: number;
    name: string;
    type: MerchType;
    price: number;
    images: string[];
    sizes: MerchSize[];
    colors: Color[];
    isBestSeller: boolean
    isAvailable: boolean,
    isLimitedEdition: boolean,
    onSale: boolean
}
