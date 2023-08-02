import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CustomerParticular } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';
import { DeleteCategoryAction } from 'src/store/actions/category.action';
import { AddCustomerParticularAction, CustomerParticularListAction, EditCustomerParticularAction } from 'src/store/actions/customer-particular.action';
import { FormActivate } from 'src/store/actions/util.actions';
import { CustomerParticularState } from 'src/store/states/customer.particular.state';
import { UtilState } from 'src/store/states/util.state';
import { CRUD } from 'src/util/abm-interface';

@Component({
  selector: 'app-customer-particular',
  templateUrl: './particular.component.html',
  styleUrls: ['./particular.component.scss']
})
export class ParticularComponent implements OnInit, CRUD {
  @Select(CustomerParticularState.getCustomerParticular) customer$!: Observable<CustomerParticular[]>;
  @Select(UtilState.modalForm) modalForm!: Observable<boolean>;
  @Select(UtilState.dialog) dialog!: Observable<boolean>;
  isEdit!:boolean;
  title!:string;
  customersParticular!:CustomerParticular[];
  customerParticular!:CustomerParticular;
  tabs!: MenuItem[];
  submitted!:boolean;
  particularDialog!:boolean;
  emptyMessage!:string;
  customerParticularForm = this.fb.group({
    id:[0],
    firstName:['', Validators.required],
    lastName:['', Validators.required],
    dni:['', Validators.required],
    direction:['',Validators.required],
    email:[''],
    phoneNumber:[''],
    postalCode:[0,Validators.required]
  });

  constructor(
    private confirmacionService:ConfirmationService,
    private store:Store,
    private fb:FormBuilder){
  }

  ngOnInit(): void {
    this.store.dispatch(new CustomerParticularListAction());
  }

  openModalForm(): void {
    this.customerParticularForm.reset();
    this.title = "Nuevo cliente";
    this.isEdit = false;
    this.store.dispatch(new FormActivate(true));
  }

  closeModalForm(): void {
    this.store.dispatch(new FormActivate(false));
    this.customerParticularForm.reset();
  }

  save(): void {
    if(this.isEdit) {
      this.edit();
    }
    else{
      this.create();
    }
  }

  create(): void {
    this.customerParticular = this.customerParticularForm.getRawValue()!;
    this.store.dispatch(new AddCustomerParticularAction(this.customerParticular));
  }

  edit(): void {
    this.customerParticular = this.customerParticularForm.getRawValue()!;
    this.store.dispatch(new EditCustomerParticularAction(this.customerParticular));
  }

  editEntity(entity: CustomerParticular): void {
    this.isEdit = true;
    this.customerParticularForm.patchValue(entity);
    this.title = "Editar cliente";
    this.store.dispatch(new FormActivate(true));
  }

  deleteEntity(entity: CustomerParticular): void {
    this.customerParticular = entity;
    this.confirmacionService.confirm(
      {message: '¿Estas seguro de borrar el precio?' 
      + this.customerParticular.dni + ' ' + this.customerParticular.firstName +' '+ this.customerParticular.lastName + ' ' + '?',
    header: 'Eliminar cliente',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel:'Aceptar',
    rejectLabel:'Cancelar'
    });
  }

  delete(): void {
    this.store.dispatch(new DeleteCategoryAction(this.customerParticular.id!));
  }

  closeDialog(): void {
    this.confirmacionService.close();
  }

}
