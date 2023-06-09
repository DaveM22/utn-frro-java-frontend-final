import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Province, ResponseHttp } from 'src/models/models';
import { ProvinceService } from 'src/services/provincia/provincia.service';
import { AddProvince, DeleteProvince, EditProvince, ProvinceListAction } from 'src/store/actions/province.actions';
import { DialogActivate, FormActivate } from 'src/store/actions/util.actions';
import { ProvinceState } from 'src/store/states/province.state';
import { UtilState } from 'src/store/states/util.state';
import { CRUD } from 'src/util/abm-interface';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.scss']
})
export class ProvinciasComponent implements OnInit, CRUD {
  @Select(ProvinceState.getProvinces) provinces$!: Observable<Province[]>;
  @Select(UtilState.modalForm) modalForm!: Observable<boolean>;
  @Select(UtilState.dialog) dialog!: Observable<boolean>;
  isEdit!:boolean;
  province!:Province;
  title!:string;

  provinciaForm = this.fb.group({
    provinceCode:[0, Validators.required],
    name:['', Validators.required],
  });

  constructor(private fb:NonNullableFormBuilder, private store:Store, private confirmationService:ConfirmationService){}

  
  
  ngOnInit(): void {
    this.store.dispatch(new ProvinceListAction());
  }


    openModalForm(): void {
      this.title = "Crear provincia";
      this.provinciaForm.reset();
      this.isEdit = false;
      this.store.dispatch(new FormActivate(true));
    }

    closeModalForm(): void {
      this.store.dispatch(new FormActivate(false));
    }
    save(): void {
      if(this.isEdit){
        this.edit()
      }
      else{
        this.create();
      }

    }
    create(): void {
      this.province = this.provinciaForm.getRawValue()!;
      this.store.dispatch(new AddProvince(this.province));
    }
    edit(): void {
      this.province = this.provinciaForm.getRawValue()!;
      this.store.dispatch(new EditProvince(this.province));
    }
    editEntity(entity: any): void {
      this.title = "Editar provincia";
      this.provinciaForm.patchValue(entity);
      this.isEdit = true;
      this.store.dispatch(new FormActivate(true));
    }
    deleteEntity(entity: any): void {
      this.province = entity;
      this.confirmationService.confirm({
        message: '¿Estas seguro de borrar la siguiente provincia: ' + entity.name + '?',
        header: 'Eliminar localidad',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Aceptar',
        rejectLabel: 'Cancelar'
      });
    }
    delete(): void {
      this.store.dispatch(new DialogActivate(true));
      this.store.dispatch(new DeleteProvince(this.province.provinceCode!));
    }
    closeDialog(): void {
      this.confirmationService.close();
    }
  

}
