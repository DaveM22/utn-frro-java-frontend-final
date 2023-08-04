import { Injectable } from "@angular/core";
import { CustomerParticularStateModel } from "../model/customer-particular.modelstate";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PersonaService } from "src/services/persona/persona.service";
import { CustomerParticular, ResponseHttp } from "src/models/models";
import { catchError, of, tap } from "rxjs";
import { AddCustomerParticularAction, CustomerParticularListAction, DeleteCustomerParticularAction, EditCustomerParticularAction } from "../actions/customer-particular.action";
import { DialogActivate, ErrorApi, FormActivate, Success } from "../actions/util.actions";

@State<CustomerParticularStateModel>({
    name: "customer_particular",
    defaults: {
        items: [],
        errors:{}
    },
})
@Injectable()
export class CustomerParticularState {
    constructor(private service: PersonaService) {}

    @Selector()
    static getCustomerParticular(state: CustomerParticularStateModel) {
        return state.items;
    }

    @Selector()
    static getErrors(state: CustomerParticularStateModel){
        return state.errors;
    }

    @Action(CustomerParticularListAction)
    list(ctx: StateContext<CustomerParticularStateModel>) {
        return this.service.getCustomerParticulars().pipe(
            tap((provinces: ResponseHttp) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    items: provinces.payload as CustomerParticular[]
                })
            }),
            catchError(error =>{
                return of(ctx.dispatch(new ErrorApi("Error al consultar clientes particulares", error.error.errorMessage)));
            })
        );
    }

    @Action(AddCustomerParticularAction)
    create(ctx: StateContext<CustomerParticularStateModel>, action:AddCustomerParticularAction) {
        return this.service.postCustomerParticular(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                ctx.patchState({
                    items:[...state.items, res.payload as CustomerParticular]
                })
                ctx.dispatch(new Success("Crear cliente", res.message));
                ctx.dispatch(new FormActivate(false));
              }),
              catchError(errors => {
                if(errors.status === 422){
                    ctx.patchState({errors: errors.error})
                    return of()
                }
                return of(ctx.dispatch(new ErrorApi("Error al crear cliente", errors.error.errorMessage)));
              })
        );
    }

    @Action(EditCustomerParticularAction)
    edit(ctx: StateContext<CustomerParticularStateModel>, action:EditCustomerParticularAction) {
        return this.service.putCustomerParticular(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const obj = res.payload as CustomerParticular;
                const state = ctx.getState();
                const provinces = [...state.items];
                const provinceIndex = provinces.findIndex(item => item.id === obj.id);
                provinces[provinceIndex] = res.payload as CustomerParticular;
                ctx.patchState({
                    items: provinces,
                });
   
                ctx.dispatch(new Success("Editar cliente", res.message));
                ctx.dispatch(new FormActivate(false));
              }),
              catchError(errors => {
                if(errors.status === 422){
                    ctx.patchState({errors: errors.error})
                    return of()
                }
                return of(ctx.dispatch(new ErrorApi("Error al editar cliente", errors.error.errorMessage)));
              })
        );
    }

    @Action(DeleteCustomerParticularAction)
    delete(ctx: StateContext<CustomerParticularStateModel>, action:DeleteCustomerParticularAction) {
        return this.service.deleteCustomerParticular(action.id).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                const filteredArray=state.items.filter(contents=>contents.id !== action.id);
  
                ctx.setState({
                    ...state,
                    items:filteredArray
                })
                ctx.dispatch(new DialogActivate(false));
                ctx.dispatch(new Success("Eliminar cliente", res.message));
              }),
              catchError(error => {

                return of(ctx.dispatch(new ErrorApi("Error al eliminar cliente", error.error.errorMessage)));
              })
        );
    }
}