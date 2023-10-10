import { Component ,EventEmitter,Input, Output,OnInit} from '@angular/core';
import { MessageType, message } from '../../model/msg.model';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.scss']
})
export class ChatMsgComponent   implements OnInit {
@Input() msgs!:message[];
@Input() id_recever!:number;
@Output() valueEmitted = new EventEmitter<MessageType>();
msg:message=new message();
constructor(private socket: Socket) {}

ngOnInit(): void {
  this.socket.on('message', (mess: message) => {
    this.msgs.push(mess)

    // this.messages.push(message);
  });
}
isMessageTypeText(msg: message): boolean {
  return msg.message_type === MessageType.Text;
}


sendMessage() {
  this.msg.receiver_id=this.id_recever;
this.msg.sender_id=1;
this.msg.send_date=new Date();
this.msg.contry_msg="maroc";
this.msg.message_type=MessageType.Text
 
////requete
this.msgs.push(this.msg);

  // this.socket.emit('message', this.msg);
  // this.msg =new message();
}}
