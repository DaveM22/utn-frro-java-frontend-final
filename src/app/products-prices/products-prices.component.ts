import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prices, ProductSupplier } from 'src/models/models';
import { PriceService } from 'src/services/prices/price.service';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';

@Component({
  selector: 'app-products-prices',
  templateUrl: './products-prices.component.html',
  styleUrls: ['./products-prices.component.scss']
})
export class ProductsPricesComponent implements OnInit {
  productSuppliers:ProductSupplier[] = []
  prices!:Prices[];
  showListPrices!:boolean;
  priceDialog!:boolean;
  showProductSupplier!:boolean;
  constructor(private router:Router,private productSupplierService:ProductoProveedorService, private priceService:PriceService){

  }


  ngOnInit(): void {
    this.showListPrices = false;
    this.showProductSupplier = true;
    this.productSupplierService.getProductsSupplier().subscribe(x => {
      this.productSuppliers = x.payload as ProductSupplier[];
    })
  }


  showPrices(supplier:ProductSupplier){
    this.router.navigate(['/precios-productos', supplier.productId, supplier.personaId], { state: { supplier } });
  }
}