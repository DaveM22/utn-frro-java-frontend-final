import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PriceStateModel } from "../model/price.modelstate";
import { Injectable } from "@angular/core";
import { PriceService } from "src/services/prices/price.service";
import { AddPriceAction, PriceListAction } from "../actions/price.action";
import { catchError, of, tap } from "rxjs";
import { Price, ResponseHttp } from "src/models/models";
import { ErrorApi, FormActivate, Success } from "../actions/util.actions";

@State<PriceStateModel>({
    name: "price",
    defaults: {
        items: [],
    },
})
@Injectable()
export class PriceState {
    constructor(private service: PriceService) {}

    @Selector()
    static getPrices(state: PriceStateModel) {
        return state.items;
    }


    @Action(PriceListAction)
    list(ctx: StateContext<PriceStateModel>, action:PriceListAction) {
        return this.service.getPrices(action.productId, action.supplierId).pipe(
            tap((provinces: ResponseHttp) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    items: provinces.payload as Price[]
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
              catchError(error => {
                return of(ctx.dispatch(new ErrorApi("Error al crear precio", error.error.errorMessage)));
              })
        );
    }
}