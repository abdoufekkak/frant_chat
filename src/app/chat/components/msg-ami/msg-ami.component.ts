import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { User } from '../../model/user.model';
import { message } from '../../model/msg.model';
import { MsgService } from '../../service/msg.service';

@Component({
  selector: '[mon-attribut="app-msg-ami"]',
  templateUrl: './msg-ami.component.html',
  styleUrls: ['./msg-ami.component.scss'],
})
export class MsgAmiComponent implements OnInit {
  @Input() amisAvecDerniersMessages!: { ami: User; lastMessage: message | null }[];
  @Input() id_sender!: number;
  @Input() last_message!: message;

  @Output() valueEmitted = new EventEmitter<number>();

  constructor(private msgService: MsgService) {}
  ngOnInit() {
  }

  selectmi(id?: number) {
    if (id) {
      this.valueEmitted.emit(id);
    }
  }
  getTimeDifference(date: Date): string {
      date = new Date(date);
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Date non valide';
    }

    const currentTime = new Date();
    const sendDate = date;
    const timeDifference = Math.abs(currentTime.getTime() - sendDate.getTime());

    if (timeDifference >= 2 * 60 * 1000) {
      // Si plus de 2 minutes se sont écoulées, affichez en heures
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      return `${hoursDifference}${hoursDifference === 1 ? 'hr' : 'hrs'}`;
    } else {
      // Si moins de 2 minutes se sont écoulées, affichez en minutes
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));
      return `${minutesDifference}${minutesDifference === 1 ? 'minute' : 'minutes'}`;
    }
  }

}
