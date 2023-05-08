import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CustomerCompany } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  @Output() confirmCustomer$: EventEmitter<CustomerCompany> = new EventEmitter<CustomerCompany>();
  @Output() selectedCustomer$: EventEmitter<CustomerCompany> = new EventEmitter<CustomerCompany>();
  customersCompany!:CustomerCompany[];
  @Input() customerCompany!:CustomerCompany | null;
  emptyMessage!:string;
  constructor(private personaService:PersonaService){

  }

  ngOnInit(): void {
    this.personaService.getCustomersCompany().subscribe((res) => {
      this.customersCompany = res.payload as CustomerCompany[];
    });
  }

  unselected(){
    this.customerCompany = null;
  }

  selected(){
    this.selectedCustomer$.emit();
  }

  confirmCustomer(){
    this.confirmCustomer$.emit(this.customerCompany!);
  }

}
