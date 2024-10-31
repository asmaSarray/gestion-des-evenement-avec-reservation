import { Component } from '@angular/core';
import { Evenement } from '../evenement/evenement.model';
import { ServiceService } from '../evenement/service.service';
import { NgFor , NgIf} from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private eventService: ServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
   
    this.eventService.GetAll().subscribe({
      next: (data) => {
        this.events = data.evenements;
        this.events.forEach(event => {
          event.image = this.sanitizer.bypassSecurityTrustUrl(event.image.path);
        });
      },
  
       
    });
  }
}
