import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ selector: 'app-center-profile', templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] })
export class CenterProfileComponent {
  form: FormGroup;
  saved = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['Orca Dive Club', Validators.required],
      location: ['Sharm El Sheikh, South Sinai', Validators.required],
      phone: ['+20 100 123 4567', Validators.required],
      whatsapp: ['201001234567'],
      email: ['info@orcadive.com', [Validators.required, Validators.email]],
      website: ['https://orcadive.com'],
      description: ['Orca Dive Club is one of Egypt\'s most prestigious diving centers, offering world-class experiences across Sharm El Sheikh\'s legendary reef systems.', Validators.required],
      certifications: ['PADI, SSI, CMAS'],
      languages: ['Arabic, English, German'],
    });
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saved = true;
    setTimeout(() => this.saved = false, 3000);
  }
}
