import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CustomerParticular } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';
import { CustomerParticularListAction } from 'src/store/actions/customer-particular.action';
import { ConfirmCustomerAction, OrderCustomerAction } from 'src/store/actions/order.action';
import { StepCreatePedido } from 'src/store/actions/util.actions';
import { CustomerParticularState } from 'src/store/states/customer.particular.state';
import { OrderState } from 'src/store/states/order.state';

@Component({
  selector: 'app-list-particular',
  templateUrl: './list-particular.component.html',
  styleUrls: ['./list-particular.component.scss']
})
export class ListParticularComponent implements OnInit {
  @Select(OrderState.getCustomer) customerSelected$!:Observable<any>
  @Select(CustomerParticularState.getCustomerParticular) customersParticular$!:Observable<CustomerParticular[]>
  customersParticular!:CustomerParticular[];
  customerParticular!:CustomerParticular | null;
  emptyMessage!:string;

  constructor(private personaService:PersonaService, private store:Store){

  }

  ngOnInit(): void {
    this.store.dispatch(new CustomerParticularListAction());
    this.customersParticular$.subscribe(x => this.customersParticular = x)
    this.customerSelected$.subscribe(x => this.customerParticular = x);
  }

  unselected(){
    this.customerParticular = null;
  }

  selected(){
    
  }

  confirmCustomer(){
    this.store.dispatch(new ConfirmCustomerAction(this.customerParticular!));
  }

  returnToProducts(){
    this.store.dispatch(new StepCreatePedido(2));
  }

}
