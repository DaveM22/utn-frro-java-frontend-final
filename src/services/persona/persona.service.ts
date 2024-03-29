import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CustomerCompany, CustomerParticular, ResponseHttp, Supplier } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {


  private baseUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  getCustomerParticulars() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/api/customer/particular");
  }

  deleteCustomerParticular(id:number) : Observable<ResponseHttp> {
    return this.http.delete<ResponseHttp>(this.baseUrl + "/api/customer/particular/"+id);
  }

  postCustomerParticular(customer:CustomerParticular) : Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(this.baseUrl + "/api/customer/particular", customer);
  }

  putCustomerParticular(customer:CustomerParticular) : Observable<ResponseHttp> {
    return this.http.put<ResponseHttp>(this.baseUrl + "/api/customer/particular", customer);
  }

  getCustomersCompany() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/api/customer/company");
  }

  deleteCustomerCompany(id:number) : Observable<ResponseHttp> {
    return this.http.delete<ResponseHttp>(this.baseUrl + "/api/customer/company/"+id);
  }

  postCustomerCompany(customer:CustomerCompany) : Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(this.baseUrl + "/api/customer/company", customer);
  }

  putCustomerCompany(customer:CustomerCompany) : Observable<ResponseHttp> {
    return this.http.put<ResponseHttp>(this.baseUrl + "/api/customer/company", customer);
  }

  getSuppliers() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/api/supplier");
  }

  deleteSupplier(id:number) : Observable<ResponseHttp> {
    return this.http.delete<ResponseHttp>(this.baseUrl + "/api/supplier/"+id);
  }

  postSupplier(supplier:Supplier) : Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(this.baseUrl + "/api/supplier", supplier);
  }

  putSupplier(supplier:Supplier) : Observable<ResponseHttp> {
    return this.http.put<ResponseHttp>(this.baseUrl + "/api/supplier", supplier);
  }
}
