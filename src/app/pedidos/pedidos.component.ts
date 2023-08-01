import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Order, OrderView } from 'src/models/models';
import { OrderService } from 'src/services/orders/order.service';
import { ListOrderAction } from 'src/store/actions/order.action';
import { OrderState } from 'src/store/states/order.state';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  @Select(OrderState.getOrders) orders$!:Observable<OrderView[]>
  orders!:OrderView[]
  cols!: any[];
  exportColumns!: any[];
  constructor(private store:Store, private router:Router){

  }

  ngOnInit(): void {
    this.store.dispatch(new ListOrderAction());
    this.orders$.subscribe(x => this.orders = x );
    this.cols = [
      { field: 'dateFrom', header: 'Fecha pedido' },
      { field: 'customerName', header: 'Cliente' },
      { field: 'amountProducts', header: 'Cantidad de productos' }
  ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  showMore(orderId:number){
    this.router.navigate(['/pedidos/detalle', orderId ]);
  }


  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.orders);
            doc.save('products.pdf');
        });
    });
}
}
