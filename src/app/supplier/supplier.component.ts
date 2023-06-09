import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Supplier } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';

import { CRUD } from 'src/util/abm-interface';
import { UtilState } from 'src/store/states/util.state';
import { SupplierState } from 'src/store/states/supplier.state';
import { AddSupplierAction, DeleteSupplierAction, EditSupplierAction, SupplierListAction } from 'src/store/actions/supplier.action';
import { FormActivate } from 'src/store/actions/util.actions';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit, CRUD {  
  @Select(SupplierState.getSuppliers) suppliers$!: Observable<Supplier[]>;
  @Select(UtilState.modalForm) modalForm!: Observable<boolean>;
  @Select(UtilState.dialog) dialog!: Observable<boolean>;

  suppliers!:Supplier[];
  suppler!:Supplier;
  submitted!:boolean;
  supplierDialog!:boolean;
  emptyMessage!:string;
  isEdit!:boolean;
  supplierForm = this.fb.group({
    id:[0, Validators.required],
    cuit:['', Validators.required],
    businessName:['',Validators.required],
    direction:['',Validators.required],
    email:['',Validators.required],
    phoneNumber:['', Validators.required],
    postalCode:[0,Validators.required]
  });
  title!: string;

  constructor(
    private fb:FormBuilder,
    private store:Store,
    private confirmationService:ConfirmationService){}


  ngOnInit(): void {
    this.store.dispatch(new SupplierListAction());
  }
  openModalForm(): void {
    this.title = "Nuevo proveedor";
    this.store.dispatch(new FormActivate(true));
    this.supplierForm.reset();
  }
  closeModalForm(): void {
    this.store.dispatch(new FormActivate(false));
  }
  save(): void {
    if(this.isEdit){
      this.edit();
    }
    else{
      this.create();
    }
  }
  create(): void {
    this.suppler = this.supplierForm.getRawValue()!;
    this.store.dispatch(new AddSupplierAction(this.suppler));
  }
  edit(): void {
    this.suppler = this.supplierForm.getRawValue()!;
    this.store.dispatch(new EditSupplierAction(this.suppler));
  }
  editEntity(entity: Supplier): void {
    this.title = "Editar proveedor";
    this.supplierForm.patchValue(entity);
    this.isEdit = true;
    this.store.dispatch(new FormActivate(true));
  }
  deleteEntity(entity: any): void {
    this.suppler = entity;
    this.confirmationService.confirm({
      message: '¿Estas seguro de borrar el siguiente proveedor: ' + entity.businessName + '?',
      header: 'Eliminar localidad',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar'
    });
  }
  delete(): void {
    this.store.dispatch(new DeleteSupplierAction(this.suppler.id!));
  }
  closeDialog(): void {
    this.confirmationService.close();
  }


}


