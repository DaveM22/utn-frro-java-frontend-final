import { Discount } from "src/models/models";

export class DiscountListAction {
    static readonly type = '[Discount API] Get All';
}

export class AddDiscountAction{
    static readonly type = "[Discount API] Add";
    constructor(public payload:Discount){}
  }

export class GetDiscountTodayAction{
    static readonly type = "[Discount API] Get Discount today";
}

export class DeleteDiscount {
    static readonly type = '[Discount API] Delete';
    constructor(public discount:Discount){}
}
