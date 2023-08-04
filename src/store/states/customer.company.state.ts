import { Injectable } from "@angular/core";
import { CustomerCompanyStateModel } from "../model/customer-company.modelstate";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PersonaService } from "src/services/persona/persona.service";
import { AddCustomerCompanyAction, CustomerCompanyListAction, DeleteCustomerCompanyAction, EditCustomerCompanyAction } from "../actions/customer-company.action";
import { CustomerCompany, ResponseHttp } from "src/models/models";
import { catchError, of, tap } from "rxjs";
import { DialogActivate, ErrorApi, FormActivate, Success } from "../actions/util.actions";

@State<CustomerCompanyStateModel>({
    name: "customer_company",
    defaults: {
        items: [],
        errors:{}
    },
})
@Injectable()
export class CustomerCompanyState {
    constructor(private service: PersonaService) {}

    @Selector()
    static getCustomerCompany(state: CustomerCompanyStateModel) {
        return state.items;
    }

    @Selector()
    static getErrors(state: CustomerCompanyStateModel){
        return state.errors;
    }


    @Action(CustomerCompanyListAction)
    list(ctx: StateContext<CustomerCompanyStateModel>) {
        return this.service.getCustomersCompany().pipe(
            tap((provinces: ResponseHttp) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    items: provinces.payload as CustomerCompany[]
                })
                catchError(error =>{
                    return of(ctx.dispatch(new ErrorApi("Error al consultar clientes empresariales", error.error.errorMessage)));
                })
            })
        );
    }

    @Action(AddCustomerCompanyAction)
    create(ctx: StateContext<CustomerCompanyStateModel>, action:AddCustomerCompanyAction) {
        return this.service.postCustomerCompany(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                ctx.patchState({
                    items:[...state.items, res.payload as CustomerCompany]
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

    @Action(EditCustomerCompanyAction)
    edit(ctx: StateContext<CustomerCompanyStateModel>, action:EditCustomerCompanyAction) {
        return this.service.putCustomerCompany(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const obj = res.payload as CustomerCompany;
                const state = ctx.getState();
                const provinces = [...state.items];
                const provinceIndex = provinces.findIndex(item => item.id === obj.id);
                provinces[provinceIndex] = res.payload as CustomerCompany;
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

    @Action(DeleteCustomerCompanyAction)
    delete(ctx: StateContext<CustomerCompanyStateModel>, action:DeleteCustomerCompanyAction) {
        return this.service.deleteCustomerCompany(action.id).pipe(
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