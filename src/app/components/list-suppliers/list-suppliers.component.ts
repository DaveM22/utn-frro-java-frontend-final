import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Supplier } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';

@Component({
  selector: 'app-list-suppliers',
  templateUrl: './list-suppliers.component.html',
  styleUrls: ['./list-suppliers.component.scss']
})
export class ListSuppliersComponent implements OnInit {
  @Output() supplierChange$: EventEmitter<any> = new EventEmitter<any>();



  suppliers!:Supplier[];
  supplier!:Supplier;


  constructor(private service:PersonaService)
  {

  }

  ngOnInit(): void {
    this.service.getSuppliers().subscribe(x => {
      this.suppliers = x.payload as Supplier[];
    });
  }

  selected(entity:Supplier): void {
    this.supplierChange$.emit(entity);
  }
}
