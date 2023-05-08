import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { Observable } from 'rxjs';
import { CustomerCompany, CustomerParticular, ResponseHttp, Supplier } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {


  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getCustomerParticulars() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/customer/particular");
  }

  deleteCustomerParticular(id:number) : Observable<ResponseHttp> {
    return this.http.delete<ResponseHttp>(this.baseUrl + "/customer/particular/"+id);
  }

  postCustomerParticular(customer:CustomerParticular) : Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(this.baseUrl + "/customer/particular", customer);
  }

  putCustomerParticular(customer:CustomerParticular) : Observable<ResponseHttp> {
    return this.http.put<ResponseHttp>(this.baseUrl + "/customer/particular", customer);
  }

  getCustomersCompany() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/customer/company");
  }

  deleteCustomerCompany(id:number) : Observable<ResponseHttp> {
    return this.http.delete<ResponseHttp>(this.baseUrl + "/customer/company/"+id);
  }

  postCustomerCompany(customer:CustomerCompany) : Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(this.baseUrl + "/customer/company", customer);
  }

  putCustomerCompany(customer:CustomerCompany) : Observable<ResponseHttp> {
    return this.http.put<ResponseHttp>(this.baseUrl + "/customer/company", customer);
  }

  getSuppliers() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/supplier");
  }

  deleteSupplier(id:number) : Observable<ResponseHttp> {
    return this.http.delete<ResponseHttp>(this.baseUrl + "/supplier"+id);
  }

  postSupplier(supplier:Supplier) : Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(this.baseUrl + "/supplier", supplier);
  }

  putSupplier(supplier:Supplier) : Observable<ResponseHttp> {
    return this.http.put<ResponseHttp>(this.baseUrl + "/supplier", supplier);
  }
}
