import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Prices, Product, ProductSupplier, Supplier } from 'src/models/models';
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
  supplier!:ProductSupplier
  submitted!:boolean;
  prices!:Prices[]
  productSupplierForm = this.fb.group({
    amount: [null, Validators.required],
    supplier: [null, Validators.required]
  });


  constructor(
    private productoProveedorService:ProductoProveedorService, 
    private route:ActivatedRoute,
    private personaService:PersonaService,
    private messageService:MessageService,
    private fb:FormBuilder){

  }

  onRowUnselect($event:any){
    this.productSupplierForm.get('supplier')?.setValue(null);
    this.productSupplierForm.get('supplier')?.markAllAsTouched()
    this.productSupplierForm.get('supplier')?.markAsDirty();
    console.log(this.productSupplierForm.get('supplier'))
  }

  onRowSelect($event:any) {
    this.productSupplierForm.get('supplier')!.setValue($event.data);
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



  addSupplier(){
    console.log(this.productSupplierForm);
  }

  editarProductoProveedorDialog(){
    this.productoProveedorDialog = true;   
  }

  save(){
    let obj = this.productSupplierForm.value.supplier! as Supplier;
    let amount = this.productSupplierForm.value.amount;
    this.supplier = {personaId: obj.id, cuit: obj.cuit, productName: obj.businessName, supplierName: obj.businessName, amount: amount!, productId: this.idProducto, prices:[], validityPrice:0};
    this.productoProveedorService.postProductSupplier(this.supplier).subscribe({
      next:(res) => {
        let response = res.payload as ProductSupplier;
        this.messageService.add({ severity: 'success', summary: 'Agregar nuevo proveedor', detail: res.message, life: 3000 });
        this.productoProveedorDialog = false;
        this.productoProveedores.push(response);
      },
      error:(err) => {
        this.messageService.add({ severity: 'error', summary: 'Error al agregar proveedor', detail: err.error.errorMessage, life: 3000 });
      }

    });
  }


}
