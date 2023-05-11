import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductSupplier, ProductSupplierOrder, Product } from 'src/models/models';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {
  @Output() productsSelected$: EventEmitter<any> = new EventEmitter<any>();
  @Input() productsSupplier!:ProductSupplierOrder[]
  @Input() selectedProducts!:ProductSupplierOrder[];

  

  constructor(){}


  confirmProducts(){
    this.productsSelected$.emit(this.selectedProducts);
  }

  getSelectedProductsLength(){
    if(!this.selectedProducts){
      return 0;
    }
    else{
      return this.selectedProducts.length;
    }
  }

}
