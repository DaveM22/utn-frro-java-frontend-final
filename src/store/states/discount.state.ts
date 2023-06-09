import { Injectable } from "@angular/core";
import { DiscountStateModel } from "../model/discount.modelstate";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DiscountService } from "src/services/discount/discount.service";
import { AddDiscountAction, DiscountListAction } from "../actions/discount.action";
import { BlockTable, ErrorApi, FormActivate, Success } from "../actions/util.actions";
import { Discount, Price, ResponseHttp } from "src/models/models";
import { catchError, of, tap } from "rxjs";

@State<DiscountStateModel>({
    name: "discount",
    defaults: {
        items: [],
    },
})
@Injectable()
export class DiscountState {
    constructor(private service: DiscountService) {}

    @Selector()
    static getDiscounts(state: DiscountStateModel) {
        return state.items;
    }

    @Action(DiscountListAction)
    list(ctx: StateContext<DiscountStateModel>) {
        ctx.dispatch(new BlockTable(true));
        return this.service.getAll().pipe(
            tap((response: ResponseHttp) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    items: response.payload as Discount[]
                })
                ctx.dispatch(new BlockTable(false));
            })
        );
    }

    @Action(AddDiscountAction)
    create(ctx: StateContext<DiscountStateModel>, action:AddDiscountAction){
        return this.service.post(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                ctx.patchState({
                    items:[...state.items, res.payload as Discount]
                })
                ctx.dispatch(new Success("Crear descuento", res.message));
                ctx.dispatch(new FormActivate(false));
              }),
              catchError(error => {
                return of(ctx.dispatch(new ErrorApi("Error al crear descuento", error.error.errorMessage)));
              })
        )
    }
}