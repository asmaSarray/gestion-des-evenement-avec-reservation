import { FicheReservationComponent } from './fiche-reservation/fiche-reservation.component';
import { DetailEvenementComponent } from './detail-evenement/detail-evenement.component';
import { ListeEvenementComponent } from './liste-evenement/liste-evenement.component';
import { Routes } from '@angular/router';
import { EvenementComponent } from './evenement/evenement.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';

export const routes: Routes = [


  { path: '', component: PageAccueilComponent },
  { path: 'ficheevenement', component: EvenementComponent },
  { path: 'listeevenement', component: ListeEvenementComponent },
  { path: 'detailevenement', component: DetailEvenementComponent },
  { path: 'fichereservation', component: FicheReservationComponent },





];
