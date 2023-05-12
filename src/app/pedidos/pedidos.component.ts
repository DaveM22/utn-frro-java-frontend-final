import { Component, OnInit } from '@angular/core';
import { Order, OrderView } from 'src/models/models';
import { OrderService } from 'src/services/orders/order.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  orders!:OrderView[]

  cols!: any[];
  exportColumns!: any[];
  constructor(private pedidoService:OrderService){

  }

  ngOnInit(): void {
    this.pedidoService.getOrders().subscribe((res) => {
      this.orders = res.payload as OrderView[];
    });

    this.cols = [
      { field: 'dateFrom', header: 'Fecha pedido' },
      { field: 'customerName', header: 'Cliente' },
      { field: 'amountProducts', header: 'Cantidad de productos' }
  ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
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
