import { Component ,OnInit} from '@angular/core';
import { PostService } from '../profile/service/post.service';
import { User } from '../chat/model/user.model';

@Component({
  selector: '[mon-attribut="post"]',
  templateUrl: './accuille.component.html',
  styleUrls: ['./accuille.component.scss']
})
export class AccuilleComponent implements  OnInit{

  invits!:User[];
  id_sender!:number
  constructor(private servicepost:PostService){
    this.id_sender = parseInt(localStorage.getItem('idUser') as string, 10);

  }

  ngOnInit(): void {
    this.servicepost.getInvitation(this.id_sender).subscribe(e=>this.invits=e,);
  }
}
