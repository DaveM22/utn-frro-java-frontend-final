import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ProductSupplierStateModel } from "../model/product-supplier.modelstate";
import { Injectable } from "@angular/core";
import { ProductoProveedorService } from "src/services/producto-proveedor/producto-proveedor.service";
import { catchError, tap, of } from "rxjs";
import { ProductSupplier, ResponseHttp } from "src/models/models";
import { AddProductSupplierAction, ProductSupplierByProductAction, ProductSupplierListAction } from "../actions/product-supplier.action";
import { ErrorApi, FormActivate, Success } from "../actions/util.actions";

@State<ProductSupplierStateModel>({
    name: "product_supplier",
    defaults: {
        items: [],
        title:''
    },
})
@Injectable()
export class ProductSupplierState {
    constructor(private service: ProductoProveedorService) {}

    @Selector()
    static getProductSupplier(state: ProductSupplierStateModel) {
        return state.items;
    }

    @Selector()
    static getProductTitle(state: ProductSupplierStateModel){
        return state.title;
    }

    @Action(ProductSupplierListAction)
    list(ctx: StateContext<ProductSupplierStateModel>) {
        return this.service.getProductsSupplier().pipe(
            tap((response: ResponseHttp) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    items: response.payload as ProductSupplier[]
                })
            })
        );
    }

    @Action(ProductSupplierByProductAction)
    listByProduct(ctx: StateContext<ProductSupplierStateModel>, action: ProductSupplierByProductAction){
        return this.service.getAll(action.productId).pipe(
            tap((response:ResponseHttp) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    items: response.payload as ProductSupplier[],
                    title:response.message
                });
            }
        ));
    }

    @Action(AddProductSupplierAction)
    add(ctx: StateContext<ProductSupplierStateModel>, action: AddProductSupplierAction){
        return this.service.postProductSupplier(action.payload).pipe(tap(
            (res: ResponseHttp) => {
                const state=ctx.getState();
                ctx.patchState({
                    items:[...state.items, res.payload as ProductSupplier]
                })
                ctx.dispatch(new Success("Asignar proveedor", res.message));
                ctx.dispatch(new FormActivate(false));
            }
        ),
        catchError(error => {
            return of(ctx.dispatch(new ErrorApi("Error al asignar proveedor", error.error.errorMessage)));
        })
        )
    }
}