import { Order, OrderReport, OrderView, ProductSupplierOrder } from "src/models/models";

export interface OrderStateModel {
    orders:OrderView[];
    order: Order;
    orderReport:OrderReport | null;
    total:number;
    subtotal:number;
    customer:any;
    productosSeleccionados:ProductSupplierOrder[],
    errors:any;
  }