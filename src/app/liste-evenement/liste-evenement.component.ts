import { Component } from '@angular/core';
import { Evenement } from '../evenement/evenement.model';
import { ServiceService } from '../evenement/service.service';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-liste-evenement',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './liste-evenement.component.html',
  styleUrl: './liste-evenement.component.css',
})
export class ListeEvenementComponent {
  filterForm = new FormGroup({
    search: new FormControl(''),
    category: new FormControl('')
  });

  viewMode = 'grid';
    
    categories: string[] = []; // Need to populate this based on events


  events: any[] = [];
  event: any | null = null;
 

  constructor(private eventService: ServiceService) {}
  ngOnInit(): void {
    this.initForm();

    this.eventService.GetAll().subscribe({
      next: (data) => {
        console.log('Reçu des données:', data);
        this.events = data.evenements;
        this.events = this.events.map((event) => {
          return {
            ...event, // Spread the existing event properties
            image: event.imageUrl, // Add the image property with the value of imageUrl
          };
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      },
    });
    this.events.forEach((event) =>
      console.log(event.imageUrl, '*********************')
    );
  }
 

  private initForm() {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      // .subscribe(() => this.updateFilter());

    // Récupération des catégories uniques
    this.categories = [...new Set(this.events.map(e => e.category))];
  }

  get filteredEvents() {
    const { search, category } = this.filterForm.value;
    return this.events.filter(event => {
      const matchSearch = !search || 
        event.titre.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || event.category === category;
      return matchSearch && matchCategory;
    });
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }
}
