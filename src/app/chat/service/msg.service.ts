import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { message } from '../model/msg.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { api } from 'src/app/api';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(private http: HttpClient) { }

  
  getMsgBy2Id(receiver_id: number, sender_id: number = 1): Observable<message[]> {
    const params = { receiver_id: receiver_id.toString(), sender_id: sender_id.toString() };
    return this.http.get<message[]>(`${api}/your_endpoint`, { params });
  }
}
