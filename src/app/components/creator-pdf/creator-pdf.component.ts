import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import { OrderReport, OrderReportDetail } from 'src/models/models';

@Component({
  selector: 'app-creator-pdf',
  templateUrl: './creator-pdf.component.html',
  styleUrls: ['./creator-pdf.component.scss']
})
export class CreatorPdfComponent {
  constructor(){}

  public exportPDF() {

    var doc = new jsPDF('p', 'pt', 'a4');
    console.log(document.getElementsByTagName("div")[0])
    doc.html(document.getElementsByTagName("div")[0], {
      callback: function (doc) {
        doc.save();
      }
   });

  }

}
