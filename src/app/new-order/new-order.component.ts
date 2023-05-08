import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Order, ProductSupplier, ProductSupplierOrder } from 'src/models/models';
import { Producto, OrderDetail } from 'src/models/models';
import { OrderService } from 'src/services/orders/order.service';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';
import { ProductoService } from 'src/services/productos/producto.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  dialogVisible!: boolean;
  products!:ProductSupplierOrder[];
  selectedProducts!:ProductSupplierOrder[];
  orderDetails:OrderDetail[] = [];
  items!:MenuItem[];
  activeIndex: number = 0;
  customer:any;
  order!:Order;

  constructor(private productoService:ProductoProveedorService, private orderService:OrderService){
    this.items = [
      {
          label: 'Cliente'
      },
      {
          label: 'Productos'
      },
      {
          label: 'Cantidades'
      },
      {
        label:'Finalizar'
      }
    ];
  }

  onActiveIndexChange(event:any) {
    this.activeIndex = event;
  }


  ngOnInit(): void {
    this.productoService.getProductsSupplier().subscribe(x => this.products = x.payload as ProductSupplierOrder[]);
  }


  showDialog() {
    this.dialogVisible = true;
  }

  setIndex($event:any){
    this.activeIndex = $event.nextIndex;
    this.customer = $event.customer;
  }

  confirmProductSelected(event:ProductSupplierOrder[]){
    this.selectedProducts = event;
    this.activeIndex = 2;
  }


  confirmProductAmount($event:any){
    this.selectedProducts = $event as ProductSupplierOrder[];
    this.activeIndex = 3;
  }

  finishOrder($event:any){
    this.selectedProducts = $event as ProductSupplierOrder[];
    this.orderDetails = [];
    this.selectedProducts.forEach(x => {
      let obj = {orderNumber:0, productId:x.productId, personaId:x.personaId, total: x.total, amount: x.amountOrder  };
      this.orderDetails.push(obj);
    })
    this.order = {date:Date.now(), orderNumber:0, personaId:this.customer.id, details: this.orderDetails };
    this.orderService.postOrder(this.order).subscribe();
  }


}
