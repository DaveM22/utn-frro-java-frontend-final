import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ProvinceStateModel } from "../model/province.modelstate";
import { MessageService } from "primeng/api";
import { Province, ResponseHttp } from "src/models/models";
import { AddProvince, DeleteProvince, EditProvince, ProvinceListAction } from "../actions/province.actions";
import { catchError, of, tap } from "rxjs";
import { ProvinceService } from "src/services/provincia/provincia.service";
import { DialogActivate, ErrorApi, FormActivate, Success } from "../actions/util.actions";

@State<ProvinceStateModel>({
    name: "province",
    defaults: {
        items: [],
        errors:{}
    },
})
@Injectable()
export class ProvinceState {

    constructor(private service: ProvinceService, private messageService: MessageService) {}

    @Selector()
    static getProvinces(state: ProvinceStateModel) {
        return state.items;
    }

    @Selector()
    static getErrors(state: ProvinceStateModel) {
        return state.errors;
    }


    @Action(ProvinceListAction)
    listLocations(ctx: StateContext<ProvinceStateModel>) {
        return this.service.getProvincias().pipe(
            tap((provinces: ResponseHttp) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    items: provinces.payload as Province[]
                })
            })
        );
    }

    @Action(AddProvince)
    create(ctx: StateContext<ProvinceStateModel>, action:AddProvince) {
        return this.service.postProvince(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                ctx.patchState({
                    items:[...state.items, res.payload as Province]
                })
                ctx.dispatch(new Success("Crear provincia", res.message));
                ctx.dispatch(new FormActivate(false));
              }),
              catchError(errors => {
                if(errors.status === 422){
                    ctx.patchState({errors: errors.error})
                    return of();
                }
                return of(ctx.dispatch(new ErrorApi("Error al crear provincia", errors.error.errorMessage)));
              })
        );
    }

    @Action(EditProvince)
    edit(ctx: StateContext<ProvinceStateModel>, action:EditProvince) {
        return this.service.putProvince(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const obj = res.payload as Province;
                const state = ctx.getState();
                const provinces = [...state.items];
                const provinceIndex = provinces.findIndex(item => item.provinceCode === obj.provinceCode);
                provinces[provinceIndex] = res.payload as Province;
                ctx.patchState({
                    items: provinces,
                });
   
                ctx.dispatch(new Success("Editar provincia", res.message));
                ctx.dispatch(new FormActivate(false));
              }),
              catchError(errors => {
                if(errors.status === 422){
                    ctx.patchState({errors: errors.error})
                    return of();
                }
                return of(ctx.dispatch(new ErrorApi("Error al editar provincia", errors.error.errorMessage)));
              })
        );
    }

    @Action(DeleteProvince)
    delete(ctx: StateContext<ProvinceStateModel>, action:DeleteProvince) {
        return this.service.deleteProvincia(action.id).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                const filteredArray=state.items.filter(contents=>contents.provinceCode!==action.id);
  
                ctx.setState({
                    ...state,
                    items:filteredArray
                })
                ctx.dispatch(new DialogActivate(false));
                ctx.dispatch(new Success("Eliminar provincia", res.message));
              }),
              catchError(error => {
                return of(ctx.dispatch(new ErrorApi("Error al eliminar provincia", error.error.errorMessage)));
              })
        );
    }
}