import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,  
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  userForm: FormGroup;

  countries = [
    { value: 'vn', viewValue: 'Vietnam' },
    { value: 'us', viewValue: 'United States' },
    { value: 'uk', viewValue: 'United Kingdom' }
  ];

  states = [
    { value: 'hanoi', viewValue: 'Hanoi' },
    { value: 'hcm', viewValue: 'Ho Chi Minh' }
  ];

  cities = [
    { value: 'district1', viewValue: 'District 1' },
    { value: 'district2', viewValue: 'District 2' }
  ];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: ['U' + Math.floor(Math.random() * 1000)], 
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['Male', Validators.required],
      dob: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('User Data:', this.userForm.value);
    }
  }
}
