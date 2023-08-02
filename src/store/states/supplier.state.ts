import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SupplierStateModel } from "../model/supplier.modelstate";
import { Injectable } from "@angular/core";
import { PersonaService } from "src/services/persona/persona.service";
import { MessageService } from "primeng/api";
import { ResponseHttp, Supplier } from "src/models/models";
import { AddSupplierAction, DeleteSupplierAction, EditSupplierAction, SupplierListAction as SupplierListAction } from "../actions/supplier.action";
import { catchError, tap, of } from "rxjs";
import { BlockUIAction, DialogActivate, ErrorApi, FormActivate, Success } from "../actions/util.actions";
import { BlockUI } from "primeng/blockui";

@State<SupplierStateModel>({
    name: "supplier",
    defaults: {
      items: [],
    },
  })
  @Injectable()
  export class SupplierState {
    constructor(private service: PersonaService) {}

    @Selector()
    static getSuppliers(state: SupplierStateModel) {
        return state.items;
    }


    @Action(SupplierListAction)
    list(ctx: StateContext<SupplierStateModel>) {
        return this.service.getSuppliers().pipe(
            tap((provinces: ResponseHttp) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    items: provinces.payload as Supplier[]
                })
            })
        );
    }

    @Action(AddSupplierAction)
    create(ctx: StateContext<SupplierStateModel>, action:AddSupplierAction) {
        return this.service.postSupplier(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                ctx.patchState({
                    items:[...state.items, res.payload as Supplier]
                })
                ctx.dispatch(new Success("Crear proveedor", res.message));
                ctx.dispatch(new FormActivate(false));
              }),
              catchError(error => {
                
                return of(ctx.dispatch(new ErrorApi("Error al crear proveedor", error.error.errorMessage)));
              })
        );
    }

    @Action(EditSupplierAction)
    edit(ctx: StateContext<SupplierStateModel>, action:EditSupplierAction) {
        return this.service.putSupplier(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const obj = res.payload as Supplier;
                const state = ctx.getState();
                const provinces = [...state.items];
                const provinceIndex = provinces.findIndex(item => item.id === obj.id);
                provinces[provinceIndex] = res.payload as Supplier;
                ctx.patchState({
                    items: provinces,
                });
   
                ctx.dispatch(new Success("Editar proveedor", res.message));
                ctx.dispatch(new FormActivate(false));
              }),
              catchError(error => {
                return of(ctx.dispatch(new ErrorApi("Error al editar proveedor", error.error.errorMessage)));
              })
        );
    }

    @Action(DeleteSupplierAction)
    delete(ctx: StateContext<SupplierStateModel>, action:DeleteSupplierAction) {
        ctx.dispatch(new BlockUIAction(true));
        return this.service.deleteSupplier(action.id).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                const filteredArray=state.items.filter(contents=>contents.id !== action.id);
  
                ctx.setState({
                    ...state,
                    items:filteredArray
                })
                ctx.dispatch(new DialogActivate(false));
                ctx.dispatch(new BlockUIAction(false));
                ctx.dispatch(new Success("Eliminar proveedor", res.message));
              }),
              catchError(error => {
                ctx.dispatch(new BlockUIAction(false));
                return of(ctx.dispatch(new ErrorApi("Error al eliminar proveedor", error.error.errorMessage)));
              })
        );
    }
  }