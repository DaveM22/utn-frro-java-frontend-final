import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductSupplier, ProductSupplierOrder } from 'src/models/models';

@Component({
  selector: 'app-list-product-amount',
  templateUrl: './list-product-amount.component.html',
  styleUrls: ['./list-product-amount.component.scss']
})
export class ListProductAmountComponent implements OnInit {
  @Output() productsAmount$: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedProducts: ProductSupplierOrder[] = [];

  clonedProducts: { [s: string]: ProductSupplierOrder } = {};
  products: ProductSupplierOrder[] = [];

  ngOnInit(): void {
    if (this.selectedProducts !== undefined) {
      this.products = this.selectedProducts as ProductSupplierOrder[];
    }
  }

  confirmAmounts() {
    this.productsAmount$.emit(this.products);
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
}
