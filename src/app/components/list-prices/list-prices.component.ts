import { Component, Input } from '@angular/core';
import { Price } from 'src/models/models';
import { PriceService } from 'src/services/prices/price.service';

@Component({
  selector: 'app-list-prices',
  templateUrl: './list-prices.component.html',
  styleUrls: ['./list-prices.component.scss']
})
export class ListPricesComponent {


  @Input() prices!: Price[]

  constructor(private priceService:PriceService){
    
  }
}
