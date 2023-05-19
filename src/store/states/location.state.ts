import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LocationStateModel } from "../model/location.modelstate";
import { Injectable } from "@angular/core";
import { LocationService } from "src/services/localidad/localidad.service";
import { LocationAdd, LocationDelete, LocationError, LocationListAction, LocationSuccess } from "../actions/location.actions";
import { catchError, tap } from "rxjs";
import { Location, ResponseHttp } from "src/models/models";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { FormActivate } from "../actions/util.actions";


@State<LocationStateModel>({
    name: "location",
    defaults: {
      items: [],
    },
  })
  @Injectable()
  export class LocationState {

    constructor(private service:LocationService, private messageService:MessageService, private dialogService:DialogService){

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

        @Action(LocationAdd)
        addLocation(ctx: StateContext<LocationStateModel>, { payload }: any){
          return this.service.postLocation(payload).subscribe({
            next:(res) => {              
              const state=ctx.getState();
              ctx.patchState({
                  items:[...state.items, res.payload as Location]
              })
              ctx.dispatch(new LocationSuccess(res.message));
              ctx.dispatch(new FormActivate(false));
            },
            error:(err) => {
              ctx.dispatch(new LocationError(err.error.errorMessage));
            }
          })      
        }

        @Action(LocationDelete)
        deleteLocation(ctx: StateContext<LocationStateModel>, action:LocationDelete){
          return this.service.deleteLocation(action.id).subscribe({
            next:(res) => {
              const state=ctx.getState();
              const filteredArray=state.items.filter(contents=>contents.postalCode!==action.id);

              ctx.setState({
                  ...state,
                  items:filteredArray
              })

              ctx.dispatch(new LocationSuccess(res.message));
            },
            error:(err) => {
              ctx.dispatch(new LocationError(err.error.errorMessage));
            }
          })   
        }

        @Action(LocationSuccess)
        successLocation(ctx: StateContext<LocationStateModel>, action:LocationSuccess){
          this.messageService.add({ severity: 'success', summary: 'Crear localidad', detail: action.message, life: 3000 });
        }

        @Action(LocationError)
        errorLocation(message:any){
          this.messageService.add({ severity: 'error', summary: 'Error al crear localidad', detail: message, life: 3000 });
        }

  }


