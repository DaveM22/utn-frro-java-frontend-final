import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { Provincia } from 'src/models/models';
import { ProvinciaService } from 'src/services/provincia/provincia.service';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.scss']
})
export class ProvinciasComponent implements OnInit {
  provincias:Provincia[] = [];
  provincia!:Provincia;
  isMobile = false;
  submitted!:boolean;
  provinciaDialog!:boolean;
  provinciaForm = this.fb.group({
    nombre:['', Validators.required]
  });

  constructor(private service:ProvinciaService,
    private confirmacionService:ConfirmationService,
    private messageService:MessageService,
    private fb:FormBuilder){}
  
  
  ngOnInit(): void {
    this.service.getProvincias().subscribe(res => {
      this.provincias = res.payload as Provincia[];
    });
  }


    @HostListener('window:resize', ['$event'])
    onResize(event:any) {
      this.checkScreenSize();
    }
  
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
    }
  
    abrirNuevo() {
      this.provincia = {codigo:0, nombre:''};
      this.submitted = false;
      this.provinciaDialog = true;
    }
  
    CerrarDialog(){
      this.provinciaDialog = false;
      this.submitted = false;
    }
  
    save(){
      console.log(this.provinciaForm.value);
    }
  
    editarProvincia(provincia: Provincia) {
      this.provincia = provincia;
      this.provinciaDialog = true;    
    }
  
    borrarProvincia(provincia: Provincia){
      this.provincia = provincia;
      this.confirmacionService.confirm({message: '¿Estas seguro de borrar la siguiente localidad: ' + this.provincia.nombre + '?',
      header: 'Eliminar localidad',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Aceptar',
      rejectLabel:'Cancelar'
      });
    }
  
    borrar(){
      this.service.borrarProvincia(this.provincia.codigo).subscribe();
      this.confirmacionService.close();
    }

}
