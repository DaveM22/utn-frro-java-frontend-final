import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CustomerCompany, CustomerParticular } from 'src/models/models';
import { ListParticularComponent } from '../list-particular/list-particular.component';
import { ListCompanyComponent } from '../list-company/list-company.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent {
  @ViewChild(ListParticularComponent) particularChild!: ListParticularComponent;
  @ViewChild(ListCompanyComponent) companyChild!: ListCompanyComponent;
  @Output() confirmCustomer$: EventEmitter<any> = new EventEmitter<any>();
  @Input() customer:any;


  selectedCustomerParticular(){
    this.companyChild.customerCompany = null;
  }

  selectedCustomerCompany(){
    this.particularChild.customerParticular = null;
  }


  confirmCustomerParticular(event:CustomerParticular){
    this.customer = event;
    this.confirmCustomer$.emit({customer:this.customer, nextIndex:1});
  }

  confirmCustomerCompany(event:CustomerCompany){
    this.customer = event;
    this.confirmCustomer$.emit({customer:this.customer, nextIndex:1});
  }

}
