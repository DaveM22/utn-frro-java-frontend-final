import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { Province, ResponseHttp } from 'src/models/models';
import { ProvinceService } from 'src/services/provincia/provincia.service';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.scss']
})
export class ProvinciasComponent implements OnInit {
  provincias:Province[] = [];
  provincia!:Province;
  isMobile = false;
  submitted!:boolean;
  provinciaDialog!:boolean;
  isEditForm:boolean = false;
  provinciaForm = this.fb.group({
    provinceCode:[0, Validators.required],
    name:['', Validators.required],
  });

  constructor(private service:ProvinceService,
    private confirmacionService:ConfirmationService,
    private messageService:MessageService,
    private fb:FormBuilder){}
  
  
  ngOnInit(): void {
    this.service.getProvincias().subscribe(res => {
      this.provincias = res.payload as Province[];
    });
  }


    @HostListener('window:resize', ['$event'])
    onResize(event:any) {
      this.checkScreenSize();
    }
  
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
    }
  
    openModalForm() {
      this.submitted = false;
      this.provinciaDialog = true;
      this.isEditForm = false;
    }

  
    closeModalForm(){
      this.provinciaDialog = false;
      this.submitted = false;
    }
  
    save(){
      if(this.isEditForm){
        this.edit();
      }
      else{
       this.create();
      }
    }

    create(){
      let obj = this.provinciaForm.value as Province;
      this.service.postProvince(obj).subscribe({
        next:(res) => {
          let response = res.payload as Province;
          this.messageService.add({ severity: 'success', summary: 'Crear provincia', detail: res.message, life: 3000 });
          this.provinciaDialog = false;
          this.provincias.push(response);
        },
        error:(err) => {
          this.messageService.add({ severity: 'error', summary: 'Error al crear provincia', detail: err.error.errorMessage, life: 3000 });
        }
      });
    }

    edit(){
      let obj = this.provinciaForm.value as Province;
      this.service.putProvince(obj).subscribe({
        next:(res:ResponseHttp) => {
          let response = res.payload as Province;
          this.messageService.add({ severity: 'success', summary: 'Editar provincia', detail: res.message, life: 3000 });
          this.provinciaDialog = false;
          this.provincias[this.provincias.findIndex(z => z.provinceCode === response.provinceCode)] = response;
        },
        error:(err) => {
          this.messageService.add({ severity: 'error', summary: 'Error al editar provincia', detail: err.error.errorMessage, life: 3000 });
        }
      });
    }
  
    editEntity(provincia: Province) {
      this.provinciaForm.patchValue(provincia);
      this.isEditForm = true;
      this.provinciaDialog = true;    
    }
  
    deleteEntity(provincia: Province){
      this.provincia = provincia;
      this.confirmacionService.confirm({message: '¿Estas seguro de borrar la siguiente provincia: ' + this.provincia.name + '?',
      header: 'Eliminar provincia',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Aceptar',
      rejectLabel:'Cancelar'
      });
    }
  
    delete(){
      this.service.deleteProvincia(this.provincia.provinceCode).subscribe({
        next:(res) => {
          this.messageService.add({ severity: 'success', summary: 'Borrar provincia', detail: res.message, life: 3000 });
          this.confirmacionService.close();
        },
        error:(err) => {
          this.messageService.add({ severity: 'error', summary: 'Borrar provincia', detail: err.error.errorMessage, life: 3000 });
        }
      });

    }

    closeDialog(){
      this.confirmacionService.close();
    }

}
