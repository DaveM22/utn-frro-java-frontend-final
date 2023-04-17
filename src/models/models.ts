export interface ResponseHttp{
    errorMessage:string,
    message:string,
    payload:object
}


export interface Credentials {
    email:string,
    clave:string
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
    cuit:number,
    idProducto:number,
    cantidad:number,
    nombreProveedor:string
}