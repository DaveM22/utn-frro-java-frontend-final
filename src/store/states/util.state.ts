import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UtilStateModel } from "../model/util.modelstate";
import { BlockTable, DialogActivate, ErrorApi, ErrorBusiness, FormActivate, ModalStockAction, StepCreatePedido, Success } from "../actions/util.actions";
import { ConfirmationService, MessageService } from "primeng/api";

@State<UtilStateModel>({
    name: "util",
    defaults: {
        modalForm:false,
        dialog:false,
        blockTable:true,
        paso:1,
        modalStock:false
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

    @Selector()
    static getStepCreateOrder(state:UtilStateModel){
        return state.paso;
    }

    @Selector()
    static getModalAddStock(state: UtilStateModel){
        return state.modalStock;
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

    @Action(ModalStockAction)
    modalAddSTock(ctx: StateContext<UtilStateModel>, action: ModalStockAction){
        ctx.patchState({
            modalStock: action.visible
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

    @Action(ErrorBusiness)
    errorBusiness(ctx: StateContext<UtilStateModel>, action:ErrorBusiness){
        this.messageService.add({ severity: 'error', summary: action.title, detail: action.message, life: 3000 });
    }

    @Action(BlockTable)
    blockTable(ctx: StateContext<UtilStateModel>, action:BlockTable){
        ctx.patchState({
            blockTable: action.block
        });
    }

    @Action(StepCreatePedido)
    stepCreate(citx:StateContext<UtilStateModel>, action:StepCreatePedido){
        citx.patchState({
            paso:action.paso
        })
    }
}