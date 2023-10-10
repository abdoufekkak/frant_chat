import { Component ,EventEmitter,Input, Output,OnInit} from '@angular/core';
import { MessageType, message } from '../../model/msg.model';
import { Socket } from 'ngx-socket-io';
import { MsgService } from '../../service/msg.service';


@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.scss']
})
export class ChatMsgComponent   implements OnInit {
@Input() msgs!:message[];
@Input() id_recever!:number;
@Input() id_sender!:number;
@Output() valueEmitted = new EventEmitter<MessageType>();
msg:message=new message();
constructor(private socket: Socket,private service : MsgService) {}

ngOnInit(): void {
  this.socket.on('msgenvoyer', (mess: message) => {
    this.msgs.push(mess)

    // this.messages.push(message);
  });
  this.socket.emit('join chat', this.id_sender);
}
isMessageTypeText(msg: message): boolean {
  return msg.message_type === MessageType.Text;
}


sendMessage() {
  this.msg.receiver_id=this.id_recever;
this.msg.sender_id=this.id_sender;
this.msg.send_date=new Date();
this.msg.contry_msg="maroc";
this.msg.message_type=MessageType.Text

////requete
console.log(this.msgs)

  this.service.setMsg(this.msg).subscribe(e=>{
    this.msgs.push(e);

    this.socket.emit('message', this.msg);

    this.msg =new message();
  })

}}
