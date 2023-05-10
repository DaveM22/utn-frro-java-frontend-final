import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Supplier } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';

@Component({
  selector: 'app-product-supplier-form',
  templateUrl: './product-supplier-form.component.html',
  styleUrls: ['./product-supplier-form.component.scss']
})
export class ProductSupplierFormComponent implements OnInit {
  
  productId!:number;

  supplierId!:number;
  amount!:number;
  dialogVisible!:boolean;

  supplierName!:string

  constructor(
    private service:ProductoProveedorService,
    private route:ActivatedRoute, 
    private router: Router,
    private messageService:MessageService){

  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['idProducto'];
  }

  supplierChange($event:any){
    this.dialogVisible = false;
    this.supplierId = $event.id;
    this.supplierName = $event.businessName;
  }

  showDialog() {
    this.dialogVisible = true;
  }

  addSupplier(){
    let obj = {productId: this.productId,cuit:'',productName:'',supplierName:'', personaId:this.supplierId, amount:this.amount, prices:[], validityPrice:0};
    this.service.postProductSupplier(obj).subscribe((res) => {
      this.router.navigate(['/productos-proveedores/'+ this.productId]);
      this.messageService.add({ severity: 'success', summary: 'Agregar proveedor', detail: res.message, life: 3000 });
    })
  }

}
