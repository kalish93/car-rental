import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOGIN_URL, REGISTERATION_URL } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
   accessToken = localStorage.getItem('accessToken');

   headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(LOGIN_URL, { email, password });
  }

  register(registrationData: any): Observable<any> {
    return this.http.post<any>(REGISTERATION_URL, registrationData);
  }
}
