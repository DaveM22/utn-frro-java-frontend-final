import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PriceService } from 'src/services/prices/price.service';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.scss']
})
export class PriceFormComponent {

  priceForm = this.fb.group({
    id:[0, Validators.required],
    price:['', Validators.required],
    date:['',Validators.required],
    productId:['',Validators.required],
    personaId:['',Validators.required]
  });

  constructor(private priceService:PriceService, private fb:FormBuilder){}


}
