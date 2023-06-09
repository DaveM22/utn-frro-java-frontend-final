import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Price, ProductSupplier } from 'src/models/models';
import { PriceService } from 'src/services/prices/price.service';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';
import { AddPriceAction, PriceListAction } from 'src/store/actions/price.action';
import { FormActivate } from 'src/store/actions/util.actions';
import { PriceState } from 'src/store/states/price.state';
import { UtilState } from 'src/store/states/util.state';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
  @Select(PriceState.getPrices) prices!:Observable<Price[]>
  @Select(UtilState.modalForm) modal!:Observable<boolean>
  productSupplier!:ProductSupplier;

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
    private fb:FormBuilder,
    private store:Store){

  }


  ngOnInit(): void {
    const state = history.state;
    this.productSupplier = state.supplier;
    this.store.dispatch(new PriceListAction(this.productSupplier.productId, this.productSupplier.personaId));
  }


  showPrices(supplier:ProductSupplier){

  }

  openDialog(){
    this.store.dispatch(new FormActivate(true));
  }

  saveForm(){
    let priceData = this.priceForm.value!;
    let price = {productId:this.productSupplier.productId, personaId:this.productSupplier.personaId, price: priceData!.price!, dateFrom:priceData!.date!};
    this.store.dispatch(new AddPriceAction(price));
  }

  closeModalForm(){
    this.store.dispatch(new FormActivate(false));
  }


}
