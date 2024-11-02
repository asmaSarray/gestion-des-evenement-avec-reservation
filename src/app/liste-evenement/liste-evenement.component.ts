import { Component } from '@angular/core';
import { Evenement } from '../evenement/evenement.model';
import { ServiceService } from '../evenement/service.service';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-liste-evenement',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './liste-evenement.component.html',
  styleUrl: './liste-evenement.component.css',
})
export class ListeEvenementComponent {
  // public events: Evenement = {} as Evenement;
  events: any[] = [];
  event: Evenement | null = null;

  constructor(
    private eventService: ServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.eventService.GetAll().subscribe({
      next: (data) => {
        console.log('Reçu des données:', data);
        if (Array.isArray(data.evenements)) {
          this.events = data.evenements;
          this.events.forEach((event) => {
            console.log("Vérification de l'image:", event.image);
            if (event.image && event.image.path) {
              console.log("Chemin de l'image:", event.image.path);
            } else {
              console.error("Aucun chemin d'image trouvé pour cet événement.");
            }
          });
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
