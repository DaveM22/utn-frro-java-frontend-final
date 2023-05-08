import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductSupplier, ProductSupplierOrder, Producto } from 'src/models/models';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  @Output() productsSelected$: EventEmitter<any> = new EventEmitter<any>();
  productsSupplier!:ProductSupplierOrder[]

  selectedProducts:ProductSupplierOrder[] = [];

  constructor(private service:ProductoProveedorService){}

  ngOnInit(): void {
      this.service.getProductsSupplier().subscribe(x => {
        this.productsSupplier = x.payload as ProductSupplierOrder[]
      })
  }

  confirmProducts(){
    this.productsSelected$.emit(this.selectedProducts);
  }

}
