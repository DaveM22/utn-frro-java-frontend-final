import { Component, OnInit } from '@angular/core';
import { ProductoProveedor } from 'src/models/models';
import { Producto, OrderDetail } from 'src/models/models';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';
import { ProductoService } from 'src/services/productos/producto.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  dialogVisible!: boolean;
  products!:ProductoProveedor[];
  selectedProducts!:ProductoProveedor[];
  orderDetails:OrderDetail[] = [];

  constructor(private productoService:ProductoProveedorService){

  }


  ngOnInit(): void {
    this.productoService.getProductsSupplier().subscribe(x => this.products = x.payload as ProductoProveedor[]);
  }


  showDialog() {
    this.dialogVisible = true;
  }


  onSelectionChange(value: ProductoProveedor[]) {
    this.selectedProducts = value;
    this.selectedProducts.forEach((p)=>{
      let productoExist = this.orderDetails.some(x => x.productId === p.idProducto && x.cuit === p.cuit);
      if(!productoExist){
        this.orderDetails.push({orderNumber:0, productId: p.idProducto, cuit:p.cuit, productName:p.productName, supplier:p.nombreProveedor, amount:0});
      }
    })
    this.orderDetails = this.orderDetails.filter(x => this.selectedProducts.some(y => y.idProducto === x.productId && y.cuit === x.cuit))
    
  }
  



}
