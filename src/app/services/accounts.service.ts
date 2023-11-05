import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/globals';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

    constructor(private http: HttpClient) { }

    getAll(id: any): Observable<any> {
        return this.http.get(API_URL + `comptes/${id}/`);
    }
    add(object: any): Observable<any> {
        console.log(object.values)
        return this.http.post(API_URL + 'comptes/save', object);
    }
    delete(id: any): Observable<any> {
        return this.http.delete(API_URL + `comptes/${id}/delete`);
    }
    update(id: any,data: object | FormData): Observable<any> {
        if (data instanceof FormData) {
          return this.http.put(API_URL + `comptes/update`, data);
        } else {
          return this.http.put(API_URL + `comptes/update`, data);
        }
      }
    getById(id: any): Observable<any> {
        return this.http.get(API_URL + `comptes/${id}/getCompte`);
    }
}
