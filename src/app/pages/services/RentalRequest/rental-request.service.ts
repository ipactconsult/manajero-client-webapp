import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  sendRequest(user:User): Observable<User> {
    return this.http.post<User>(environment.apiRequest+'api/v1/rentalRequest/sendRequest', user, this.httpOptions);
  }
}
