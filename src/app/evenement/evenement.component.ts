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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from './service.service';
import { formatDate, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

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
    image: this.defaults?.image || {},
    category: [this.defaults?.category || ''],
    visibility: [this.defaults?.visibility || ''],
  });

  mode: 'create' | 'update' = 'create';
  constructor(
    private fb: FormBuilder,
    private serviceHttp: ServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (!this.defaults) {
      this.defaults = {} as Evenement;
    }
    // this.form.patchValue(this.defaults);
  }

  save() {
    if (!this.form.valid) {
      if (this.mode === 'create') {
        this.create();
      } else if (this.mode === 'update') {
        this.update();
      }
    }
  }
  getimg(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.get('image.path')?.setValue(file.name); // Met à jour le chemin de l'image dans le formulaire
      console.log('first', file.name);
    }
  }

  // Méthode pour gérer la valeur de "alt"
  getalt(event: any) {
    const alt = event.target.value;
    this.form.get('image.alt')?.setValue(alt); // Met à jour la description de l'image dans le formulaire
  }

  // this method is called when a file is selected in the input
  // onImgSelected(event: any) {
  //   //get the selected file from the input
  //   const file: File = event.target.images[0];
  //   if (file) {
  //     //handle the selected img here
  //     this.form.value.image.path = file;
  //     console.log('selected file', file);
  //   }
  // }
  // uploadImage() {
  //   if (this.form.value.image) {
  //     const formData = new FormData();
  //     formData.append('image', this.form.value.image, this.form.value.image.path)

  //     this.serviceHttp.AddNew('uploadImage/', formData).subscribe(
  //       (response: any) => {
  //         console.log(response);
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'upload de l\'image:', error);
  //       }
  //     );
  //   }
  // }
  create() {
    const item = this.form.value as Evenement;

    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.serviceHttp.successCreate(res);
      this.form.reset(); // Réinitialiser le formulaire après soumission
    });
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
