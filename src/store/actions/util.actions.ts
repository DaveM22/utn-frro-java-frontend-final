export class FormActivate{
    static readonly type = '[Form] Activate';
    constructor(public visible:boolean){}
}

export class DialogActivate {
    static readonly type = '[Dialog] Activate';
    constructor(public visible:boolean){}
}

export class Success {
    static readonly type = '[Api] Success';
    constructor(public title:string, public message:string){}
}

export class ErrorApi {
    static readonly type = '[Api] Error';
    constructor(public title:string, public message:string){}
}

export class BlockTable {
    static readonly type = '[Action] Block table';
    constructor(public block:boolean){}
}