export interface ResponseHttp{
    errorMessage:string,
    message:string,
    payload:object
}


export interface Credentials {
    email:string,
    password:string
}

export interface ResponseCredential {
    nombre:string,
    sub:string
}

export interface Localidad {
    codigo:number
    ciudad:string,
    codProvincia:number,
    provincia:Provincia
}

export interface Provincia {
    codigo:number,
    nombre:string
}

export interface Categoria {
    id:number,
    nombre:string
}

export interface Producto {
    id:number,
    descripcion:string,
    idCategoria:number,
    categoria:string,
    cantidad:number
}

export interface ProductSupplier {
    personaId:number;
    cuit:string,
    productId:number,
    productName:string,
    amount:number,
    supplierName:string,
    prices:Prices[],
    validityPrice:number
}

export interface Prices {
    price:number
    dateFrom:Date
    personaId:number
    productId:number
}

export interface Order {
    orderNumber:number;
    date:number;
    personaId:number;
    details:OrderDetail[];
}

export interface OrderDetail{
    orderNumber:number;
    productId:number;
    personaId:number;
    amount:number;
    total:number;
}

export interface Persona {
    id:number;
    direction:string;
    phoneNumber:string;
    email:string;
    postalCod:number;
}

export interface CustomerParticular extends Persona {
    firstName:string;
    lastName:string;
    dni:string;
}

export interface CustomerCompany extends Persona {
    cuit:string;
    businessName:string;
}

export interface Supplier extends Persona{
    cuit:string;
    businessName:string;
}

export interface ProductSupplierOrder extends ProductSupplier {
    amountOrder:number;
    total:number;
}