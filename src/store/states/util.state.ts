import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UtilStateModel } from "../model/util.modelstate";
import { FormActivate } from "../actions/util.actions";

@State<UtilStateModel>({
    name: "util",
    defaults: {
        modalForm:false
    },
})
@Injectable()
export class UtilState {

    @Selector()
    static modalForm(state: UtilStateModel) {
        return state.modalForm;
    }


    @Action(FormActivate)
    listLocations(ctx: StateContext<UtilStateModel>, action: FormActivate) {
        ctx.setState({
            modalForm: action.visible
        })
    }
}