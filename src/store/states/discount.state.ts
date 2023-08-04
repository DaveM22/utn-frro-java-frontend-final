import { Injectable } from "@angular/core";
import { DiscountStateModel } from "../model/discount.modelstate";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DiscountService } from "src/services/discount/discount.service";
import { AddDiscountAction, DeleteDiscount, DiscountListAction, GetDiscountTodayAction } from "../actions/discount.action";
import { BlockTable, DialogActivate, ErrorApi, FormActivate, Success } from "../actions/util.actions";
import { Discount, Price, ResponseHttp } from "src/models/models";
import { catchError, of, tap } from "rxjs";

@State<DiscountStateModel>({
    name: "discount",
    defaults: {
        items: [],
        discountToday:[],
        errors:{}
    },
})
@Injectable()
export class DiscountState {
    constructor(private service: DiscountService) {}

    @Selector()
    static getDiscounts(state: DiscountStateModel) {
        return state.items;
    }

    @Selector()
    static getDiscountToday(state: DiscountStateModel) {
        return state.discountToday;
    }

    @Selector()
    static getErrors(state: DiscountStateModel) {
        return state.errors;
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
            }),
            catchError(errors => {
                return of(ctx.dispatch(new ErrorApi("Error al consultar los descuentos", errors.error.errorMessage))) 
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
              catchError(errors => {
                if(errors.status === 422){
                    ctx.patchState({errors: errors.error})
                    return of()
                }
                return of(ctx.dispatch(new ErrorApi("Error al crear descuento", errors.error.errorMessage)));
              })
        )
    }

    @Action(GetDiscountTodayAction)
    getDiscountToday(ctx: StateContext<DiscountStateModel>) {
        return this.service.getDiscountsToday().pipe(
            tap((response: ResponseHttp) => {
                const state = ctx.getState();
                ctx.patchState({
                    discountToday: response.payload as Discount[]
                })
                catchError(errors => {
                    return of(ctx.dispatch(new ErrorApi("Error al consultar los descuentos vigentes", errors.error.errorMessage))) 
                })
            })
        );
    }

    @Action(DeleteDiscount)
    deleteDiscount(ctx: StateContext<DiscountStateModel>, action:DeleteDiscount) {
        return this.service.delete(action.discount).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                const filteredArray=state.items.filter(contents => contents.validityDate !== action.discount.validityDate || contents.amountPrice !== action.discount.amountPrice);
  
                ctx.patchState({
                    items:filteredArray
                })
                ctx.dispatch(new Success("Borrar precio", res.message));
                return ctx.dispatch(new DialogActivate(false));
            }),
            catchError(errors => {
                return of(ctx.dispatch(new ErrorApi("Error al borrar el descuento", errors.error.errorMessage))) 
            })
        );
    }
}