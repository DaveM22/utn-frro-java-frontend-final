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

export interface ProductoProveedor {
    cuit:string,
    idProducto:number,
    productName:string,
    cantidad:number,
    nombreProveedor:string,
    prices:Prices[],
    validityPrice:number
}

export interface Prices {
    precio:number
    dateFrom:Date
}

export interface Order {
    orderNumber:number;
    orderDate:number;
    customer:string;
    customerCuit:string;
    details:OrderDetail[];
}

export interface OrderDetail{
    orderNumber:number;
    productId:number;
    productName:string;
    cuit:string;
    supplier:string;
    amount:number;
}