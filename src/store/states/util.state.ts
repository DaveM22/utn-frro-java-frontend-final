import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UtilStateModel } from "../model/util.modelstate";
import { BlockTable, DialogActivate, ErrorApi, FormActivate, Success } from "../actions/util.actions";
import { ConfirmationService, MessageService } from "primeng/api";

@State<UtilStateModel>({
    name: "util",
    defaults: {
        modalForm:false,
        dialog:false,
        blockTable:true
    },
})
@Injectable()
export class UtilState {

    constructor(private messageService:MessageService, private confirmationService:ConfirmationService){}

    @Selector()
    static modalForm(state: UtilStateModel){
        return state.modalForm;
    }

    @Selector()
    static dialog(state: UtilStateModel){
        return state.dialog;
    }

    @Selector()
    static blockTable(state: UtilStateModel){
        return state.blockTable;
    }
    
    @Action(FormActivate)
    modalForm(ctx: StateContext<UtilStateModel>, action: FormActivate) {
        ctx.patchState({
            modalForm: action.visible
        })
    }

    @Action(DialogActivate)
    dialog(ctx: StateContext<UtilStateModel>, action: DialogActivate){
        if(action.visible === false){
            this.confirmationService.close();
        }
        ctx.patchState({
            dialog: action.visible
        })
    }

    @Action(Success)
    success(ctx: StateContext<UtilStateModel>, action:Success){
        this.messageService.add({ severity: 'success', summary: action.title, detail: action.message, life: 3000 });
    }

    @Action(ErrorApi)
    error(ctx: StateContext<UtilStateModel>, action:ErrorApi){
        this.messageService.add({ severity: 'error', summary: action.title, detail: action.message, life: 3000 });
    }

    @Action(BlockTable)
    blockTable(ctx: StateContext<UtilStateModel>, action:BlockTable){
        ctx.patchState({
            blockTable: action.block
        });
    }
}