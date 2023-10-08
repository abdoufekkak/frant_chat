import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatComponent } from './chat/chat.component';
import { MsgAmiComponent } from './components/msg-ami/msg-ami.component';
import { ChatMsgComponent } from './components/chat-msg/chat-msg.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccuilleComponent } from './accuille/accuille.component';
import { ProfileComponent } from './profile/profile.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ChatComponent,
    MsgAmiComponent,
    ChatMsgComponent,
    AccuilleComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
