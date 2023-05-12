import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError } from 'rxjs';
import { Category, Product, ResponseHttp } from 'src/models/models';
import { CategoriasService } from 'src/services/categorias/categorias.service';
import { LocationService } from 'src/services/localidad/localidad.service';
import { ProductoService } from 'src/services/productos/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
productos:Product[] = [];
categories:Category[] = []
isMobile = false;
product!:Product
category!:Category;
submitted!:boolean;
productDialog!:boolean;
  productForm = this.fb.group({
    id:[0],
    description:['', Validators.required],
    category:[{}, Validators.required],
    amount:[0]
  });
  isEditForm: any;
constructor(
  private service:ProductoService,  
  private confirmationService:ConfirmationService,
  private categoryService:CategoriasService,
  private messageService:MessageService,
  private router:Router,
  private fb:FormBuilder
){}


  
  ngOnInit(): void {
    this.service.getProducts().subscribe((res) => this.productos = res.payload as Product[]);
    this.categoryService.listaCategorias().subscribe(res => this.categories = res.payload as Category[])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  onChange($event:any){
    this.category = this.categories.find(x => x.categoryId === $event.value)!;
  }

  openModalNew() {
    this.productDialog = true;
    this.isEditForm = false;
    this.productForm.reset();
  }


  save() {
    if (this.isEditForm) {
      this.edit();
    }
    else {
      this.create();
    }
  }


  edit(){
    this.product = this.productForm.value as Product;
    this.product.categoryId = this.category.categoryId;
    this.product.categoryName = this.category.name;
    this.service.putProducts(this.product).subscribe({
      next:(res) => {
        let response = res.payload as Product;
        this.messageService.add({ severity: 'success', summary: 'Editar producto', detail: res.message, life: 3000 });
        this.productos[this.productos.findIndex(z => z.id === response.id)] = response;
        this.productDialog = false;
      },
      error:(err) => {
        this.messageService.add({ severity: 'error', summary: 'Editar producto', detail: err.error.errorMessage, life: 3000 });
      }
    })
  }

  create(){
    this.product.categoryId = this.category.categoryId;
    this.service.postProducts(this.product).subscribe({
      next:(res) => {
        this.messageService.add({ severity: 'success', summary: 'Crear producto', detail: res.message, life: 3000 });
        this.productos.push(res.payload as Product);
        this.productDialog = false;
      },
      error:(err) => {
        this.messageService.add({ severity: 'error', summary: 'Crear producto', detail: err.error.errorMessage, life: 3000 });
      }
    });
  }

  CerrarDialog(){
    this.submitted = false;
    this.productDialog = false;
  }

  routeProductSupplier(producto: Product){
    this.router.navigate(['/productos-proveedores', producto.id]);
  }



  editProductForm(product:Product ) {
    this.productForm.patchValue(product);
    this.category = this.categories.find(x => x.categoryId === product.categoryId)!;
    this.isEditForm = true;
    this.productDialog = true;
  }

  deleteProduct(producto: Product){
    this.product = producto;
    this.confirmationService.confirm({message: '¿Estas seguro de borrar el siguiente producto: ' + this.product.description + '?',
    header: 'Eliminar producto',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel:'Aceptar',
    rejectLabel:'Cancelar'
    });
  }

  deleteProductForm(){
    this.service.deleteProduct(this.product.id)
    .subscribe(
    {
      next:(res) => {
        this.messageService.add({ severity: 'success', summary: 'Eliminar producto', detail: res.message, life: 3000 });
        this.productos = this.productos.filter((val) => val.id !== this.product.id);
        this.product = {id:0, categoryId:0, categoryName:'', description:'', amount:0};
        this.closeConfirm();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Eliminar producto', detail: err.error.errorMessage, life: 3000 });
      }
    });
  }

  closeConfirm(){
    this.confirmationService.close();
  }

}
