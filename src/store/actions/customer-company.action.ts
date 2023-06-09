import { CustomerCompany } from "src/models/models";

export class CustomerCompanyListAction {
    static readonly type = '[CustomerCompany API] Get All';
}

export class AddCustomerCompanyAction{
    static readonly type = "[CustomerCompany API] Add";
    constructor(public payload:CustomerCompany){}
  }

export class EditCustomerCompanyAction {
    static readonly type = "[CustomerCompany API] Edit";
    constructor(public payload:CustomerCompany){}
}
  
  export class DeleteCustomerCompanyAction {
    static readonly type = "[CustomerCompany API] Delete";
    constructor(public id:number){
  
    }
  }