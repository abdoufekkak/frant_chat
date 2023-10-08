import { Component,EventEmitter,Input,OnInit, Output,} from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: '[mon-attribut="app-msg-ami"]',
  templateUrl: './msg-ami.component.html',
  styleUrls: ['./msg-ami.component.scss'],
})
export class MsgAmiComponent implements OnInit {
  @Input() amis!:User[];
  @Output() valueEmitted = new EventEmitter<number>();



  constructor(){

  }
  ngOnInit(): void {
  }
  selectmi(id?:number){
if(id){
  this.valueEmitted.emit(id);

}
  }
}
