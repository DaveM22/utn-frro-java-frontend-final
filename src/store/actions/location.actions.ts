import { Location } from "src/models/models";

export class LocationListAction {
    static readonly type = '[Location API] Get All';
  }

export class LocationAdd{
  static readonly type = "[Location API] Add";
  constructor(public payload:any){

  }
}

export class LocationDelete {
  static readonly type = "[Location API] Delete";
  constructor(public id:number){

  }
}

export class LocationSuccess {
  static readonly type = "[Location API] Success";
  constructor(public message:string){}
}

export class LocationError {
  static readonly type = "[Location API] Error";
  constructor(public message:string){}
}
