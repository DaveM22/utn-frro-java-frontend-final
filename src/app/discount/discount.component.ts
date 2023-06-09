import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Discount } from 'src/models/models';
import { AddDiscountAction, DiscountListAction } from 'src/store/actions/discount.action';
import { FormActivate } from 'src/store/actions/util.actions';
import { DiscountState } from 'src/store/states/discount.state';
import { UtilState } from 'src/store/states/util.state';
import { CRUD } from 'src/util/abm-interface';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit,CRUD {

  @Select(DiscountState.getDiscounts) discounts!:Observable<Discount[]> 
  @Select(UtilState.modalForm) modal!:Observable<boolean>

  discount!:Discount;
  isEdit!:boolean;
  discountForm = this.fb.group({
    validityDate:[new Date, Validators.required],
    amountPrice:[0, Validators.required],
    discount:[0,Validators.required]
  });

  constructor(private fb:FormBuilder, private store:Store){}

  ngOnInit(): void {
    this.store.dispatch(new DiscountListAction);
  }
  
  openModalForm(): void {
    this.store.dispatch(new FormActivate(true));
  }
  closeModalForm(): void {
    this.store.dispatch(new FormActivate(false));
  }
  save(): void {
    if(this.isEdit){
      this.edit()
    }
    else{
      this.create();
    }
  }
  create(): void {
    this.isEdit = false;
    this.discount = this.discountForm.getRawValue()!;
    this.store.dispatch(new AddDiscountAction(this.discount));
  }
  edit(): void {
    throw new Error('Method not implemented.');
  }
  editEntity(entity: any): void {
    throw new Error('Method not implemented.');
  }
  deleteEntity(entity: any): void {
    throw new Error('Method not implemented.');
  }
  delete(): void {
    throw new Error('Method not implemented.');
  }
  closeDialog(): void {
  
  }

}
