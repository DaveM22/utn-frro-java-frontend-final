import { CustomerParticular } from "src/models/models";

export class CustomerParticularListAction {
    static readonly type = '[CustomerParticular API] Get All';
}

export class AddCustomerParticularAction{
    static readonly type = "[CustomerParticular API] Add";
    constructor(public payload:CustomerParticular){}
  }

export class EditCustomerParticularAction {
    static readonly type = "[CustomerParticular API] Edit";
    constructor(public payload:CustomerParticular){}
}
  
  export class DeleteCustomerParticularAction {
    static readonly type = "[CustomerParticular API] Delete";
    constructor(public id:number){
  
    }
  }
