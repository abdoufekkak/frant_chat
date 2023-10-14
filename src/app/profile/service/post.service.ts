import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../model/post.model';
import { api, api2 } from 'src/app/api';
@Injectable({
  providedIn: 'root',
})
export class postService {
  constructor(private http: HttpClient) {}

  GetAllpost(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${api2}/profile/` + id);
  }
  reactPost(id: number) {
    return this.http.post(`${api2}/profile/react/${id}`, null);
  }
  createPost(post: Post) {
    console.log('post: ' + post);

    return this.http.post(`${api2}/profile/`, post);
  }
  deletePost(id: number) {
    return this.http.delete(`${api2}/profile/${id}`);
  }
  sendPost(formData:any) {
    console.log("send image to folder")
    return   this.http.post('http://localhost:3001/upload-image-post', formData)
  }
}
