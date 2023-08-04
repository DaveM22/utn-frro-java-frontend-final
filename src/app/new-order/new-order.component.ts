import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { MenuItem, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CustomerCompany, CustomerParticular, Order, ProductSupplier, ProductSupplierOrder } from 'src/models/models';
import { Product, OrderDetail } from 'src/models/models';
import { OrderService } from 'src/services/orders/order.service';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';
import { ProductoService } from 'src/services/productos/producto.service';
import { CustomerCompanyListAction } from 'src/store/actions/customer-company.action';
import { CustomerParticularListAction } from 'src/store/actions/customer-particular.action';
import { ResetValueOrderAction } from 'src/store/actions/order.action';
import { ProductSupplierListAction } from 'src/store/actions/product-supplier.action';
import { StepCreatePedido } from 'src/store/actions/util.actions';
import { CustomerCompanyState } from 'src/store/states/customer.company.state';
import { CustomerParticularState } from 'src/store/states/customer.particular.state';
import { ProductSupplierState } from 'src/store/states/product-supplier.state,';
import { UtilState } from 'src/store/states/util.state';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit, OnDestroy {

  @Select(UtilState.getStepCreateOrder) step$!: Observable<number>;
  @Select(ProductSupplierState.getProductSupplier) productSuppliers$!: Observable<ProductSupplier[]>;
  @Select(CustomerCompanyState.getCustomerCompany) CustomerCompany$!: Observable<CustomerCompany[]>;
  @Select(CustomerParticularState.getCustomerParticular) customerParticular$!: Observable<CustomerParticular[]>;
  activeIndex: number = 0;
  customer:any;
  customerTypes:any;
  existCustomerParticular!:boolean;
  existCustomerCompany!:boolean;
  existProducts!:boolean;

  step!:number;

  constructor(
    
    
    private productoService:ProductoProveedorService,
     private messageService:MessageService, 
     private store:Store){

    this.customerTypes = [
      { name: 'Particulares' },
      { name:'Empresas'}]
  }
  ngOnDestroy(): void {
    this.store.dispatch(new ResetValueOrderAction());
  }

  ngOnInit(): void {
    this.customerParticular$.subscribe(x => {
      this.existCustomerParticular = x.length !== 0;
    })
    this.CustomerCompany$.subscribe(x => {
      this.existCustomerCompany = x.length !== 0;
    })
    this.productSuppliers$.subscribe(x => {
      this.existProducts = x.length !== 0;
    })
    this.step$.subscribe(x => this.step = x);
    this.store.dispatch(new StepCreatePedido(1));
    this.store.dispatch(new CustomerCompanyListAction());
    this.store.dispatch(new CustomerParticularListAction());
    this.store.dispatch(new ProductSupplierListAction());
  }




}
