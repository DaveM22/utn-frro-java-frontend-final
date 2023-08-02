import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { Observable, catchError, of } from 'rxjs';
import { ProductSupplier, ProductSupplierOrder, Product } from 'src/models/models';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';
import { OrderProductAction } from 'src/store/actions/order.action';
import { ProductSupplierListAction } from 'src/store/actions/product-supplier.action';
import { ErrorBusiness, StepCreatePedido } from 'src/store/actions/util.actions';
import { ProductSupplierState } from 'src/store/states/product-supplier.state,';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  providers: [MessageService]
})
export class ListProductsComponent implements OnInit {
  @Output() productsSelected$: EventEmitter<any> = new EventEmitter<any>();
  productsSupplier!:ProductSupplierOrder[]
  selectedProducts!:ProductSupplierOrder[];
  products!:ProductSupplierOrder[]

  
  constructor(private store:Store){}

  ngOnInit(): void {
    this.store.dispatch(new ProductSupplierListAction()).subscribe(x => {
      this.products = this.store.selectSnapshot(ProductSupplierState.getProductSupplier) as ProductSupplierOrder[]; 
    });
  }

  confirmProducts(){
    try{
      this.store.dispatch(new OrderProductAction(this.selectedProducts))
    }
    catch(error){
    }
    
  }

  getSelectedProductsLength(){
    if(!this.selectedProducts){
      return 0;
    }
    else{
      return this.selectedProducts.length;
    }
  }

  returnCustomers(){
    this.store.dispatch(new StepCreatePedido(1));
  }

  onRowSelect(event:any){
    event.data.habilitado = true;
  }

  onRowUnselect(event:any){
    event.data.habilitado = false;
  }


  onRowEditInit(product: ProductSupplierOrder, index:number) {
     this.products[index].amountOrder = product.amountOrder; 
  }

  onRowEditSave(product: ProductSupplierOrder, index:number) {
     if (product.amountOrder! > 0) {
      this.products[index].amountOrder = product.amountOrder;
    } 
  }

  onRowEditCancel(product: ProductSupplierOrder, index: number) {
    this.products[index].amountOrder = 0;

  }

}
