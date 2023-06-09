export class LoginAction {
    static readonly type = "[Login API] Loguearse";
    constructor(public userName:string, public password:string){}
}

export class IsLoginAction {
    static readonly type = "[Login API] IsLogin";
    constructor(){}
}

export class LogoutAction {
    static readonly type = "[Login API] Logout"
    constructor(){}
}