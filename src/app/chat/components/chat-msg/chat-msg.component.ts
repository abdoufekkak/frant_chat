import { Component ,EventEmitter,Input, Output,OnInit,AfterViewInit,ViewChild,ElementRef,Renderer2,SimpleChanges,OnChanges} from '@angular/core';
import { MessageType, message } from '../../model/msg.model';
import { Socket } from 'ngx-socket-io';
import { MsgService } from '../../service/msg.service';
import { HttpClient } from '@angular/common/http';
import { concatMap,map } from 'rxjs';

@Component({
  selector:  '[mon-attribut="app-chat-msg"]',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.scss']
})
export class ChatMsgComponent   implements OnInit,OnChanges {
@Input() msgs!:message[];
@Input() id_recever!:number;
@Input() id_sender!:number;
isrecord:boolean=false;
@Output() valueEmitted = new EventEmitter<MessageType>();
msg:message=new message();
content!:string
@ViewChild('scrollContainer') scrollContainer!: ElementRef;
mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];


constructor(private socket: Socket,private service : MsgService,public http:HttpClient) {
  navigator.mediaDevices.getUserMedia({ audio: true })
  .then((stream) => {
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        
        this.audioChunks.push(event.data);
      }
    };
  }).catch(e=>console.log(e,"Asdfg"));
}

startRecording() {
  this.audioChunks = [];
  this.mediaRecorder.start();
}
saveRecording() {
  
 if (this.audioChunks.length > 0) {
  const audioBlob = new Blob(this.audioChunks, { type: 'audio/ogg' });
  const formData = new FormData();
  formData.append('audioFile', audioBlob, 'audio.ogg');
  
  this.http.post('http://localhost:3000/upload-audio', formData).subscribe(
    (response) => {
      this.socket.emit("audio", { receiver_id: 1, url_audio: response });
    },
    (error) => {
      console.error(error);
    });
}
this.isrecord = false;
}
ngOnInit(): void {
  this.socket.on('msgenvoyer', (mess: message) => {
    this.msgs.push(mess)

    // this.messages.push(message);
  });
  this.socket.on('audio_envoyer', (mess: message) => {
    this.msgs.push(mess)

    // this.messages.push(message);
  });
  this.socket.emit('join chat', this.id_sender);
}
// isMessageTypeText(msg: message): boolean {
//   return msg.message_type ==="";
// }
ngOnChanges(changes: SimpleChanges) {
  if (changes['msgs']) {

setTimeout(() => {
  this.n();
}, 100);    
  }
}
n() {
  // Récupérez le conteneur avec débordement
  const container = this.scrollContainer.nativeElement;
  container.scrollTop = container.scrollHeight;
}
stopRecording() {
  this.mediaRecorder.stop();
}
sendMessage() {
  // alert(this.audioChunks.length)

  if(this.content){
  this.msg.receiver_id=this.id_recever;
this.msg.sender_id=this.id_sender;
this.msg.send_date=new Date();
this.msg.content=this.content;
this.msg.contry_msg="maroc";
this.msg.message_type="Text"

////requete
console.log(this.msgs)

  this.service.setMsg(this.msg).subscribe(e=>{
    this.msgs.push(e);
    this.socket.emit('message', this.msg);
    // this.n();
    this.msg =new message();
    this.content=""
  })
  }
  else{
    if(this.isrecord){ 
    this.mediaRecorder.stop();
setTimeout(() => {
  const audioBlob = new Blob(this.audioChunks, { type: 'audio/ogg' });
  const formData = new FormData();
  formData.append('audioFile', audioBlob,'audio.ogg');
  this.service.envpyerfile(formData).pipe(
    concatMap (value => {
      const messageData = {
        sender_id: this.id_sender,
        receiver_id:this.id_recever,
        content: value,
        send_date:new Date(),
        message_type:"Audio",
        contry_msg:"maroc"
      };
      
      return this.service.setMsg(messageData);
    })
  ).subscribe(response => {
    console.log(response)
    this.msgs.push(response)
    this.socket.emit("audio",response)
    this.isrecord=false
  }, error => {
    console.log(error)
  });
}, 200);
 
  }
else{
  this.startRecording()
  this.isrecord=true
}}
}}

