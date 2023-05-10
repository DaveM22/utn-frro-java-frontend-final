import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Prices, ProductSupplier } from 'src/models/models';
import { PriceService } from 'src/services/prices/price.service';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
  productSupplier!:ProductSupplier;
  prices!:Prices[];
  showListPrices!:boolean;
  priceDialog!:boolean;
  showProductSupplier!:boolean;
  priceForm = this.fb.group({
    id:[0, Validators.required],
    price:[0, Validators.required],
    date:[new Date,Validators.required]
  });
  constructor(
    private priceService:PriceService, 
    private route: ActivatedRoute,
    private fb:FormBuilder){

  }


  ngOnInit(): void {
    const state = history.state;
    this.productSupplier = state.supplier;
    this.prices = this.productSupplier.prices;
  }


  showPrices(supplier:ProductSupplier){

  }

  openDialog(){
    this.priceDialog = true;
  }

  saveForm(){
    let priceData = this.priceForm.value!;
    let price = {productId:this.productSupplier.productId, personaId:this.productSupplier.personaId, price: priceData!.price!, dateFrom:priceData!.date!};
    this.priceService.postPrice(price).subscribe();
  }


}
