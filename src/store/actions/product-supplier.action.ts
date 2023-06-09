import { ProductSupplier } from "src/models/models";

export class ProductSupplierListAction {
    static readonly type = '[Product Supplier API] Get All';
}

export class ProductSupplierByProductAction {
    static readonly type = '[Product Supplier API] Get All by product';
    constructor(public productId: number){}
}

export class AddProductSupplierAction {
    static readonly type = "[Product Supplier API] Add";
    constructor(public payload: ProductSupplier) { }
}

