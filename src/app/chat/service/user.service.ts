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


  getamis (id_sender : number) :Observable<User[]> {
  return  this.http.get<User[]>(`${api}/client/amis/`+id_sender)
  }

}
