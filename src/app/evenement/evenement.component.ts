import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Evenement } from './evenement.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from './service.service';
import { NgIf } from '@angular/common';
import { setObjets1ToObjets2 } from '../global-functions';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-evenement',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, HttpClientModule],
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.css',
})
export class EvenementComponent {
  // form: FormGroup;

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
  constructor(private fb: FormBuilder, private serviceHttp: ServiceService) {
    // this.form = this.fb.group({
    //   _id: '',
    //   titre: '',
    //   description: '',
    //   date: '',
    //   lieu: '',
    //   capacite: '',
    //   price: '',
    //   image: '',
    //   category: '',
    //   visibility: '',
    // });
  }

  ngOnInit() {
    if (!this.defaults) {
      this.defaults = {} as Evenement;
    }
    this.form.patchValue(this.defaults);

    console.log(this.defaults, 'defaultsdefaultsdefaultsdefaults');
  }
  save() {
    console.log(this.form, 'hhhhhhhhhhhhhhhhhhhhhhhhhh');
    if (!this.form.valid) {
      if (this.mode === 'create') {
        this.create();
      } else if (this.mode === 'update') {
        this.update();
      }
    }
    console.log(this.form, 'hhhhhhhhhh-------------------hhhhhhhhhhhhhhhh');
  }
  create() {
    console.log('this.form.value', this.form.value);

    const item = this.form.value as Evenement;

    this.serviceHttp.AddNew(item).subscribe((res) => {});
  }

  update() {
    const item: any = this.form.value;

    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }
    this.serviceHttp.update(item).subscribe((res) => {});
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
