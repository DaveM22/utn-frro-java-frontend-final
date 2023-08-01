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

export interface Location {
    postalCode:number
    city:string,
    provinceCode:number,
    provinceName:string;
}

export interface Province {
    provinceCode:number | null,
    name:string | null
}

export interface Category {
    categoryId:number | null,
    name:string | null
}

export interface Product {
    id:number | null,
    description:string | null,
    categoryId:number | null,
    categoryName:string | null,
    amount:number | null
}

export interface ProductSupplier {
    personaId:number;
    cuit:string,
    productId:number,
    productName:string,
    amount:number,
    supplierName:string,
    prices:Price[],
    validityPrice:number
}

export interface Price {
    price:number | null
    dateFrom:Date | null
    personaId:number | null
    productId:number | null
}

export interface Order {
    orderNumber:number;
    date:number;
    personaId:number;
    details:OrderDetail[];
}

export interface OrderReport {
    dateFrom:Date;
    customerName:string;
    direction:string;
    email:string;
    details:OrderReportDetail[];
}

export interface OrderReportDetail {
    productName:string;
    supplierName:string;
    amount:number;
    total:number;
    price:number;
}


export interface OrderView {
    orderNumber:number;
    dateFrom:Date;
    customerName:String;
    amountProducts:number;
}

export interface OrderDetail{
    orderNumber:number;
    productId:number;
    personaId:number;
    price:number | null;
    amount:number;
    productName:string;
    supplierName:string;
    total:number | null;
}

export interface Persona {
    id:number | null;
    direction:string | null;
    phoneNumber:string | null;
    email:string | null;
    postalCode:number | null;
}

export interface CustomerParticular extends Persona {
    firstName:string | null;
    lastName:string | null;
    dni:string | null;
}

export interface CustomerCompany extends Persona {
    cuit:string | null;
    businessName:string | null;
}

export interface Supplier extends Persona{
    cuit:string | null;
    businessName:string | null;
}

export interface ProductSupplierOrder extends ProductSupplier {
    amountOrder:number | null;
    total:number | null;
    subtotal:number | null;
    discount:number | null;
}

export interface Discount {
     validityDate: Date | null;
     amountPrice:number | null;
     discount: number | null;
}