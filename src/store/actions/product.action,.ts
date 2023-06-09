import { Product } from "src/models/models";

export class ProductListAction {
    static readonly type = '[Product API] Get All';
}

export class AddProductAction {
    static readonly type = "[Product API] Add";
    constructor(public payload: Product) { }
}

export class EditProductAction {
    static readonly type = "[Product API] Edit";
    constructor(public payload: Product) { }
}

export class DeleteProductAction {
    static readonly type = "[Product API] Delete";
    constructor(public id: number) { }
}