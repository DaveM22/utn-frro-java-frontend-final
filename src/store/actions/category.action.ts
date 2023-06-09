import { Category } from "src/models/models";

export class CategoryListAction {
    static readonly type = '[Category API] Get All';
}

export class AddCategoryAction{
    static readonly type = "[Category API] Add";
    constructor(public payload:Category){}
  }

export class EditCategoryAction {
    static readonly type = "[Category API] Edit";
    constructor(public payload:Category){}
}
  
  export class DeleteCategoryAction {
    static readonly type = "[Category API] Delete";
    constructor(public id:number){
  
    }
  }
