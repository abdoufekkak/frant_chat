import { Component ,Input} from '@angular/core';
import { message } from '../../model/msg.model';

@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.scss']
})
export class ChatMsgComponent {
@Input() msgs!:message[];
}
