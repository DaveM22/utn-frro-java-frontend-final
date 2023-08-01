import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-costumer',
  templateUrl: './costumer.component.html',
  styleUrls: ['./costumer.component.scss']
})
export class CostumerComponent implements OnInit {
  options!:any[]
  selectedType:any;

  ngOnInit(): void {
    this.options = [
      { name: 'Empresa', code: 1 },
      {name:'Particular', code:2}
  ];
  
  this.selectedType = this.options[0]



  }
  activeIndex: any;


  setIndex($event:any){
    this.activeIndex = $event.nextIndex;
  }
}
