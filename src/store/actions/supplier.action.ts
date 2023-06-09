import { Supplier } from "src/models/models";

export class SupplierListAction {
    static readonly type = '[Supplier API] Get All';
}

export class AddSupplierAction{
    static readonly type = "[Supplier API] Add";
    constructor(public payload:Supplier){}
  }

export class EditSupplierAction {
    static readonly type = "[Supplier API] Edit";
    constructor(public payload:Supplier){}
}
  
  export class DeleteSupplierAction {
    static readonly type = "[Supplier API] Delete";
    constructor(public id:number){
  
    }
  }