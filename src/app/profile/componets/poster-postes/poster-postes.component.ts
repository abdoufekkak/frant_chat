import { Component } from '@angular/core';
import { Post } from '../../model/post.model';
import { postService } from '../../service/post.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-poster-postes',
  templateUrl: './poster-postes.component.html',
  styleUrls: ['./poster-postes.component.scss'],
})
export class PosterPostesComponent {
  profile!: File;
  profile_url!: string;
  post!: Post;
  content!: string;
  constructor(private service: postService) {}
  handlePictureStatut(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files) {
      const files = inputElement.files;
      if (files.length > 0) {
        this.profile = files[0];
        const objectURL = URL.createObjectURL(this.profile);
        this.profile_url = objectURL;
      } else {
        alert('no file existe');
      }
    }
  }
  sendPost() {
    console.log('content: ' + this.content);
    this.post = new Post()
    this.post.content = this.content;
    this.post.date_pub = new Date();
    this.post.id_user = parseInt(localStorage.getItem('idUser') as string, 10);
    console.log('content: ' + this.profile);
    if (this.profile) {
      const formData = new FormData();
      formData.append('imageProfilFile', this.profile);

      this.service
        .sendPost(formData)
        .pipe(
          concatMap((value) => {
            this.post.url_img =( value as string);

            console.log('url_img:', this.post.url_img);
            console.log('date_pub:', this.post.date_pub);
            console.log('date_sup:', this.post.date_sup);
            console.log('content:', this.post.content);
            console.log('id_user:', this.post.id_user);
            console.log('nbr_like:', this.post.nbr_like);
                        return this.service.createPost(this.post);
          })
        )
        .subscribe(
          (response) => {
            console.log('dd', response);
            // this.msgs.push(response);
            // this.socket.emit('message', response);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
