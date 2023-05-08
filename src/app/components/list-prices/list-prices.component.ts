import { Component, Input } from '@angular/core';
import { Prices } from 'src/models/models';
import { PriceService } from 'src/services/prices/price.service';

@Component({
  selector: 'app-list-prices',
  templateUrl: './list-prices.component.html',
  styleUrls: ['./list-prices.component.scss']
})
export class ListPricesComponent {


  @Input() prices!: Prices[]

  constructor(private priceService:PriceService){
    
  }
}
