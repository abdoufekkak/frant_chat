import { Component, Input } from '@angular/core';
import { Post } from '../../model/post.model';

@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.scss']
})
export class PostesComponent {
@Input() posts!:Post[]
}
