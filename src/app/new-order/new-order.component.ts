import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Order, ProductSupplier, ProductSupplierOrder } from 'src/models/models';
import { Product, OrderDetail } from 'src/models/models';
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

  constructor(private productoService:ProductoProveedorService, private orderService:OrderService, private messageService:MessageService, private router:Router, private service:ProductoProveedorService){
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
    this.service.getProductsSupplier().subscribe(x => {
      this.products = x.payload as ProductSupplierOrder[]
    })
  }


  showDialog() {
    this.dialogVisible = true;
  }

  setIndex($event:any){
    this.activeIndex = $event.nextIndex;
    this.customer = $event.customer;
    this.messageService.add({ severity: 'success', summary: 'Selección de cliente', detail: "Cliente seleccionado", life: 3000 });
  }

  confirmProductSelected(event:ProductSupplierOrder[]){
    this.activeIndex = 2;
    this.messageService.add({ severity: 'success', summary: 'Selección de productos', detail: "Productos seleccionados", life: 3000 });
    this.selectedProducts = event;
  }


  confirmProductAmount($event:any){
    this.activeIndex = 3;
    this.selectedProducts = $event;
    this.messageService.add({ severity: 'success', summary: 'Cantidades de productos', detail: "Se han registrado las cantidades para cada producto", life: 3000 });
  }

  finishOrder($event:any){
    this.orderDetails = [];
    this.selectedProducts = $event;
    this.selectedProducts.forEach(x => {
      let obj = {orderNumber:0, productId:x.productId!, personaId:x.personaId!, total: x.total!, amount: x.amountOrder!  };
      this.orderDetails.push(obj);
    })
    this.order = {date:Date.now(), orderNumber:0, personaId:this.customer.id, details: this.orderDetails };
    this.orderService.postOrder(this.order).subscribe(
      {
        next: (res) => {
          this.router.navigateByUrl("/pedidos")
          this.messageService.add({ severity: 'success', summary: 'Creación de pedido', detail: res.message, life: 3000 });
        },
        error:(err) => {
          this.messageService.add({ severity: 'error', summary: 'Error al crear pedido', detail: err.error.errorMessage, life: 3000 });
        }
    });
  }


}
