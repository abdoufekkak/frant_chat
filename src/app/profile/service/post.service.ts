import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../model/post.model';
import { api } from 'src/app/api';
@Injectable({
  providedIn: 'root',
})
export class postService {
  constructor(private http: HttpClient) {}

  GetAllpost(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${api}/profile/` + id);
  }
  reactPost(id: number) {
    return this.http.post(`${api}/profile/react/${id}`, null);
  }
  createPost(post: Post) {
    return this.http.post(`${api}/profile/`, post);
  }
  deletePost(id: number) {
    return this.http.delete(`${api}/profile/${id}`);
  }
}
