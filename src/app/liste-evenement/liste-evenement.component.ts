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
  events: any[] = [];
  event: any | null = null;

  constructor(
    private eventService: ServiceService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.eventService.GetAll().subscribe({
      next: (data) => {
        console.log('Reçu des données:', data);
        this.events = data.evenements;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      },
    });
  }
  // ngOnInit(): void {
  //   this.eventService.GetAll().subscribe({
  //     next: (data) => {
  //       console.log('Reçu des données:', data);
  //       if (Array.isArray(data.evenements)) {
  //         this.events = data.evenements;
  //         console.log(data.evenements, 'data.evenements');
  //         this.events.forEach((event) => {
  //           console.log("Vérification de l'image:", event.image);
  //         });
  //       } else {
  //         console.error('Expected an array but received:', data.evenements);
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Erreur lors de la récupération des événements:', error);
  //     },
  //   });
  // }
}
