import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import MapErrors from 'src/app/util/errorFormReactive';
import { Category, ResponseHttp } from 'src/models/models';
import { CategoriasService } from 'src/services/categorias/categorias.service';
import { AddCategoryAction, CategoryListAction, DeleteCategoryAction, EditCategoryAction } from 'src/store/actions/category.action';
import { FormActivate } from 'src/store/actions/util.actions';
import { CategoryState } from 'src/store/states/category.state';
import { UtilState } from 'src/store/states/util.state';
import { CRUD } from 'src/util/abm-interface';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit, CRUD {
  @Select(CategoryState.getCategories) categories$!: Observable<Category[]>;
  @Select(CategoryState.getErrors) errors$!: Observable<Object>;
  @Select(UtilState.modalForm) modalForm!: Observable<boolean>;
  @Select(UtilState.dialog) dialog!: Observable<boolean>;
  @Select(UtilState.blockTable) loading!:Observable<boolean>;
  title!:string;
  categoria!:Category; 
  submitted!:boolean;
  categoryDialog!: boolean;
  isEdit!: boolean;
  errors!:any;

  categoryForm = this.fb.group({
    categoryId:[0],
    name:['', Validators.required],
  });

  constructor(
    private store:Store,
    private confirmationService:ConfirmationService,
    private fb:FormBuilder){

  }

  
  ngOnInit(): void {
    this.errors$.subscribe(x => {
      this.errors = x;
      MapErrors(this.categoryForm, this.errors);
    })
    this.store.dispatch(new CategoryListAction())
  }

  openModalForm(): void {
    this.isEdit = false;
    this.categoryForm.reset();
    this.title = "Nueva categoría";
    this.store.dispatch(new FormActivate(true));
  }

  closeModalForm(): void {
    this.store.dispatch(new FormActivate(false));
    this.categoryForm.reset();
  }

  save(): void {
    if(this.isEdit){
      this.edit();
    }
    else{
      this.create();
    }
  }

  create(): void {
    this.categoria = this.categoryForm.getRawValue();
    this.store.dispatch(new AddCategoryAction(this.categoria));
  }
  edit(): void {
    this.categoria = this.categoryForm.getRawValue();
    this.store.dispatch(new EditCategoryAction(this.categoria));
  }
  editEntity(entity: Category): void {
    this.isEdit = true;
    this.title = "Editar categoría";
    this.categoryForm.patchValue(entity);
    this.store.dispatch(new FormActivate(true));
  }
  deleteEntity(entity: Category): void {
    this.categoria = entity;
    this.confirmationService.confirm({
      message: '¿Estas seguro de borrar la siguiente categoría: ' + entity.name + '?',
      header: 'Eliminar categoría',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar'
    });
  }
  delete(): void {
    this.store.dispatch(new DeleteCategoryAction(this.categoria.categoryId!));
  }
  closeDialog(): void {
    this.confirmationService.close();
  }


}
