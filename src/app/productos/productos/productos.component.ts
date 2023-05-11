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
categorias:Category[] = []
isMobile = false;
producto:Product = {id:0, categoryId:0, categoriaName:'', description:'', amount:0};
categoria!:Category;
submitted!:boolean;
productDialog!:boolean;
  editarForm!: boolean;
  provinciaForm = this.fb.group({
    provinceCode:[0, Validators.required],
    name:['', Validators.required],
  });
constructor(
  private service:ProductoService, 
  private serviceLocalidad:LocationService, 
  private confirmacionService:ConfirmationService,
  private categoriasService:CategoriasService,
  private messageService:MessageService,
  private router:Router,
  private fb:FormBuilder
){}


  
  ngOnInit(): void {
    this.service.getProducts().subscribe((res) => this.productos = res.payload as Product[]);
    this.categoriasService.listaCategorias().subscribe(res => this.categorias = res.payload as Category[])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  abrirNuevo() {
    this.productDialog = true;
  }

  GuardarForm(){
    this.submitted = true;
    this.producto.categoryId = this.categoria.id;
    this.service.postProducts(this.producto).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Creacíon de producto', detail: res.message, life: 3000 });
      this.productos.push(res.payload as Product);
      this.productDialog = false;
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
    this.editarForm = true;
    this.productDialog = true;
  }

  borrarProducto(producto: Product){
    this.producto = producto;
    this.confirmacionService.confirm({message: '¿Estas seguro de borrar el siguiente producto: ' + this.producto.description + '?',
    header: 'Eliminar producto',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel:'Aceptar',
    rejectLabel:'Cancelar'
    });
  }

  eliminarForm(){
    this.service.deleteProduct(this.producto.id)
    .subscribe(
    {
      next:(res) => {
        this.messageService.add({ severity: 'success', summary: 'Eliminar producto', detail: res.message, life: 3000 });
        this.productos = this.productos.filter((val) => val.id !== this.producto.id);
        this.producto = {id:0, categoryId:0, categoriaName:'', description:'', amount:0};
        this.cerrarConfirm();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Eliminar producto', detail: err.error.errorMessage, life: 3000 });
      }
    });
  }

  cerrarConfirm(){
    this.confirmacionService.close();
  }

}
