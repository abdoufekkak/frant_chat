import { Component ,EventEmitter,Input, Output} from '@angular/core';
import { MessageType, message } from '../../model/msg.model';


@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.scss']
})
export class ChatMsgComponent {
@Input() msgs!:message[];
@Output() valueEmitted = new EventEmitter<MessageType>();
constructor() {}


isMessageTypeText(msg: message): boolean {
  return msg.message_type === MessageType.Text;
}
}
