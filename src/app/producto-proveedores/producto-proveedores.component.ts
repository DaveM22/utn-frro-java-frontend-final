import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoProveedor } from 'src/models/models';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';

@Component({
  selector: 'app-producto-proveedores',
  templateUrl: './producto-proveedores.component.html',
  styleUrls: ['./producto-proveedores.component.scss']
})
export class ProductoProveedoresComponent implements OnInit {

  productoProveedores:ProductoProveedor[] = []
  idProducto!:number
  titulo!:String
  productoProveedorDialog!:boolean
  productoProveedor!:ProductoProveedor
  submitted!:boolean;
  constructor(private productoProveedorService:ProductoProveedorService, private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.idProducto = this.route.snapshot.params['idProducto'];
    this.productoProveedorService.listaProductoProveedores(this.idProducto).subscribe(res => {
      this.productoProveedores = res.payload as ProductoProveedor[];
      this.titulo = res.message;
    })
  }

  editarProductoProveedorDialog(productoProveedor:ProductoProveedor){
    this.productoProveedor = productoProveedor;
    this.productoProveedorDialog = true;   
  }


}
