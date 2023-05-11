import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  productSupplierForm!: FormGroup;
  constructor(
    private productoProveedorService:ProductoProveedorService, 
    private route:ActivatedRoute,
    private personaService:PersonaService,
    private fb:FormBuilder){

  }

  ngOnInit(): void {
    this.productSupplierForm = this.fb.group({
      amount: this.fb.control(0),
      productSupplier: this.fb.control({})
    });
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

  addSupplier(){
    console.log(this.productSupplierForm.value);
  }

  editarProductoProveedorDialog(){
    this.productoProveedorDialog = true;   
  }




}
