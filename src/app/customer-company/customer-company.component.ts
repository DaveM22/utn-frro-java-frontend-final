import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CustomerCompany } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';
import { AddCustomerCompanyAction, CustomerCompanyListAction, DeleteCustomerCompanyAction, EditCustomerCompanyAction } from 'src/store/actions/customer-company.action';
import { FormActivate } from 'src/store/actions/util.actions';
import { CustomerCompanyState } from 'src/store/states/customer.company.state';
import { UtilState } from 'src/store/states/util.state';
import { CRUD } from 'src/util/abm-interface';

@Component({
  selector: 'app-customer-company',
  templateUrl: './customer-company.component.html',
  styleUrls: ['./customer-company.component.scss']
})
export class CustomerCompanyComponent implements CRUD {
  @Select(CustomerCompanyState.getCustomerCompany) customer$!: Observable<CustomerCompany[]>;
  @Select(UtilState.modalForm) modalForm!: Observable<boolean>;
  @Select(UtilState.dialog) dialog!: Observable<boolean>;
  customersCompany!:CustomerCompany[];
  customerCompany!:CustomerCompany;
  submitted!:boolean;
  companyDialog!:boolean;
  emptyMessage:string = "No se han agregado clientes";
  isEdit!:boolean;
  title!:string;
  customerCompanyForm = this.fb.group({
    id:[0],
    cuit:['', Validators.required],
    businessName:['',Validators.required],
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
    this.store.dispatch(new CustomerCompanyListAction());
  }

  openModalForm(): void {
    this.customerCompanyForm.reset();
    this.title = "Nuevo cliente";
    this.isEdit = false;
    this.store.dispatch(new FormActivate(true));
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
    this.customerCompany = this.customerCompanyForm.getRawValue()!;
    this.store.dispatch(new AddCustomerCompanyAction(this.customerCompany));
  }
  edit(): void {
    this.customerCompany = this.customerCompanyForm.getRawValue()!;
    this.store.dispatch(new EditCustomerCompanyAction(this.customerCompany));
  }
  editEntity(entity: CustomerCompany): void {
    this.title = "Editar cliente"
    this.isEdit = true;
    this.customerCompanyForm.patchValue(entity);
  }
  deleteEntity(entity: any): void {
    this.customerCompany = entity;
    this.confirmacionService.confirm(
      {message: '¿Estas seguro de borrar el siguiente cliente: ' 
      + this.customerCompany.businessName +'?',
    header: 'Eliminar cliente',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel:'Aceptar',
    rejectLabel:'Cancelar'
    });
  }
  delete(): void {
    this.store.dispatch(new DeleteCustomerCompanyAction(this.customerCompany.id!));
  }
  closeDialog(): void {
    this.confirmacionService.close();
  }

}
