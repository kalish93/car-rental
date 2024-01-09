import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_API, LOGIN_URL, REGISTERATION_URL } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn: Observable<boolean>;
  constructor(private http: HttpClient) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('accessToken'));
    this.isLoggedIn = this.isLoggedInSubject.asObservable();
   }
   accessToken = localStorage.getItem('accessToken');

   headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

  getIsLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  setLoggedInStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }
  logout(): void {
  this.setLoggedInStatus(false)
  localStorage.removeItem('accessToken');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(LOGIN_URL, { email, password });
  }

  register(registrationData: any): Observable<any> {
    return this.http.post<any>(REGISTERATION_URL, registrationData);
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${BASE_API}/profile`,{ headers: this.headers });
  }

  getPaginatedRentHistory(pageSize: number, pageNumber: number): Observable<any> {
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

    return this.http.get(`${BASE_API}/my-rent-history`,options);
  }

  getAllUsers(pageSize: number, pageNumber: number): Observable<any> {
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

    return this.http.get(`${BASE_API}/users`,options);
  }

  registerAdmin(registrationData: any): Observable<any> {
    return this.http.post<any>(`${BASE_API}/register/admin`, registrationData, {headers: this.headers});
  }
}
