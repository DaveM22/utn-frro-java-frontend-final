import { Component, ElementRef, HostListener, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { Location, Province, ResponseHttp } from 'src/models/models';
import { LocationService } from 'src/services/localidad/localidad.service';
import { LocationAdd, LocationDelete, LocationListAction } from 'src/store/actions/location.actions';
import { LocationState } from 'src/store/states/location.state';
import { LocationFormModalComponent } from '../components/forms/location-form-modal/location-form-modal.component';
import { ProvinceState } from 'src/store/states/province.state';
import { ProvinceListAction } from 'src/store/actions/province.actions';
import { UtilState } from 'src/store/states/util.state';
import { FormActivate } from 'src/store/actions/util.actions';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.scss']
})
export class LocalidadesComponent implements OnInit {
  @Select(LocationState.getLocations) locations$!: Observable<Location[]>;
  @Select(ProvinceState.getProvinces) provinces$!: Observable<Province[]>;
  @Select(UtilState.modalForm) modalForm!: Observable<boolean>;
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
    provinceCode: [0, Validators.required],
    provinceName: ['']
  });
  isEditForm!: boolean;

  constructor(
    private locationService: LocationService,
    private confirmacionService: ConfirmationService,
    private dialogService:DialogService,
    private messageService: MessageService,
    private store:Store,
    private fb: NonNullableFormBuilder) { }

  ngOnInit() {
    this.blockedPanel = false;
    this.store.dispatch(new LocationListAction());
    this.store.dispatch(new  ProvinceListAction());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  openModalForm() {
    this.store.dispatch(new FormActivate(true));
  }


  closeModalForm() {
    this.store.dispatch(new FormActivate(false));
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
    this.store.dispatch(new LocationAdd(obj));
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
    this.store.dispatch(new LocationDelete(this.location.postalCode));
  }

  closeDialog() {
    this.confirmacionService.close();
  }
}
