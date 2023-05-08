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
    this.productOrders.forEach(element => {
      element.total = element.validityPrice * element.amountOrder;
      console.log(element.total);
      this.totals += element.total
      console.log(this.totals);
    });
    
  }

  finish(){
    this.finishOrder$.emit(this.productOrders);
  }


}
