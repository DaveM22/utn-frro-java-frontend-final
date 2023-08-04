import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PriceStateModel } from "../model/price.modelstate";
import { Injectable } from "@angular/core";
import { PriceService } from "src/services/prices/price.service";
import { AddPriceAction, DeletePriceAction, PriceListAction } from "../actions/price.action";
import { catchError, of, tap } from "rxjs";
import { Price, ResponseHttp } from "src/models/models";
import { DialogActivate, ErrorApi, FormActivate, Success } from "../actions/util.actions";

@State<PriceStateModel>({
    name: "price",
    defaults: {
        items: [],
        errors:{}
    },
})
@Injectable()
export class PriceState {
    constructor(private service: PriceService) {}

    @Selector()
    static getPrices(state: PriceStateModel) {
        return state.items;
    }

    @Selector()
    static getErrors(state: PriceStateModel) {
        return state.errors;
    }


    @Action(PriceListAction)
    list(ctx: StateContext<PriceStateModel>, action:PriceListAction) {
        return this.service.getPrices(action.productId, action.supplierId).pipe(
            tap((provinces: ResponseHttp) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    items: provinces.payload as Price[]
                }),
                catchError(errors => {
  
                    return of(ctx.dispatch(new ErrorApi("Error al consultar precios", errors.error.errorMessage)));
                })
            })
        );
    }

    @Action(AddPriceAction)
    create(ctx: StateContext<PriceStateModel>, action:AddPriceAction) {
        return this.service.postPrice(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                ctx.patchState({
                    items:[...state.items, res.payload as Price]
                })
                ctx.dispatch(new Success("Nueva vigencia de precio", res.message));
                ctx.dispatch(new FormActivate(false));
              }),
              catchError(errors => {
                if(errors.status === 422){
                    ctx.patchState({errors: errors.error})
                    return of()
                }
                return of(ctx.dispatch(new ErrorApi("Error al asignar precio", errors.error.errorMessage)));
              })
        );
    }

    @Action(DeletePriceAction)
    deletePrice(ctx: StateContext<PriceStateModel>, action:DeletePriceAction) {
        return this.service.deletePrice(action.price).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                const filteredArray=state.items.filter(contents => contents.dateFrom !== action.price.dateFrom || contents.personaId !== action.price.personaId || contents.productId !== action.price.productId);
  
                ctx.patchState({
                    items:filteredArray
                })
                ctx.dispatch(new Success("Borrar precio", res.message));
                return ctx.dispatch(new DialogActivate(false));
              }),
              catchError(error => {
                return of(ctx.dispatch(new ErrorApi("Error al borrar precio", error.error.errorMessage)));
              })
        );
    }
}