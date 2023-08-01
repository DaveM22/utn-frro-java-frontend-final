import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Discount, OrderDetail, ProductSupplierOrder } from 'src/models/models';
import { DiscountService } from 'src/services/discount/discount.service';
import { GetDiscountTodayAction } from 'src/store/actions/discount.action';
import { FinishOrderAction } from 'src/store/actions/order.action';
import { DiscountState } from 'src/store/states/discount.state';
import { OrderState } from 'src/store/states/order.state';

@Component({
  selector: 'app-resume-order',
  templateUrl: './resume-order.component.html',
  styleUrls: ['./resume-order.component.scss']
})
export class ResumeOrderComponent implements OnInit {
  @Select(OrderState.getOrderDetails) orders!:Observable<OrderDetail[]>
  @Select(DiscountState.getDiscountToday) discountToday!:Observable<Discount[]>
  @Select(OrderState.getSubtotal) getSubtotal!:Observable<number>
  @Select(OrderState.getCustomer) customer$!:Observable<any>
  @Output() finishOrder$:EventEmitter<any> = new EventEmitter<any>();
  
  @Input() productsOrder!:ProductSupplierOrder[]
  totals!:number;
  subtotal!:number;
  discounts!:Discount[]
  discount!:number;
  customer!:any;

  productOrders!: ProductSupplierOrder[]
  descuentoSeleccionado!: number;

  constructor(private store:Store){
    this.onResize();
    this.customer$.subscribe(x => {
      this.customer = x
    });
  }


  isMobileScreen: boolean = false;
  isDesktopScreen: boolean = false;


  // Suscribirse al evento "resize" del objeto window para detectar cambios en el tamaño de pantalla
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileScreen = window.innerWidth <= 514;
    this.isDesktopScreen = window.innerWidth > 514;
  }





  ngOnInit(): void {
    this.discountToday.subscribe(x => {
      this.discounts = x
    })

    this.getSubtotal.subscribe(x => {
      this.subtotal = x;
    })

    this.store.dispatch(new GetDiscountTodayAction);
 
    this.discountToday.subscribe( x => {
      this.discounts = x
      this.calcularDescuento();
    })    
  }

  finishOrder(){
    this.store.dispatch(new FinishOrderAction());
  }

   getTotal(cantidad:number, precio:number): number {
    return cantidad * precio;
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

  calcularDescuento() {
    // Función para calcular el descuento según la cantidadPedida
    this.descuentoSeleccionado = 0; // Establece el descuento predeterminado en 0

    for (const descuento of this.discounts.sort(x => x.amountPrice!)) {
       if(this.subtotal >= descuento.amountPrice!){
        this.discount = descuento.discount!;
        break;
       }
    }

  }
}
