import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Supplier } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {


  suppliers!:Supplier[];
  suppler!:Supplier;
  submitted!:boolean;
  supplierDialog!:boolean;
  emptyMessage!:string;
  supplierForm = this.fb.group({
    id:[0, Validators.required],
    cuit:['', Validators.required],
    businessName:['',Validators.required],
    direction:['',Validators.required],
    email:['',Validators.required],
    phoneNumber:['', Validators.required],
    postalCod:[0,Validators.required]
  });

  constructor(
    private service:PersonaService, 
    private fb:FormBuilder,
    private messageService:MessageService,
    private confirmationService:ConfirmationService){}


  ngOnInit(): void {
    this.service.getSuppliers().subscribe(x => {
      this.suppliers = x.payload as Supplier[];
    });
  }

  addDialog(){
    this.submitted = false;
    this.supplierDialog = true;
  }

  editDialog(entity:Supplier){
    this.supplierDialog = true;
    this.supplierForm.patchValue(entity);
  }

  deleteModal(entity:Supplier){

  }

  saveForm(){
    let obj = this.supplierForm.value as Supplier;
    if(obj.id === 0){
      this.service.postSupplier(obj).subscribe(x => {
        this.supplierDialog = false;
        this.submitted = false;
        this.messageService.add({ severity: 'success', summary: 'Crear proveedor', detail: x.message, life: 3000 });
        this.suppliers.push(x.payload as Supplier);
      });
    }
    else {
      this.service.postCustomerCompany(obj).subscribe(x => {
        let responseCustomer = x.payload as Supplier;
        this.supplierDialog = false;
        this.submitted = false;
        this.messageService.add({ severity: 'success', summary: 'Editar proveedor', detail: x.message, life: 3000 });
        this.suppliers[this.suppliers.findIndex(z => z.id === responseCustomer.id)] = responseCustomer;
        this.supplierDialog = false;
      });
    }
  }

  closeDialog(){
    this.supplierDialog = false;
    this.submitted = false;
  }

  deleteConfirm(){
    this.service.deleteCustomerCompany(this.suppler.id).subscribe(
      {
        next:(res) => {
          this.messageService.add({key: 'tc', severity: 'success', summary: 'Eliminar cliente', detail: res.message, life: 3000 });
          this.suppliers = this.suppliers.filter((val:Supplier) => val.id !== this.suppler.id);
          this.confirmationService.close();
        },
        error:(error) => {
          this.emptyMessage = "No se pudieron recuperar los clientes, intente mas tarde"
        }
      }
    );
  }

  closeDeleteConfirm(){
    this.confirmationService.close();
    this.messageService.add({ severity: 'warn', summary: 'Eliminar cliente', detail: "Se ha cancelado la eliminación del cliente", life: 3000 });
  }


}
