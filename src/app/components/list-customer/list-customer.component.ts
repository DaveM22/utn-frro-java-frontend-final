import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CustomerCompany, CustomerParticular } from 'src/models/models';
import { ListParticularComponent } from '../list-particular/list-particular.component';
import { ListCompanyComponent } from '../list-company/list-company.component';
import { Select, Store } from '@ngxs/store';
import { OrderState } from 'src/store/states/order.state';
import { Observable } from 'rxjs';
import { StepCreatePedido } from 'src/store/actions/util.actions';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  @Select(OrderState.getCustomer) customerSelected$!:Observable<any>
  options!:any[]
  selectedType!:any
  products!:any[]
  customer:any;

  constructor(private store:Store){

  }


  ngOnInit(): void {
    this.options = [
      { name: 'Empresa', code: 1 },
      {name:'Particular', code:2}
  ];

  this.selectedType = this.options[0]


  this.customerSelected$.subscribe(x => {
    this.customer = x;
  })
}


returnToProducts(){
  this.store.dispatch(new StepCreatePedido(2));
}


}
