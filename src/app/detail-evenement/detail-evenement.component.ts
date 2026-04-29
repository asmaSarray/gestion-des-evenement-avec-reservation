import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../evenement/service.service';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-evenement',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './detail-evenement.component.html',
  styleUrl: './detail-evenement.component.css',
})
export class DetailEvenementComponent {
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private eventService: ServiceService,
    private router: Router
  ) {}
  event: any = null;
  errorMessage: string = '';
  // detail-evenement.component.ts
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.eventService.GetOne(id).subscribe({
        next: (data) => {
          this.event = data;
        },
        error: (error) => {
          console.error(error.message);
          // Solution temporaire au lieu de '/erreur'
          this.router.navigate(['/']);
        },
      });
    }
  }
  goBack(): void {
    this.location.back();
  }
  showReservation(    id: string | undefined
  ) {
    if (!id) {
      console.error('ID non défini');
      return;
    }
    this.router.navigate(['/cart']);
  }
}
