import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './model/user.model';
import { MsgService } from './service/msg.service';
import { message } from './model/msg.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: '[mon-attribut="app-chat"]',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  amis!: User[];
  msgs!: message[];
  id_recever!: number;
  id_sender!: number;
  amisAvecDerniersMessages: { ami: User; lastMessage: message | null }[] = [];

  last_message !: message;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private msgService: MsgService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id_sender = parseInt(localStorage.getItem('idUser') as string, 10);
    });
    this.userService.getamis(this.id_sender).subscribe(
      (e) => (this.amis = e,this.loadDerniersMessages()),
      (err) => console.log('_____', err)
    );


  }
  loadDerniersMessages() {
    console.log("f  = "+this.amis )
    if (this.amis) {
      this.amis.forEach((ami) => {
        this.msgService.getMsgBy2Id(ami.id || -1, this.id_sender).subscribe((messages) => {
          if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            console.log(lastMessage)

            this.amisAvecDerniersMessages.push({
              ami: ami,
              lastMessage: lastMessage,
            });
          } else {
            this.amisAvecDerniersMessages.push({
              ami: ami,
              lastMessage: null,
            });
          }
        });
      });
    }
  }
  getidami(id: number) {
    this.msgService.getMsgBy2Id(id, this.id_sender).subscribe(
      (e) => {
        (this.msgs = e), (this.id_recever = id);
      },
      (err) => console.log(err)
    );
  }
  getmessage(msg : message){
    this.last_message = msg
  }
}
