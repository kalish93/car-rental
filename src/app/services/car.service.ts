import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API, CAR_URL } from '../core/api-endpoints';

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

 getAvailableCars(): Observable<any> {
   return this.http.get<any>(`${CAR_URL}/available`, { headers: this.headers });
 }
 getCar(id:any): Observable<any> {
   return this.http.get<any>(`${CAR_URL}/${id}`, { headers: this.headers });
 }

 rent(data:any): Observable<any> {
   return this.http.post<any>(`${BASE_API}/rental-transactions`, data, { headers: this.headers });
 }

 getRentHistory(pageSize: number, pageNumber: number): Observable<any> {
  const params = new HttpParams()
    .set('pageSize', pageSize.toString())
    .set('pageNumber', pageNumber.toString());

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      }),
      params: params
    };

  return this.http.get(`${BASE_API}/rent-history`,options);
}


}
