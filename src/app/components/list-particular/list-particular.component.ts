import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerParticular } from 'src/models/models';
import { PersonaService } from 'src/services/persona/persona.service';

@Component({
  selector: 'app-list-particular',
  templateUrl: './list-particular.component.html',
  styleUrls: ['./list-particular.component.scss']
})
export class ListParticularComponent implements OnInit {

  @Output() confirmCustomer$: EventEmitter<CustomerParticular> = new EventEmitter<CustomerParticular>();
  @Output() selectedCustomer$: EventEmitter<any> = new EventEmitter<any>();
  customersParticular!:CustomerParticular[];
  @Input() customerParticular!:CustomerParticular | null;
  emptyMessage!:string;

  constructor(private personaService:PersonaService){

  }

  ngOnInit(): void {
    this.personaService.getCustomerParticulars().subscribe((res) => {
      this.customersParticular = res.payload as CustomerParticular[];
    });
  }

  unselected(){
    this.customerParticular = null;
  }

  selected(){
    this.selectedCustomer$.emit();
  }

  confirmCustomer(){
    this.confirmCustomer$.emit(this.customerParticular!);
  }

}
