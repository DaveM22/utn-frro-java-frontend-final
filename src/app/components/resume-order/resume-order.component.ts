import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductSupplierOrder } from 'src/models/models';

@Component({
  selector: 'app-resume-order',
  templateUrl: './resume-order.component.html',
  styleUrls: ['./resume-order.component.scss']
})
export class ResumeOrderComponent implements OnInit {

  @Output() finishOrder$:EventEmitter<any> = new EventEmitter<any>();
  @Input() productsOrder!:ProductSupplierOrder[]
  totals!:number;

  productOrders!: ProductSupplierOrder[]

  ngOnInit(): void {
    this.totals = 0;
    this.productOrders = this.productsOrder;
    if(this.productOrders !== undefined){
     this.calculateTotals(); 
    };
    
    
  }

  finish(){
    this.finishOrder$.emit(this.productOrders);
  }

  calculateTotals(){
    this.productOrders.forEach(element => {
      element.total = element.validityPrice * element.amountOrder;
      this.totals += element.total
    });
  }

  getValidResume(){
    if(this.productOrders === undefined){
      return false;
    }
    else{
      return !this.productOrders.some(x => x.amountOrder === 0 || x.amountOrder === undefined || x.amountOrder === null);
    }
  }

}
