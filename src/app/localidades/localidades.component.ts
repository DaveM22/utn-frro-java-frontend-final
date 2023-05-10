import { Component, HostListener, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Localidad, Provincia } from 'src/models/models';
import { LocalidadService } from 'src/services/localidad/localidad.service';
import { ProvinciaService } from 'src/services/provincia/provincia.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.scss']
})
export class LocalidadesComponent implements OnInit {
  localidades:Localidad[] = [];
  provincias:Provincia[] = [];
  localidad!:any;
  provincia!:any;
  isMobile = false;
  submitted!:boolean;
  localidadDialog!:boolean;
  loading:boolean = true;

  constructor(
    private service:LocalidadService, 
    private serviceProvincia:ProvinciaService, 
    private confirmacionService:ConfirmationService,
    private messageService:MessageService) { }

  ngOnInit() {
    this.service.getLocalidades().subscribe((res:any) => this.localidades = res);
    this.serviceProvincia.getProvincias().subscribe((res:any) => {
      this.provincias = res.payload
      this.loading = false;
    })
 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  abrirNuevo() {
    this.localidad = {};
    this.submitted = false;
    this.localidadDialog = true;
  }

  CerrarDialog(){
    this.localidadDialog = false;
    this.submitted = false;
  }

  Guardar(){
    this.submitted = true;
    if(this.localidad.codigo != undefined || this.localidad.codigo != null){
      this.service.editLocalidad(this.localidad, this.provincia).subscribe((res) => {
        this.localidades[this.localidades.indexOf(res)] = res;
        this.messageService.add({ severity: 'success', summary: 'Editar localidad', detail: 'Se ha modificado la localidad de manera exitosa', life: 3000 });
      });
    }
    else{
      this.service.saveLocalidad(this.localidad, this.provincia).subscribe((res) => {
        this.localidades.push(res);
      });
    }
    this.localidadDialog = false;
    this.localidad = {};
  }

  editarLocalidad(localidad: Localidad) {
    this.localidad = localidad;
    this.provincia = this.provincias.find(x => x.codigo == localidad.provincia.codigo);
    this.localidadDialog = true;    
  }

  borrarLocalidad(localidad: Localidad){
    this.localidad = localidad;
    this.confirmacionService.confirm({message: '¿Estas seguro de borrar la siguiente localidad: ' + this.localidad.ciudad + '?',
    header: 'Eliminar localidad',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel:'Aceptar',
    rejectLabel:'Cancelar'
    });
  }

  borrar(){
    this.service.borrarLocalidad(this.localidad.codigo).subscribe();
    this.confirmacionService.close();
  }
}
