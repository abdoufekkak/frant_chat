import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../model/post.model';
import { api, api2 } from 'src/app/api';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  GetAllpost(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${api2}/profile/` + id);
  }
  reactPost(id: number, id_user: number) {
    return this.http.post(`${api2}/profile/react/${id}`, {
      id_post: id,
      id_user,
    });
  }
  createPost(post: Post) {
    return this.http.post(`${api2}/profile/`, post);
  }
  deletePost(id: number) {
    return this.http.delete(`${api2}/profile/${id}`);
  }
}
