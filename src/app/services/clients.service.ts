import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/globals';
@Injectable({
    providedIn: 'root',
})
export class ClientsService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(API_URL + 'clients/');
    }
    add(object: any): Observable<any> {
        return this.http.post(API_URL + 'clients/save', object);
    }
    delete(id: any): Observable<any> {
        return this.http.delete(API_URL + `clients/${id}/delete`);
    }
    deleteAjax(id: any): Observable<any> {
      return this.http.delete(API_URL + `clients/${id}/delete`);
  }
    update(id: any, data: object | FormData): Observable<any> {
        if (data instanceof FormData) {
          return this.http.put(API_URL + `clients/update`, data);
        } else {
          return this.http.put(API_URL + `clients/update`, data);
        }
      }
    getById(id: any): Observable<any> {
        return this.http.get(API_URL + `clients/${id}/getClient`);
    }
}
