import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Evenement } from './evenement.model';
import { ServiceService } from './service.service';
import { formatDate, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-evenement',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, HttpClientModule],
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.css',
})
export class EvenementComponent {
  public defaults: Evenement = {} as Evenement;

  form = this.fb.group({
    _id: [this.defaults?._id || '', Validators.required],
    titre: [this.defaults?.titre || '', Validators.required],
    description: [this.defaults?.description || ''],
    date: [this.defaults?.date || ''],
    lieu: [this.defaults?.lieu || ''],
    capacite: [this.defaults?.capacite || ''],
    price: [this.defaults?.price || ''],
    image: [this.defaults?.image || ''],
    category: [this.defaults?.category || ''],
    visibility: [this.defaults?.visibility || ''],
  });

  mode: 'create' | 'update' = 'create';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private serviceHttp: ServiceService,
    private http: HttpClient
  ) {}
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0]; // Stockez le fichier sélectionné
      console.log(this.selectedFile); // Vérifiez que le fichier est capturé
    }
  }

  ngOnInit() {
    if (!this.defaults) {
      this.defaults = {} as Evenement;
    }
  }
  save() {
    // if (!this.form.valid) {
    //   console.error('Formulaire invalide');
    //   return;
    // }

    const evenement = this.form.value; // Récupérer les valeurs du formulaire

    if (!this.selectedFile) {
      console.error('Aucune image sélectionnée');
      return;
    }

    if (this.mode === 'create') {
      this.create(evenement, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Événement créé avec succès', response);
        },
        error: (error) => {
          console.error("Erreur lors de la création de l'événement", error);
        },
      });
    } else if (this.mode === 'update') {
      this.update();
    }
  }
//   FormData permet d’envoyer des fichiers et des champs texte dans une seule requête HTTP.
// Contrairement au JSON, FormData est conçu pour gérer les fichiers, ce qui permet une bonne compatibilité avec multer (côté backend).
  create(evenement: any, image: File) {
    const formData = new FormData();
    formData.append('titre', evenement.titre);
    formData.append('description', evenement.description);
    formData.append('date', evenement.date);
    formData.append('lieu', evenement.lieu);
    formData.append('capacite', evenement.capacite.toString());
    formData.append('price', evenement.price);
    formData.append('category', evenement.category);
    formData.append('visibility', evenement.visibility);
    formData.append('image', image); // Ajoutez le fichier ici
    this.form.reset(); // Réinitialiser le formulaire après soumission

    return this.serviceHttp.AddNew(formData);

  }

  update() {
    const item: any = this.form.value;

    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }
    this.serviceHttp.update(item).subscribe((res) => {
      this.serviceHttp.successCreate(res);
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}

