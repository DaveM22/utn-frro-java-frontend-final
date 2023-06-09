import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Discount, ProductSupplierOrder } from 'src/models/models';
import { DiscountService } from 'src/services/discount/discount.service';

@Component({
  selector: 'app-resume-order',
  templateUrl: './resume-order.component.html',
  styleUrls: ['./resume-order.component.scss']
})
export class ResumeOrderComponent implements OnInit {

  @Output() finishOrder$:EventEmitter<any> = new EventEmitter<any>();
  @Input() productsOrder!:ProductSupplierOrder[]
  totals!:number;
  subtotal!:number;
  discounts!:Discount[]

  productOrders!: ProductSupplierOrder[]

  constructor(private discountService:DiscountService){
    
  }
  ngOnInit(): void {
    this.totals = 0;
    this.productOrders = this.productsOrder;
    this.discountService.getDiscountsToday().subscribe(x => {
      this.discounts = x.payload as Discount[]
      if(this.productOrders !== undefined){
        this.calculateTotals(); 
       };
    });

 
    
  }

  finish(){
    this.finishOrder$.emit(this.productOrders);
  }

  calculateTotals(){
    this.productOrders.forEach(element => {
      element.total = element.validityPrice * element.amountOrder!;
      this.totals += element.total
    }
    
    );
    this.subtotal = this.totals;
    this.totals  = this.totals - this.totals * (this.getTotalDiscount(this.totals)/100);

  }

  getValidResume(){
    if(this.productOrders === undefined){
      return false;
    }
    else{
      return !this.productOrders.some(x => x.amountOrder === 0 || x.amountOrder === undefined || x.amountOrder === null);
    }
  }

  getTotalDiscount(total:number){
    let discount = 0;
    this.discounts.forEach(x => {
        if (total >= x.amountPrice! || total === x.amountPrice) {    
              discount = x.discount!;
        }
    })
    return discount;
  }
}
