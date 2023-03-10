import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../models/AuthUser';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  constructor(private http: HttpClient) { }

  sendRequest(user:User): Observable<User> {
     return this.http.post<User>(environment.apiRequest+'api/v1/rentalRequest/sendRequest', user, this.httpOptions);
  }

  register(auth : AuthUser): Observable<AuthUser> {
    return this.http.post<AuthUser>(environment.apiRegister+'api/auth/signup' ,auth, this.httpOptions);
  }

  validateToken(token : string): Observable<boolean> {
    return this.http.get<boolean>(environment.apiRegister+'api/auth/validateToken/'+token , this.httpOptions);
  }

  refreshToken(email: string): Observable<boolean> {
    return this.http.get<boolean>(environment.apiRequest+'rentalRequest/refreshToken/'+email , this.httpOptions);
  }

}
