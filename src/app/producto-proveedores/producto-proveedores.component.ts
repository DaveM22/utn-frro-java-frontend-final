import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Prices, ProductSupplier, Supplier } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';

@Component({
  selector: 'app-producto-proveedores',
  templateUrl: './producto-proveedores.component.html',
  styleUrls: ['./producto-proveedores.component.scss']
})
export class ProductoProveedoresComponent implements OnInit {

  productoProveedores:ProductSupplier[] = []
  suppliers!:Supplier[];
  idProducto!:number
  titulo!:String
  productoProveedorDialog!:boolean
  productoProveedor!:ProductSupplier
  submitted!:boolean;
  prices!:Prices[]
  constructor(
    private productoProveedorService:ProductoProveedorService, 
    private route:ActivatedRoute,
    private personaService:PersonaService){

  }

  ngOnInit(): void {
    this.idProducto = this.route.snapshot.params['idProducto'];
    this.productoProveedorService.listaProductoProveedores(this.idProducto).subscribe(res => {
      this.productoProveedores = res.payload as ProductSupplier[];
      this.titulo = res.message;
    })
    this.personaService.getSuppliers().subscribe(x => {
      this.suppliers = x.payload as Supplier[];
    })
  }

  agregarProveedor(){

  }

  editarProductoProveedorDialog(){
    this.productoProveedorDialog = true;   
  }




}
