import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ProductStateModel } from "../model/product.modelstate";
import { ProductoService } from "src/services/productos/producto.service";
import { AddProductAction, DeleteProductAction, EditProductAction, ProductListAction } from "../actions/product.action,";
import { catchError, of, tap } from "rxjs";
import { Product, ResponseHttp } from "src/models/models";
import { DialogActivate, ErrorApi, FormActivate, Success } from "../actions/util.actions";

@State<ProductStateModel>({
    name: "product",
    defaults: {
        items: [],
        errors:{}
    },
})
@Injectable()
export class ProductState {
    constructor(private service: ProductoService) {}

    @Selector()
    static getProducts(state: ProductStateModel) {
        return state.items;
    }
    @Selector()
    static getError(state: ProductStateModel) {
        return state.errors;
    }


    @Action(ProductListAction)
    list(ctx: StateContext<ProductStateModel>) {
        return this.service.getProducts().pipe(
            tap((provinces: ResponseHttp) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    items: provinces.payload as Product[]
                })
            }),
            catchError(errors => {
                if(errors.status === 422){
                    ctx.patchState({errors: errors.error})
                    return of()
                }
                return of(ctx.dispatch(new ErrorApi("Error al consultar los productos", errors.error.errorMessage)));
            })
        );
    }

    @Action(AddProductAction)
    create(ctx: StateContext<ProductStateModel>, action:AddProductAction) {
        return this.service.postProducts(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                ctx.patchState({
                    items:[...state.items, res.payload as Product]
                })
                ctx.dispatch(new Success("Crear producto", res.message));
                ctx.dispatch(new FormActivate(false));
              }),
              catchError(errors => {
                if(errors.status === 422){
                    ctx.patchState({errors: errors.error})
                    return of()
                }
                return of(ctx.dispatch(new ErrorApi("Error al crear producto", errors.error.errorMessage)));
              })
        );
    }

    @Action(EditProductAction)
    edit(ctx: StateContext<ProductStateModel>, action:EditProductAction) {
        return this.service.putProducts(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const obj = res.payload as Product;
                const state = ctx.getState();
                const provinces = [...state.items];
                const provinceIndex = provinces.findIndex(item => item.id === obj.id);
                provinces[provinceIndex] = res.payload as Product;
                ctx.patchState({
                    items: provinces,
                });
   
                ctx.dispatch(new Success("Editar producto", res.message));
                ctx.dispatch(new FormActivate(false));
              }),
              catchError(errors => {
                if(errors.status === 422){
                    ctx.patchState({errors: errors.error})
                    return of()
                }
                return of(ctx.dispatch(new ErrorApi("Error al editar producto", errors.error.errorMessage)));
              })
        );
    }

    @Action(DeleteProductAction)
    delete(ctx: StateContext<ProductStateModel>, action:DeleteProductAction) {
        return this.service.deleteProduct(action.id).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                const filteredArray=state.items.filter(contents=>contents.id !== action.id);
  
                ctx.setState({
                    ...state,
                    items:filteredArray
                })
                ctx.dispatch(new DialogActivate(false));
                ctx.dispatch(new Success("Eliminar producto", res.message));
              }),
              catchError(error => {
                return of(ctx.dispatch(new ErrorApi("Error al eliminar producto", error.error.errorMessage)));
              })
        );
    }
}