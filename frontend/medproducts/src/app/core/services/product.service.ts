import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import {environment} from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  postProduct(data: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}create-product/`, data);
  }
  getProducts(){
    return this.http.get<any>(`${environment.apiUrl}list-products/`);
  }
  getProduct( id: number){
    return this.http.get<any>(`${environment.apiUrl}get-product/`+id);
  }
  putProduct(data: any, id: number): Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}update-product/`+id, data);
  }
  deletetProduct(id: number): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}delete-product/`+id);
  }

}
