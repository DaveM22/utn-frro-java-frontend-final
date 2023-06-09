import { Component, OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Province } from 'src/models/models';
import { AddLocationAction } from 'src/store/actions/location.actions';
import { ProvinceListAction } from 'src/store/actions/province.actions';
import { ProvinceState } from 'src/store/states/province.state';

@Component({
  selector: 'app-location-form-modal',
  templateUrl: './location-form-modal.component.html',
  styleUrls: ['./location-form-modal.component.scss']
})
export class LocationFormModalComponent implements OnInit {
  @Select(ProvinceState.getProvinces) provinces$!: Observable<Province[]>;
  locationForm = this.fb.group({
    postalCode: [0, Validators.required],
    city: ['', Validators.required],
    provinceCode: [0, Validators.required],
    provinceName:['']
  });
  provincias: Province[] = [];
  provincia!: Province;

  constructor(private fb:NonNullableFormBuilder, private store:Store){}


  ngOnInit(): void {
    this.store.dispatch(new ProvinceListAction());
  }

  onChange(event: any) {
    console.log(event);
    this.provincia = event;
  }

  save(){
    let obj = this.locationForm.getRawValue();
    this.store.dispatch(new AddLocationAction(obj));
  }

}
