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
    image: this.defaults?.image || '',
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

  create() {
    const item = this.form.value as Evenement;
    console.log(this.form.value.image, '%%%%%%%%%%%%%%%%%%%%%%%%');

    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.serviceHttp.successCreate(res);
      console.log(
        this.form.value.image,
        '%%%%%%%%%%1111111111111%%%%%%%%%%%%%%'
      );
      console.log(item.image, '£££££££££££££££');
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
