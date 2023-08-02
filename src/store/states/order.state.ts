import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { OrderStateModel } from "../model/order.modelstate";
import { OrderService } from "src/services/orders/order.service";
import { ConfirmCustomerAction, CreateOrderDetailsAction, FinishOrderAction, GetOrderByIdForReportAction, ListOrderAction, OrderCustomerAction, OrderProductAction } from "../actions/order.action";
import { Order, OrderDetail, OrderReport, OrderView, ResponseHttp } from "src/models/models";
import { ErrorBusiness, StepCreatePedido, Success } from "../actions/util.actions";
import { of, tap, throwError } from "rxjs";
import { GetDiscountTodayAction } from "../actions/discount.action";
import * as moment from "moment";
import { Router } from "@angular/router";



@State<OrderStateModel>({
    name: "order",
    defaults: {
        orders:[],
        orderReport:null,
        order: {
            orderNumber: 0,
            date: 0,
            personaId: 0,
            details: []
        },
        total:0,
        subtotal:0,
        customer:null,
        productosSeleccionados:[]
    },
})




@Injectable()
export class OrderState {

    @Selector()
    static getOrderDetails(state: OrderStateModel) {
        return state.order.details;
    }

    @Selector()
    static getSubtotal(state: OrderStateModel){
        return state.subtotal;
    }

    @Selector()
    static productSelected(state: OrderStateModel){
        return state.productosSeleccionados;
    }

    @Selector()
    static getCustomer(state: OrderStateModel){
        return state.customer;
    }

    @Selector()
    static getOrders(state: OrderStateModel){
        return state.orders;
    }

    @Selector()
    static getOrderReport(state: OrderStateModel){
        return state.orderReport;
    }

    constructor(private service: OrderService, private router:Router) {}

    @Action(ListOrderAction)
    list(ctx: StateContext<OrderStateModel>) {
        return this.service.getOrders().pipe(
            tap((orders: ResponseHttp) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    orders: orders.payload as OrderView[]
                })
            })
        );
    }

    @Action(GetOrderByIdForReportAction)
    getOrderForReport(ctx: StateContext<OrderStateModel>, action: GetOrderByIdForReportAction) {
        return this.service.getOrderForReport(action.id).pipe(
            tap((response: ResponseHttp) => {
                const state = ctx.getState();
                ctx.patchState({
                    orderReport: response.payload as OrderReport
                })
            })
        );
    }

    @Action(OrderCustomerAction)
    assignCustomer(ctx: StateContext<OrderStateModel>, action: OrderCustomerAction) {
        let state = ctx.getState();
        state.order.personaId = action.cliente;
        ctx.patchState(state);
    }

    @Action(ConfirmCustomerAction)
    confirmCustomer(ctx: StateContext<OrderStateModel>, action: ConfirmCustomerAction){
        ctx.dispatch(new Success("Crear pedido", "Se ha asignado el cliente al pedido"));
        ctx.dispatch(new StepCreatePedido(2));
        ctx.patchState({
            customer: action.customer
        })
    }

    @Action(OrderProductAction)
    asingProduct(ctx: StateContext<OrderStateModel>, action: OrderProductAction) {
        try{

            if(action.product.some(x => x.amountOrder === 0)){
                throw new Error('Deben seleccionarse las cantidades para cada producto a seleccionar');
            }

            if(action.product.some(x => x.validityPrice === 0)){
                throw new Error('No se pueden seleccionar productos sin precios');
            }

            if(action.product.some(x => (x.amount - x.amountOrder!) < 0)){
                throw new Error('Algunos productos no poseen el stock suficiente para ser seleccionados');
            }
                
            ctx.patchState({
                productosSeleccionados:action.product
            });
            ctx.dispatch(new Success("Crea pedido","Se han confirmado los productos seleccionados"))
            return ctx.dispatch(new StepCreatePedido(3));
        }
        catch(e){
            return ctx.dispatch(new ErrorBusiness("Seleccionar productos", e as string))
        }

    }

    @Action(CreateOrderDetailsAction)
    createOrder(ctx:StateContext<OrderStateModel>, action: CreateOrderDetailsAction){
        try{
            let state = ctx.getState();
            let details:OrderDetail[] = []
 
            if(action.product.some(x => x.amountOrder === 0)){
                throw new Error('Deben seleccionarse las cantidades para cada producto a seleccionar');
            }

            if(action.product.some(x => x.validityPrice === 0)){
                throw new Error('No se pueden seleccionar productos sin precios');
            }
    
            action.product.forEach(x => {
                details.push({orderNumber:0, productId: x.productId, personaId: x.personaId, amount: x.amountOrder!, total: x.amountOrder! * x.validityPrice, productName:x.productName, supplierName: x.supplierName, price: x.validityPrice! });
            });
            state.order.details = details;
        
            state.order.details.forEach(x => state.subtotal += x.total!)
    
            
            ctx.patchState({
                order:state.order
            })
            ctx.dispatch(new Success("Crear pedido","Se han confirmado los productos seleccionados"))
            return ctx.dispatch(new StepCreatePedido(4));
        }
        catch(e){
            return ctx.dispatch(new ErrorBusiness("Seleccionar productos", e as string))
        } 
    }

    @Action(FinishOrderAction)
    finishOrder(ctx:StateContext<OrderStateModel>){
        let state = ctx.getState()
        state.order.personaId = state.customer.id;
        state.order.date = moment.now();
        return this.service.postOrder(state.order).pipe(
            tap((res: ResponseHttp) => {
                this.router.navigateByUrl("/pedidos")
                ctx.dispatch(new Success("Crear pedido", res.message));
                ctx.dispatch(new StepCreatePedido(1));
            })
        );
    }


}