import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { CustomerCompany } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';
import { CustomerCompanyListAction } from 'src/store/actions/customer-company.action';
import { ConfirmCustomerAction } from 'src/store/actions/order.action';
import { StepCreatePedido } from 'src/store/actions/util.actions';
import { CustomerCompanyState } from 'src/store/states/customer.company.state';
import { OrderState } from 'src/store/states/order.state';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit {

  @Select(OrderState.getCustomer) customerSelected$!:Observable<any>
  @Select(CustomerCompanyState.getCustomerCompany) customersSelected$!:Observable<CustomerCompany[]>
  @ViewChild('dt') dt!: Table;
  @Output() confirmCustomer$: EventEmitter<CustomerCompany> = new EventEmitter<CustomerCompany>();
  @Output() selectedCustomer$: EventEmitter<CustomerCompany> = new EventEmitter<CustomerCompany>();
  customersCompany!:CustomerCompany[];
  @Input() customerCompany!:CustomerCompany | null;
  emptyMessage!:string;
  constructor(private store:Store){

  }

  ngOnInit(): void {
    this.store.dispatch(new CustomerCompanyListAction());
    this.customersSelected$.subscribe(x => this.customersCompany = x );
    this.customerSelected$.subscribe(x => this.customerCompany = x );
  }

  unselected(){
    this.customerCompany = null;
  }

  selected(){
  }

  confirmCustomer(){
    this.store.dispatch(new ConfirmCustomerAction(this.customerCompany!));
  }

  returnToProducts(){
    this.store.dispatch(new StepCreatePedido(2));
  }

}
