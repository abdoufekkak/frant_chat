import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccuilleComponent } from './accuille/accuille.component';
import { ChatComponent } from './chat/chat.component';
const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'accueil', component: AccuilleComponent },
  { path: '**', redirectTo: 'chat' }, // Rediriger vers /chat par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
