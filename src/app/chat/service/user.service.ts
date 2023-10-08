import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';
import { api } from 'src/app/api';
@Injectable({
  providedIn: 'root'
})
export class UserService {
   

  constructor(private http: HttpClient) { }


  getamis () :Observable<User[]> {
  return  this.http.get<User[]>(`${api}/ami`)
  }
  
}
