import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductSupplier, ProductSupplierOrder } from 'src/models/models';
import { CreateOrderDetailsAction } from 'src/store/actions/order.action';
import { StepCreatePedido } from 'src/store/actions/util.actions';
import { OrderState } from 'src/store/states/order.state';

@Component({
  selector: 'app-list-product-amount',
  templateUrl: './list-product-amount.component.html',
  styleUrls: ['./list-product-amount.component.scss']
})
export class ListProductAmountComponent implements OnInit {
  @Select(OrderState.productSelected) orders!:Observable<ProductSupplierOrder[]>

  @Output() productsAmount$: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedProducts: ProductSupplierOrder[] = [];

  clonedProducts: { [s: string]: ProductSupplierOrder } = {};
  products: ProductSupplierOrder[] = [];

  constructor(private store:Store){ 

    this.setTableMaxHeight();
   }

  ngOnInit(): void {
    this.onResize();
    this.orders.subscribe(x => {
      this.products = x;
    })

    
  }


  setTableMaxHeight() {
    const windowHeight = window.innerHeight;
  }


  isMobileScreen: boolean = false;
  isDesktopScreen: boolean = false;


  // Suscribirse al evento "resize" del objeto window para detectar cambios en el tamaño de pantalla
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileScreen = window.innerWidth <= 960;
    this.isDesktopScreen = window.innerWidth > 960;
  }


  confirmAmounts() {
    this.store.dispatch(new CreateOrderDetailsAction(this.products));
  }

  returnToProducts(){
    this.store.dispatch(new StepCreatePedido(2));
  }

  getselectedProductsLenght() {
    if (this.selectedProducts === undefined) {
      return 0;
    }
    return this.selectedProducts.length;
  }

  getProductosCompletos(): number {
    return this.products.filter(x => x.amountOrder !== null && x.amountOrder !== undefined && x.amountOrder !== 0).length;
  }

  onRowEditInit(product: ProductSupplierOrder, index:number) {
    this.clonedProducts[index] = { ...product };
  }

  onRowEditSave(product: ProductSupplierOrder, index:number) {
      delete this.clonedProducts[index];
  }

  onRowEditCancel(product: ProductSupplierOrder, index: number) {
    this.products[index] = this.clonedProducts[index];
    delete this.clonedProducts[index];
  }

  onRowSelect(event:any){
  }
}
