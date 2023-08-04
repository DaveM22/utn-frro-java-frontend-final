import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Discount } from 'src/models/models';
import { AddDiscountAction, DeleteDiscount, DiscountListAction } from 'src/store/actions/discount.action';
import { FormActivate } from 'src/store/actions/util.actions';
import { DiscountState } from 'src/store/states/discount.state';
import { UtilState } from 'src/store/states/util.state';
import { CRUD } from 'src/util/abm-interface';
import MapErrors from '../util/errorFormReactive';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  @Select(DiscountState.getDiscounts) discounts!:Observable<Discount[]> 
  @Select(DiscountState.getErrors) errors$!:Observable<Object>
  @Select(UtilState.modalForm) modal!:Observable<boolean>

  discount!:Discount;
  isEdit!:boolean;
  discountForm = this.fb.group({
    validityDate:[new Date, Validators.required],
    amountPrice:[0, Validators.required],
    discount:[0,Validators.required]
  });
  error!:Object
  
  constructor(private fb:FormBuilder, private store:Store, private confirmationService:ConfirmationService){}

  ngOnInit(): void {
    this.store.dispatch(new DiscountListAction);
    this.errors$.subscribe(x => {
      this.error = x;
      MapErrors(this.discountForm, this.error);
    })
  }
  
  openModalForm(): void {
    this.discountForm.reset();
    this.store.dispatch(new FormActivate(true));
  }
  closeModalForm(): void {
    this.store.dispatch(new FormActivate(false));
  }
  save(): void {

      this.create();
    
  }
  create(): void {
    this.isEdit = false;
    this.discount = this.discountForm.getRawValue()!;
    this.store.dispatch(new AddDiscountAction(this.discount));
  }

  deleteEntity(entity: any): void {
    this.discount = entity;
    console.log('asd')
    this.confirmationService.confirm({
      message: '¿Estas seguro de borrar el descuento ?',
      header: 'Eliminar descuento',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar'
    });
  }
  delete(): void {
    this.store.dispatch(new DeleteDiscount(this.discount));
  }
  closeDialog(): void {
    this.confirmationService.close();
  }

}
