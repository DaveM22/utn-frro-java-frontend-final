import { Discount } from "src/models/models";

export class DiscountListAction {
    static readonly type = '[Discount API] Get All';
}

export class AddDiscountAction{
    static readonly type = "[Discount API] Add";
    constructor(public payload:Discount){}
  }
