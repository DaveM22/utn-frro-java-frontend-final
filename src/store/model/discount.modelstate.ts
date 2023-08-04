import { Discount } from "src/models/models";

export interface DiscountStateModel {
    items: Discount[];
    discountToday:Discount[] | null
    errors:any;
}