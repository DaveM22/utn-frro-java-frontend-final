import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderReport } from 'src/models/models';
import { GetOrderByIdForReportAction } from 'src/store/actions/order.action';
import { OrderState } from 'src/store/states/order.state';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})



export class OrderDetailsComponent implements OnInit {
  @ViewChild('pdf', {read: ElementRef}) download!: ElementRef;
  @Select(OrderState.getOrderReport) orderReport$!:Observable<OrderReport>
  orderId!:number;
  orderReport!:OrderReport;
  cols!: any[];
  exportColumns!: any[];
  constructor(private store:Store, private route:ActivatedRoute){

  }

  ngOnInit(): void {
    
    this.orderId = this.route.snapshot.params['id'];
    this.store.dispatch(new GetOrderByIdForReportAction(this.orderId)).subscribe(x => {
      this.orderReport$.subscribe(x => this.orderReport = x);
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
    let img;
    let newImage;
    const filename = 'mypdf_'+'.pdf';
    // This should provide you latest element.
    const node = this.download.nativeElement;
    console.log(node);
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');

            // Estilos
            const titleStyle = { 'font-size': 20, align: 'center', color: [53, 71, 92] };
            const textStyle = { fontSize: 14 };
            const tableStyle = { startY: 100 };
            const headerStyle = { fontSize: 14, textColor: [53, 71, 92] };
            const valueStyle = { fontSize: 14, textColor: [0, 0, 0] };
      
            // Datos de la factura/pedido
            const title = 'Reporte Factura';
            const cliente = 'Juan Pérez';
            const email = 'juan@example.com';
            const direccion = 'Calle Principal 123';
            const descuento = '5%';

            doc.setFontSize(20);
            doc.text(title, doc.internal.pageSize.getWidth() / 2, 20,{align:"center"});
/*             const titleWidth = doc.getTextWidth(title); // Ancho del título
            const startX = 105 - titleWidth / 2; // Posición de inicio de la línea
      
            // Agregar la línea separadora
            doc.setLineWidth(0.5);
            doc.line(startX, 45, startX + titleWidth, 45); */
            doc.setFontSize(14);
            doc.text('Cliente:', 20, 50);
            doc.text(this.orderReport.customerName, 60, 50);
            doc.text('Email:', 240, 50);
            doc.text(this.orderReport.email, 280, 50);
            doc.text('Dirección:', 20, 65);
            doc.text(this.orderReport.direction, 70, 65);
            doc.text('Descuento:', 20, 80);
            doc.text(descuento, 75, 80);
/*             doc.text('Total:', 20, 110);
            doc.text(this.orderReport.details.reduce((acumulador, objeto) => acumulador + objeto.total, 0).toString(), 80, 110);

             */
            (doc as any).autoTable(this.exportColumns, this.orderReport.details, {
              startY: tableStyle.startY,
              showHead: 'firstPage', // Mostrar el encabezado en la primera página
              theme: 'grid', // Estilo de la tabla (opcional, puedes cambiarlo)
              styles: { fontSize: 12 },
              headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Estilo de la cabecera
              margin: { top: 400 }, // Margen superior de la tabla
            });
            doc.save('factura.pdf');
        });
    });

  }  
}
