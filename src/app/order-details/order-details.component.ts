import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderReport } from 'src/models/models';
import { GetOrderByIdForReportAction } from 'src/store/actions/order.action';
import { OrderState } from 'src/store/states/order.state';
import { CreatorPdfComponent } from '../components/creator-pdf/creator-pdf.component';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})



export class OrderDetailsComponent implements OnInit {
  @ViewChild('pdf', {read: ElementRef}) download!: ElementRef;
  @Select(OrderState.getOrderReport) orderReport$!:Observable<OrderReport>
  totals!:number;
  subtotal!:number;
  orderId!:number;
  orderReport!:OrderReport;
  cols!: any[];
  exportColumns!: any[];
  constructor(private store:Store, private route:ActivatedRoute){

  }

  ngOnInit(): void {
    
    this.orderId = this.route.snapshot.params['id'];
    this.store.dispatch(new GetOrderByIdForReportAction(this.orderId)).subscribe(x => {
      this.orderReport$.subscribe(x => {
        this.orderReport = x
        this.orderReport.details.forEach(x => this.orderReport.total = x.total);
      });
    });

    this.cols = [
      { field: 'productName', header: 'Producto' },
      { field: 'supplierName', header: 'Proveedor' },
      { field: 'amount', header: 'Cantidad' },
      { field: 'price', header: 'Precio Unitario'},
      { field: 'total', header: 'Total'}
  ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }


  exportPdf() {
    var doc = new jsPDF('p', 'pt', 'a4');
    doc.html(document.getElementsByName("table")[0], {
      callback: function (doc) {
        doc.save();
      }
   });
  }
}
