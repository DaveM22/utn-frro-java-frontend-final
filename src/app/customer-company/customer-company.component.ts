import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerCompany } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';

@Component({
  selector: 'app-customer-company',
  templateUrl: './customer-company.component.html',
  styleUrls: ['./customer-company.component.scss']
})
export class CustomerCompanyComponent {
  customersCompany!:CustomerCompany[];
  customerCompany!:CustomerCompany;
  submitted!:boolean;
  companyDialog!:boolean;
  emptyMessage!:string;
  customerCompanyForm = this.fb.group({
    id:[0, Validators.required],
    cuit:['', Validators.required],
    businessName:['',Validators.required],
    direction:['',Validators.required],
    email:['',Validators.required],
    phoneNumber:['', Validators.required],
    postalCod:[0,Validators.required]
  });

  constructor(
    private personaService:PersonaService,
    private confirmacionService:ConfirmationService,
    private messageService:MessageService,
    private fb:FormBuilder){

  }

  ngOnInit(): void {
    this.personaService.getCustomersCompany().subscribe(x => {
      this.customersCompany = x.payload as CustomerCompany[];
    })
  }

  deleteModal(customer: CustomerCompany): void {
    this.customerCompany = customer;
    this.confirmacionService.confirm(
      {message: '¿Estas seguro de borrar el siguiente cliente: '  + this.customerCompany.businessName+ ' ' + '?',
    header: 'Eliminar cliente',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel:'Aceptar',
    rejectLabel:'Cancelar'
    });
  }

  deleteConfirm() : void {
    this.personaService.deleteCustomerCompany(this.customerCompany.id).subscribe(
      {
        next:(res) => {
          this.messageService.add({key: 'tc', severity: 'success', summary: 'Eliminar cliente', detail: res.message, life: 3000 });
          this.customersCompany = this.customersCompany.filter((val:CustomerCompany) => val.id !== this.customerCompany.id);
          this.confirmacionService.close();
        },
        error:(error) => {
          this.emptyMessage = "No se pudieron recuperar los clientes, intente mas tarde"
        }
      }
    );
  }

  closeDeleteConfirm() : void {
    this.confirmacionService.close();
    this.messageService.add({key: 'tc', severity: 'warn', summary: 'Eliminar cliente', detail: "Se ha cancelado la eliminación del cliente", life: 3000 });
  }

  saveForm(): void {
    let obj = this.customerCompanyForm.value as CustomerCompany;
    if(obj.id === 0){
      this.personaService.postCustomerCompany(obj).subscribe(x => {
        this.companyDialog = false;
        this.submitted = false;
        this.messageService.add({ severity: 'success', summary: 'Crear cliente', detail: x.message, life: 3000 });
        this.customersCompany.push(x.payload as CustomerCompany);
      });
    }
    else {
      this.personaService.postCustomerCompany(obj).subscribe(x => {
        let responseCustomer = x.payload as CustomerCompany;
        this.companyDialog = false;
        this.submitted = false;
        this.messageService.add({ severity: 'success', summary: 'Editar cliente', detail: x.message, life: 3000 });
        this.customersCompany[this.customersCompany.findIndex(z => z.id === responseCustomer.id)] = responseCustomer;
        this.companyDialog = false;
      });
    }
  }

  closeDialog(): void {
    this.companyDialog = false;
    this.submitted = false;
  }

  addDialog() {
    this.submitted = false;
    this.companyDialog = true;
  }

  editDialog(customer:CustomerCompany){
    this.companyDialog = true;
    this.customerCompanyForm.patchValue(customer);
  }

}
