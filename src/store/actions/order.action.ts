import { Persona, Product, ProductSupplierOrder } from "src/models/models";


export class ListOrderAction{
    static readonly type ="[Order API] Get All orders";
}

export class GetOrderByIdForReportAction {
    static readonly type = "[Order API] GetById Order";
    constructor(public id:number){}
}


export  class OrderCustomerAction {
    static readonly type = "[Crear pedido] Asignar Cliente"
    constructor(public cliente:number){}
}

export class OrderProductAction {
    static readonly type = "[Crear pedido] Seleccionar productos";
    constructor(public product:ProductSupplierOrder[]){}
}

export class ConfirmCustomerAction{
    static readonly type = "[Crear pedido] Asignar cliente";
    constructor(public customer:Persona){}
}

export class CreateOrderDetailsAction {
    static readonly type = "[Crear pedido] Crear resumen final";
    constructor(public product:ProductSupplierOrder[]){}
}

export class FinishOrderAction{
    static readonly type = "[Crear pedido] Finalizar orden";
}

