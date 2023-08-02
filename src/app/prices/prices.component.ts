import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Price, ProductSupplier } from 'src/models/models';
import { PriceService } from 'src/services/prices/price.service';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';
import { AddPriceAction, DeletePriceAction, PriceListAction } from 'src/store/actions/price.action';
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
  price!:Price;
  showListPrices!:boolean;
  priceDialog!:boolean;
  showProductSupplier!:boolean;
  priceForm = this.fb.group({
    price:[0, Validators.required],
    date:[new Date,Validators.required]
  });
  constructor(
    private confirmationService:ConfirmationService,
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
    this.priceForm.reset();
    this.store.dispatch(new FormActivate(true));
  }

  saveForm(){
    let priceData = this.priceForm.value!;
    let price = {productId:this.productSupplier.productId, personaId:this.productSupplier.personaId, price: priceData!.price!, dateFrom:priceData!.date!};
    this.store.dispatch(new AddPriceAction(price));
  }

  deleteEntity(price:Price){
    this.price = price;
    this.confirmationService.confirm({
      message: '¿Estas seguro de borrar el precio?',
      header: 'Borrar precio',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar'
    });
  }

  closeModalForm(){
    this.store.dispatch(new FormActivate(false));
  }

  delete() {
    this.store.dispatch(new DeletePriceAction(this.price));
  }

  closeDialog(){
    this.confirmationService.close();
  }

}
