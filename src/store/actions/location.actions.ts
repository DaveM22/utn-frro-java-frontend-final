import { Location } from "src/models/models";

export class LocationListAction {
    static readonly type = '[Location API] Get All';
  }

export class AddLocationAction{
  static readonly type = "[Location API] Add";
  constructor(public payload:any){}
}

export class EditLocationAction {
  static readonly type = "[Location API] Edit";
  constructor(public payload:Location){}
}

export class DeleteLocationAction {
  static readonly type = "[Location API] Delete";
  constructor(public id:number){}
}


