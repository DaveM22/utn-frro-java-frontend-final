import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LocationStateModel } from "../model/location.modelstate";
import { Injectable } from "@angular/core";
import { LocationService } from "src/services/localidad/localidad.service";
import { AddLocationAction, DeleteLocationAction, EditLocationAction, LocationListAction } from "../actions/location.actions";
import { catchError, of, tap } from "rxjs";
import { Location, ResponseHttp } from "src/models/models";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { DialogActivate, ErrorApi, FormActivate, Success } from "../actions/util.actions";


@State<LocationStateModel>({
    name: "location",
    defaults: {
      items: [],
    },
  })
  @Injectable()
  export class LocationState {

    constructor(private service:LocationService, private messageService:MessageService){

    }

    @Selector()
    static getLocations(state: LocationStateModel) {
      return state.items;
    }


        @Action(LocationListAction)
        listLocations(ctx: StateContext<LocationStateModel>) {
            return this.service.getLocation().pipe(
                tap((locations: ResponseHttp) => {
                    const state = ctx.getState();

                    ctx.setState({
                        ...state,
                        items: locations.payload as Location[]
                    })
                })
            );
          }

        @Action(AddLocationAction)
        addLocation(ctx: StateContext<LocationStateModel>, { payload }: any){
          return this.service.postLocation(payload).pipe(
            tap((res: ResponseHttp) => {
              const state=ctx.getState();
              ctx.patchState({
                  items:[...state.items, res.payload as Location]
              })
              ctx.dispatch(new Success("Agregar localidad",res.message));
              ctx.dispatch(new FormActivate(false));
            }),
            catchError(error => {
              return of(ctx.dispatch(new ErrorApi("Error al agregar localidad", error.error.errorMessage)));
            })
          )
        }

        @Action(EditLocationAction)
        editLocation(ctx: StateContext<LocationStateModel>, action:EditLocationAction){
          return this.service.putLocation(action.payload).pipe(
            tap((res: ResponseHttp) => {

              const obj = res.payload as Location;
              const state = ctx.getState();
              const locations = [...state.items];
              const locationIndex = locations.findIndex(item => item.postalCode === obj.postalCode);
              locations[locationIndex] = res.payload as Location;
              ctx.patchState({
                items: locations,
            });
              ctx.dispatch(new Success("Editar localidad",res.message));
              ctx.dispatch(new FormActivate(false));
            }),
            catchError(error => {
              return of(ctx.dispatch(new ErrorApi("Error al editar localidad", error.error.errorMessage)));
            })
          )
        }



        @Action(DeleteLocationAction)
        deleteLocation(ctx: StateContext<LocationStateModel>, action:DeleteLocationAction){
          return this.service.deleteLocation(action.id).pipe(
            tap((res: ResponseHttp) => {
              const state=ctx.getState();
              const filteredArray=state.items.filter(contents=>contents.postalCode!==action.id);
      
              ctx.setState({
                  ...state,
                  items:filteredArray
              })
              ctx.dispatch(new DialogActivate(false));
              ctx.dispatch(new Success("Eliminar localidad",res.message));
            }),
            catchError(error => {
              return of(ctx.dispatch(new ErrorApi("Error al eliminar localidad", error.error.errorMessage)));
            })
          )}



  }


