import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ProvinceStateModel } from "../model/province.modelstate";
import { MessageService } from "primeng/api";
import { Province, ResponseHttp } from "src/models/models";
import { ProvinceListAction } from "../actions/province.actions";
import { tap } from "rxjs";
import { ProvinceService } from "src/services/provincia/provincia.service";

@State<ProvinceStateModel>({
    name: "province",
    defaults: {
        items: [],
    },
})
@Injectable()
export class ProvinceState {

    constructor(private service: ProvinceService, private messageService: MessageService) {}

    @Selector()
    static getProvinces(state: ProvinceStateModel) {
        return state.items;
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
}