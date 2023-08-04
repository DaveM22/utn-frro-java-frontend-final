import { Component, ElementRef, HostListener, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { Location, Province, ResponseHttp } from 'src/models/models';
import { LocationService } from 'src/services/localidad/localidad.service';
import { AddLocationAction, DeleteLocationAction, EditLocationAction, LocationListAction } from 'src/store/actions/location.actions';
import { LocationState } from 'src/store/states/location.state';
import { LocationFormModalComponent } from '../components/forms/location-form-modal/location-form-modal.component';
import { ProvinceState } from 'src/store/states/province.state';
import { ProvinceListAction } from 'src/store/actions/province.actions';
import { UtilState } from 'src/store/states/util.state';
import { FormActivate } from 'src/store/actions/util.actions';
import MapErrors from '../util/errorFormReactive';


@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.scss']
})
export class LocalidadesComponent implements OnInit {
  @Select(LocationState.getLocations) locations$!: Observable<Location[]>;
  @Select(LocationState.getErrors) errors$!: Observable<Object>;
  @Select(ProvinceState.getProvinces) provinces$!: Observable<Province[]>;
  @Select(UtilState.modalForm) modalForm!: Observable<boolean>;
  @Select(UtilState.dialog) dialog!: Observable<boolean>;
  localidades: Location[] = [];
  provincias: Province[] = [];
  location!: Location | null;
  provincia!: Province
  blockedPanel!:boolean;
  errors!:Object;
  isMobile = false;
  locationDialog!: boolean;
  loading: boolean = true;
  locationForm = this.fb.group({
    postalCode: [0, Validators.required],
    city: ['', Validators.required],
    provinceCode: [this.provincia?.provinceCode, Validators.required],
  });
  isEditForm!: boolean;

  constructor(
    private confirmacionService: ConfirmationService,
    private store:Store,
    private fb: NonNullableFormBuilder) { }

  ngOnInit() {
    this.blockedPanel = false;
    this.store.dispatch(new LocationListAction());
    this.store.dispatch(new  ProvinceListAction());
    this.errors$.subscribe(x => {
      this.errors = x;
      MapErrors(this.locationForm, this.errors);
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
    this.locationForm.reset();
    this.isEditForm = false;
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
    let obj = this.locationForm.getRawValue();
    this.store.dispatch(new AddLocationAction(obj));
 
  }

  edit() {
    let location = this.locationForm.getRawValue();
    this.location = { postalCode: location.postalCode!, city: location.city!, provinceCode: location.provinceCode!, provinceName: this.provincia!.name! };
    this.store.dispatch(new EditLocationAction(this.location!));
  }

  onChange(event: any) {
    this.provincia = this.store.selectSnapshot(ProvinceState.getProvinces).find(x => x.provinceCode === event.value)!;
  }

  editEntity(location: Location) {
    this.locationForm.patchValue(location);
    this.provincia = this.store.selectSnapshot(ProvinceState.getProvinces).find(x => x.provinceCode === location.provinceCode)!;
    this.isEditForm = true;
    this.store.dispatch(new FormActivate(true));
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
    this.store.dispatch(new DeleteLocationAction(this.location!.postalCode));
  }

  closeDialog() {
    this.confirmacionService.close();
  }
}
