import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Price, Product, ProductSupplier, Supplier } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';
import { ProductoProveedorService } from 'src/services/producto-proveedor/producto-proveedor.service';
import { AddProductSupplierAction, EditProductSupplierAction, ProductSupplierByProductAction } from 'src/store/actions/product-supplier.action';
import { SupplierListAction } from 'src/store/actions/supplier.action';
import { FormActivate, ModalStockAction } from 'src/store/actions/util.actions';
import { ProductSupplierState } from 'src/store/states/product-supplier.state,';
import { SupplierState } from 'src/store/states/supplier.state';
import { UtilState } from 'src/store/states/util.state';

@Component({
  selector: 'app-producto-proveedores',
  templateUrl: './producto-proveedores.component.html',
  styleUrls: ['./producto-proveedores.component.scss']
})
export class ProductoProveedoresComponent implements OnInit {

  @Select(SupplierState.getSuppliers) suppliers!:Observable<Supplier[]>
  @Select(ProductSupplierState.getProductTitle) title!:Observable<string>
  @Select(ProductSupplierState.getProductSupplier) productSuppliers!:Observable<ProductSupplier[]>
  @Select(UtilState.modalForm) modal!:Observable<boolean>
  @Select(UtilState.getModalAddStock) modalAddStock!:Observable<boolean>

  idProducto!:number
  titulo!:String
  productoProveedorDialog!:boolean
  supplier!:ProductSupplier
  submitted!:boolean;
  prices!:Price[]
  productSupplierForm = this.fb.group({
    amount: [null, Validators.required],
    supplier: [null, Validators.required]
  });

  addStockForm = this.fb.group({
    amount:[0, Validators.required]
  })

  constructor(
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private store:Store){

  }

  onRowUnselect($event:any){
    this.productSupplierForm.get('supplier')?.setValue(null);
    this.productSupplierForm.get('supplier')?.markAllAsTouched()
    this.productSupplierForm.get('supplier')?.markAsDirty();
  }

  onRowSelect($event:any) {
    this.productSupplierForm.get('supplier')!.setValue($event.data);
  }

  ngOnInit(): void {

    this.idProducto = this.route.snapshot.params['idProducto'];
    this.store.dispatch(new ProductSupplierByProductAction(this.idProducto));
    this.store.dispatch(new SupplierListAction);
  }

  addSupplier(){
  }

  openModalAddStock(supplier:ProductSupplier){
    this.supplier = supplier;
    this.store.dispatch(new ModalStockAction(true));
  }

  closeModalAddStock(){
    this.store.dispatch(new ModalStockAction(false));
  }


  openModalForm(){
    this.store.dispatch(new FormActivate(true));   
  }

  closeModalForm(){
    this.store.dispatch(new FormActivate(false));
    this.productSupplierForm.reset();
  }

  save(){
    let obj = this.productSupplierForm.value.supplier! as Supplier;
    let amount = this.productSupplierForm.value.amount;
    this.supplier = {personaId: obj.id!, cuit: obj.cuit!, productName: obj.businessName!, supplierName: obj.businessName!, amount: amount!, productId: this.idProducto, prices:[], validityPrice:0};
    this.store.dispatch(new AddProductSupplierAction(this.supplier));
  }

  saveAddAmount(){
    this.supplier.amount = this.supplier.amount + (this.addStockForm.getRawValue().amount!)
    this.store.dispatch(new EditProductSupplierAction(this.supplier));
  }

}
