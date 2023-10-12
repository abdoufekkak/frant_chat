import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent {


public audioUrl !: string;
public isRecording: boolean = false;
public textTranscripted!: string;
public transcript!: string;
public transcriptFinal!: string;
private mediaRecorder!: MediaRecorder;
private socket!: WebSocket;
private start!: number;
constructor(private titleService: Title) {
  titleService.setTitle('Deepgram Speech-To-Text');
}
//#region LIFE CYCLES
public ngOnInit(): void {}
//#endregion
//#region EVENTS
public onStartRecognitionClick(): void {
  this.textTranscripted = '';
  this.transcript = '';
  this.transcriptFinal = '';
  this.audioUrl = '';
  this.start = 0;
  this.isRecording = true;
  this.initRecognition();
}
public onRecognitionResult(event: any): void {
  console.log(event.data)
  const data = JSON.parse(event.data);
  if (data.start !== this.start) {
    this.start = data.start;
    this.transcriptFinal += `${this.transcript} `;
  }
  this.transcript = data.channel.alternatives[0].transcript;
  this.textTranscripted = this.transcriptFinal + this.transcript;
}
public onStopRecognitionClick(): void {
  this.textTranscripted = this.transcriptFinal;
  this.isRecording = false;
  this.mediaRecorder.stop();
  this.socket.close();
}
//#endregion
//#region FUNCTIONS
public initRecognition(): void {
  if (!this.isRecording) return;
  // Obtenez l'accès au micro
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {

      console.log(stream)
      // Créez un enregistreur audio avec le flux audio
      const mediaRecorder = new MediaRecorder(stream);

      // Tableau pour stocker les morceaux de l'enregistrement
      const audioChunks: any = [];

      // Événement lorsque des données sont disponibles
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      // Événement lorsque l'enregistrement est terminé
      mediaRecorder.onstop = () => {
        console.log("onstop")
        // Créez un objet Blob à partir des morceaux audio
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

        // Créez un objet URL pour l'audio enregistré
        this.audioUrl = URL.createObjectURL(audioBlob);
          // Créez un élément "a" (un lien) pour télécharger le fichier audio
  const downloadLink = document.createElement('a');
  downloadLink.href = this.audioUrl;
  downloadLink.download = 'enregistrement_audio.wav'; // Nom du fichier à télécharger
  downloadLink.textContent = 'Télécharger l';

  // Ajoutez le lien à la page
  document.body.appendChild(downloadLink);
        // Créez un élément audio pour lire l'enregistrement
      };

      // Commencez l'enregistrement
      mediaRecorder.start();

      // Arrêtez l'enregistrement après un certain temps (par exemple, 10 secondes)
      setTimeout(() => {
        mediaRecorder.stop();
      }, 10000);
    })
    .catch((error) => {
      console.error('Erreur lors de l\'accès au micro :', error);
    });
}

}
