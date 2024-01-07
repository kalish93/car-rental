import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CAR_URL } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }
  accessToken = localStorage.getItem('accessToken');

  headers = new HttpHeaders({
   'Authorization': `Bearer ${this.accessToken}`
 });

 carRegister(carData: any): Observable<any> {
   return this.http.post<any>(CAR_URL, carData, { headers: this.headers });
 }

 getCars(): Observable<any> {
   return this.http.get<any>(CAR_URL, { headers: this.headers });
 }
 getCar(id:any): Observable<any> {
   return this.http.get<any>(`${CAR_URL}/${id}`, { headers: this.headers });
 }

}
