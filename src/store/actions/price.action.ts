import { Price } from "src/models/models";

export class PriceListAction{
    static readonly type = "[Price API] Get All"
    constructor(public productId:number, public supplierId:number){}
}

export class AddPriceAction{
    static readonly type = "[Price API] Add Price";
    constructor(public payload:Price){}
}