import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location, Province, ResponseHttp } from 'src/models/models';
import { LocationService } from 'src/services/localidad/localidad.service';
import { ProvinciaService } from 'src/services/provincia/provincia.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.scss']
})
export class LocalidadesComponent implements OnInit {
  localidades: Location[] = [];
  provincias: Province[] = [];
  location!: Location;
  provincia!: Province;
  blockedPanel!:boolean;
  isMobile = false;
  locationDialog!: boolean;
  loading: boolean = true;
  locationForm = this.fb.group({
    postalCode: [0, Validators.required],
    city: ['', Validators.required],
    provinceCode: [0, Validators.required]
  });
  isEditForm!: boolean;

  constructor(
    private locationService: LocationService,
    private provinceService: ProvinciaService,
    private confirmacionService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.locationService.getLocation().subscribe((res: any) => this.localidades = res.payload);
    this.provinceService.getProvincias().subscribe((res: any) => {
      this.provincias = res.payload
      this.loading = false;
    })

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  openModalForm() {
    this.locationDialog = true;
    this.isEditForm = false;
  }


  closeModalForm() {
    this.locationDialog = false;
    this.locationForm.reset();
  }

  save() {
    if (this.isEditForm) {
      this.edit();
    }
    else {
      this.create();
    }
  }

  create() {
    this.blockedPanel = true;
    let obj = this.locationForm.value as Location;
    let location = { postalCode: obj.postalCode!, city: obj.city!, provinceCode: obj.provinceCode, provinceName: this.provincia.name };
    this.locationService.postLocation(location).subscribe({
      next: (res) => {
        let response = res.payload as Location;
        this.blockedPanel = false;
        this.messageService.add({ severity: 'success', summary: 'Crear localidad', detail: res.message, life: 3000 });
        this.locationDialog = false;
        this.localidades.push(response);
      },
      error: (err) => {
        this.blockedPanel = false;
        this.messageService.add({ severity: 'error', summary: 'Error al crear localidad', detail: err.error.errorMessage, life: 3000 });
      }
    })
  }

  edit() {
    let location = this.locationForm.value as Location;
    this.location = { postalCode: location.postalCode!, city: location.city!, provinceCode: location.provinceCode, provinceName: this.provincia.name };
    this.locationService.putLocation(location).subscribe({
      next: (res: ResponseHttp) => {
        let response = res.payload as Province;
        this.messageService.add({ severity: 'success', summary: 'Editar localidad', detail: res.message, life: 3000 });
        this.locationDialog = false;
        this.provincias[this.provincias.findIndex(z => z.provinceCode === response.provinceCode)] = response;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error al editar localidad', detail: err.error.errorMessage, life: 3000 });
      }
    });
  }

  onChange(event: any) {
    this.provincia = this.provincias.find(x => x.provinceCode === event.value)!;
  }

  editEntity(location: Location) {
    this.locationForm.patchValue(location);
    this.provincia = this.provincias.find(x => x.provinceCode === location.provinceCode)!;
    this.isEditForm = true;
    this.locationDialog = true;
  }

  deleteEntity(localidad: Location) {
    this.location = localidad;
    this.confirmacionService.confirm({
      message: '¿Estas seguro de borrar la siguiente localidad: ' + this.location.city + '?',
      header: 'Eliminar localidad',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar'
    });
  }

  delete() {
    this.blockedPanel = true;
    this.locationService.deleteLocation(this.location.postalCode).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Borrar localidad', detail: res.message, life: 3000 });
        
        this.confirmacionService.close();
        this.blockedPanel = false;
        this.localidades = this.localidades.filter((val) => val.postalCode !== this.location.postalCode);

      },
      error: (err) => {
        this.blockedPanel = false;
        this.messageService.add({ severity: 'error', summary: 'Borrar localidad', detail: err.error.errorMessage, life: 3000 });
      }
    });

  }

  closeDialog() {
    this.confirmacionService.close();
  }
}
