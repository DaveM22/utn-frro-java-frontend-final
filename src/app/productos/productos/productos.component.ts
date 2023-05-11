import { Component, HostListener, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError } from 'rxjs';
import { Category, Producto, ResponseHttp } from 'src/models/models';
import { CategoriasService } from 'src/services/categorias/categorias.service';
import { LocationService } from 'src/services/localidad/localidad.service';
import { ProductoService } from 'src/services/productos/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
productos:Producto[] = [];
categorias:Category[] = []
isMobile = false;
producto:Producto = {id:0, idCategoria:0, categoria:'', descripcion:'', cantidad:0};
categoria!:Category;
submitted!:boolean;
productoDialog!:boolean;
constructor(
  private service:ProductoService, 
  private serviceLocalidad:LocationService, 
  private confirmacionService:ConfirmationService,
  private categoriasService:CategoriasService,
  private messageService:MessageService
){}


  
  ngOnInit(): void {
    this.service.listaProductos().subscribe((res) => this.productos = res.payload as Producto[]);
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
    this.productoDialog = true;
  }

  GuardarForm(){
    this.submitted = true;
    this.producto.idCategoria = this.categoria.id;
    this.service.agregarProducto(this.producto).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Creacíon de producto', detail: res.message, life: 3000 });
      this.productos.push(res.payload as Producto);
      this.productoDialog = false;
    });
  }

  CerrarDialog(){
    this.submitted = false;
    this.productoDialog = false;
  }



  editarLocalidad(localidad:Producto ) {
  }

  borrarProducto(producto: Producto){
    this.producto = producto;
    this.confirmacionService.confirm({message: '¿Estas seguro de borrar el siguiente producto: ' + this.producto.descripcion + '?',
    header: 'Eliminar producto',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel:'Aceptar',
    rejectLabel:'Cancelar'
    });
  }

  eliminarForm(){
    this.service.eliminarProducto(this.producto.id)
    .subscribe(
    {
      next:(res) => {
        this.messageService.add({ severity: 'success', summary: 'Eliminar producto', detail: res.message, life: 3000 });
        this.productos = this.productos.filter((val) => val.id !== this.producto.id);
        this.producto = {id:0, idCategoria:0, categoria:'', descripcion:'', cantidad:0};
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
