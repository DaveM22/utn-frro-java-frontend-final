import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CustomerParticular } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';

@Component({
  selector: 'app-customer-particular',
  templateUrl: './particular.component.html',
  styleUrls: ['./particular.component.scss']
})
export class ParticularComponent implements OnInit {

  customersParticular!:CustomerParticular[];
  customerParticular!:CustomerParticular;
  tabs!: MenuItem[];
  submitted!:boolean;
  particularDialog!:boolean;
  emptyMessage!:string;
  customerParticularForm = this.fb.group({
    id:[0, Validators.required],
    firstName:['', Validators.required],
    lastName:['', Validators.required],
    dni:['', Validators.required],
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
    this.personaService.getCustomerParticulars().subscribe(x => {
      this.customersParticular = x.payload as CustomerParticular[];
    })
  }

  deleteModalParticular(customer: CustomerParticular): void {
    this.customerParticular = customer;
    this.confirmacionService.confirm(
      {message: '¿Estas seguro de borrar el siguiente cliente: ' 
      + this.customerParticular.dni + ' ' + this.customerParticular.firstName +' '+ this.customerParticular.lastName + ' ' + '?',
    header: 'Eliminar cliente',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel:'Aceptar',
    rejectLabel:'Cancelar'
    });
  }

  deleteConfirm() : void {
    this.personaService.deleteCustomerParticular(this.customerParticular.id).subscribe(
      {
        next:(res) => {
          this.messageService.add({key: 'tc', severity: 'success', summary: 'Eliminar cliente', detail: res.message, life: 3000 });
          this.customersParticular = this.customersParticular.filter((val:CustomerParticular) => val.id !== this.customerParticular.id);
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
    let obj = this.customerParticularForm.value as CustomerParticular;
    if(obj.id === 0){
      this.personaService.postCustomerParticular(obj).subscribe(x => {
        this.particularDialog = false;
        this.submitted = false;
        this.messageService.add({ severity: 'success', summary: 'Crear cliente', detail: x.message, life: 3000 });
        this.customersParticular.push(x.payload as CustomerParticular);
      });
    }
    else {
      this.personaService.putCustomerParticular(obj).subscribe(x => {
        let responseCustomer = x.payload as CustomerParticular;
        this.particularDialog = false;
        this.submitted = false;
        this.messageService.add({ severity: 'success', summary: 'Editar cliente', detail: x.message, life: 3000 });
        this.customersParticular[this.customersParticular.findIndex(z => z.id === responseCustomer.id)] = responseCustomer;
        this.particularDialog = false;
      });
    }
  }

  closeDialog(): void {
    this.particularDialog = false;
    this.submitted = false;
  }

  addDialog() {
    this.submitted = false;
    this.particularDialog = true;
  }

  editDialog(customer:CustomerParticular){
    this.particularDialog = true;
    this.customerParticularForm.patchValue(customer);
  }

}
