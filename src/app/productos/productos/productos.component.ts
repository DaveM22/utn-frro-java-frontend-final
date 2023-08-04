import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, catchError } from 'rxjs';
import MapErrors from 'src/app/util/errorFormReactive';
import { Category, Product, ResponseHttp } from 'src/models/models';
import { CategoriasService } from 'src/services/categorias/categorias.service';
import { LocationService } from 'src/services/localidad/localidad.service';
import { ProductoService } from 'src/services/productos/producto.service';
import { CategoryListAction } from 'src/store/actions/category.action';
import { AddProductAction, DeleteProductAction, EditProductAction, ProductListAction } from 'src/store/actions/product.action,';
import { FormActivate } from 'src/store/actions/util.actions';
import { CategoryState } from 'src/store/states/category.state';
import { ProductState } from 'src/store/states/product.state';
import { UtilState } from 'src/store/states/util.state';
import { CRUD } from 'src/util/abm-interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit, CRUD {
  @Select(ProductState.getProducts) products$!: Observable<Product[]>;
  @Select(ProductState.getError) errors$!: Observable<Object>;
  @Select(CategoryState.getCategories) categories$!: Observable<Category[]>;
  @Select(UtilState.modalForm) modalForm!: Observable<boolean>;
  @Select(UtilState.dialog) dialog!: Observable<boolean>;
  isEdit!: boolean;
  product!: Product
  category!: Category;
  productDialog!: boolean;
  title!: string;
  errors!:Object;
  productForm = this.fb.group({
    id: [0],
    description: ['', Validators.required],
    categoryId: [this.category?.categoryId, Validators.required],
    categoryName: [''],
    amount: [0]
  });
  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new ProductListAction());
    this.store.dispatch(new CategoryListAction());
    this.errors$.subscribe(x => {
      this.errors = x;
      MapErrors(this.productForm, this.errors);
    })
  }

  redirectToProductSupplier(entity: Product){
    this.router.navigate(['/productos-proveedores', entity.id ])
  }

  openModalForm(): void {
    this.title = "Nuevo producto";
    this.isEdit = false;
    this.store.dispatch(new FormActivate(true));
  }

  closeModalForm(): void {
    this.store.dispatch(new FormActivate(false));
    this.productForm.reset();
  }

  save(): void {
    if (this.isEdit) {
      this.edit();
    }
    else {
      this.create();
    }
  }

  create(): void {
    this.product = this.productForm.getRawValue()!
    this.store.dispatch(new AddProductAction(this.product));
  }

  edit(): void {
    this.product = this.productForm.getRawValue()!
    this.store.dispatch(new EditProductAction(this.product));
  }

  editEntity(entity: Product): void {
    this.title = "Editar producto";
    this.isEdit = true;
    this.category = this.store.selectSnapshot(CategoryState.getCategories).find(x => x.categoryId === entity.categoryId)!;
    this.productForm.patchValue(entity);
    this.store.dispatch(new FormActivate(true));
  }

  deleteEntity(entity: Product): void {
    this.product = entity;
    this.confirmationService.confirm({
      message: '¿Estas seguro de borrar el siguiente producto: ' + entity.description + '? ADVERTENCIA: Esto borrara tanto los precios como los proveedores asociados al producto',
      header: 'Eliminar producto',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar'
    });
  }

  delete(): void {
    this.store.dispatch(new DeleteProductAction(this.product.id!));
  }

  closeDialog(): void {
    this.confirmationService.close();
  }

  onChange($event: any) {
    this.category = this.store.selectSnapshot(CategoryState.getCategories).find(x => x.categoryId === $event.value)!;
  }
}
