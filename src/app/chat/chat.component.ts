import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './model/user.model';
import { MsgService } from './service/msg.service';
import { message } from './model/msg.model';

@Component({
  selector: '[mon-attribut="app-chat"]',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  amis!:User[]
  msgs!:message[]
  constructor(private userService:UserService,private msgService:MsgService){

  }
  ngOnInit(): void {
    this.userService.getamis().subscribe(e=>this.amis=e,err=>console.log("_____",err))
  }
  getidami(id:number){
    this.msgService.getMsgBy2Id(id).subscribe(e=>this.msgs=e,err=>console.log(err))
  }
}
