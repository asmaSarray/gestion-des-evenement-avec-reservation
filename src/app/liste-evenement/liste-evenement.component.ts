import { Component } from '@angular/core';
import { Evenement } from '../evenement/evenement.model';
import { ServiceService } from '../evenement/service.service';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';

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
    category: new FormControl(''),
  });

  viewMode = 'grid';

  categories: string[] = []; // Need to populate this based on events

  events: any[] = [];
  event: any | null = null;

  constructor(private eventService: ServiceService, private router: Router) {}
  ngOnInit(): void {
    this.initForm();

    this.eventService.GetAll().subscribe({
      next: (data) => {
        this.events = data.evenements.map(
          (event: { _id: any; imageUrl: any }) => ({
            ...event,
            id: event._id, // Map _id vers id
            image: event.imageUrl,
          })
        );
      },
    });

    // this.events.forEach((event) =>
    //   console.log(event.imageUrl, '*********************')
    // );
    // console.log('Événements transformés:', this.events);
  }
  showDetails(id: string | undefined) {
    if (!id) {
      console.error('ID non défini');
      return;
    }
    this.router.navigate(['/detailevenement', id]);
  }

  private initForm() {
    this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
    // .subscribe(() => this.updateFilter());

    // Récupération des catégories uniques
    this.categories = [...new Set(this.events.map((e) => e.category))];
  }

  get filteredEvents() {
    const { search, category } = this.filterForm.value;
    return this.events.filter((event) => {
      const matchSearch =
        !search || event.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || event.category === category;
      return matchSearch && matchCategory;
    });
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }
}
