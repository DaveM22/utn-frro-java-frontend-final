export class ProvinceListAction {
    static readonly type = '[Province API] Get All';
}

export class AddProvince{
    static readonly type = "[Province API] Add";
    constructor(public payload:any){}
  }

export class EditProvince {
    static readonly type = "[Province API] Edit";
    constructor(public payload:any){}
}
  
  export class DeleteProvince {
    static readonly type = "[Province API] Delete";
    constructor(public id:number){
  
    }
  }