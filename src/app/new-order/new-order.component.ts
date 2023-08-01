import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { MenuItem, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Order, ProductSupplier, ProductSupplierOrder } from 'src/models/models';
import { Product, OrderDetail } from 'src/models/models';
import { OrderService } from 'src/services/orders/order.service';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';
import { ProductoService } from 'src/services/productos/producto.service';
import { CustomerCompanyListAction } from 'src/store/actions/customer-company.action';
import { CustomerParticularListAction } from 'src/store/actions/customer-particular.action';
import { StepCreatePedido } from 'src/store/actions/util.actions';
import { UtilState } from 'src/store/states/util.state';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  @Select(UtilState.getStepCreateOrder) step$!: Observable<number>;
  dialogVisible!: boolean;
  products!:ProductSupplierOrder[];
  selectedProducts!:ProductSupplierOrder[];
  orderDetails:OrderDetail[] = [];
  items!:MenuItem[];
  activeIndex: number = 0;
  customer:any;
  order!:Order;
  customerTypes:any;
  isMobile!: boolean;

  step!:number;

  constructor(
    
    
    private productoService:ProductoProveedorService,
     private messageService:MessageService, 
     private store:Store){
    this.items = [
      {
          label: 'Seleccionar cliente'
      },
      {
          label: 'Seleccionar productos'
      },
      {
          label: 'Establecer cantidades para los productos'
      },
      {
        label:'Finalizar'
      }
    ];

    this.customerTypes = [
      { name: 'Particulares' },
      { name:'Empresas'}]
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 960; // Cambia el valor 768 según tu criterio de tamaño para considerar como "móvil"
  }

  onActiveIndexChange(event:any) {
    this.activeIndex = event;
  }

  ngOnInit(): void {
    this.step$.subscribe(x => this.step = x);
    this.store.dispatch(new StepCreatePedido(1));
    this.store.dispatch(new CustomerCompanyListAction());
    this.store.dispatch(new CustomerParticularListAction());
    this.productoService.getProductsSupplier().subscribe(x => this.products = x.payload as ProductSupplierOrder[]);
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






}
