import { Component } from '@angular/core';
import { Evenement } from '../evenement/evenement.model';
import { ServiceService } from '../evenement/service.service';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-liste-evenement',
  standalone: true,
  imports: [NgFor],
  templateUrl: './liste-evenement.component.html',
  styleUrl: './liste-evenement.component.css',
})
export class ListeEvenementComponent {
  // public events: Evenement = {} as Evenement;
  events: any[] = [];

  constructor(private eventService: ServiceService) {}

  ngOnInit(): void {
    this.eventService.GetAll().subscribe({
      next: (data) => {
        console.log('Full response:', data); // Logs the entire response
        console.log('Evenements array:', data.evenements); // Logs the evenements property specifically

        if (Array.isArray(data.evenements)) {
          this.events = data.evenements; // Set events only if it's an array
        } else {
          console.error('Expected an array but received:', data.evenements);
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      },
    });
  }
}
