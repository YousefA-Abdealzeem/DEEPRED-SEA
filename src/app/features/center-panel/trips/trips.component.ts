import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ selector: 'app-center-trips', templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'] })
export class CenterTripsComponent {
  showModal = false;
  editTrip: any = null;
  tripForm: FormGroup;

  trips = [
    { id: 'T1', name: 'Morning Reef Dive', type: 'Day Trip', price: 350, capacity: 10, booked: 6, status: 'active', depth: '18m', duration: '3 hrs' },
    { id: 'T2', name: 'Ras Mohammed NP', type: 'Day Trip', price: 650, capacity: 8, booked: 5, status: 'active', depth: '30m', duration: '6 hrs' },
    { id: 'T3', name: 'Thistlegorm Wreck', type: 'Liveaboard', price: 850, capacity: 8, booked: 3, status: 'active', depth: '32m', duration: '8 hrs' },
    { id: 'T4', name: 'PADI Open Water', type: 'Course', price: 2800, capacity: 12, booked: 4, status: 'draft', depth: '18m', duration: '4 days' },
    { id: 'T5', name: 'Advanced Nitrox', type: 'Course', price: 1900, capacity: 6, booked: 2, status: 'active', depth: '40m', duration: '2 days' },
  ];

  constructor(private fb: FormBuilder) {
    this.tripForm = this.fb.group({
      name: ['', Validators.required],
      type: ['Day Trip', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      depth: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  openAdd() { this.editTrip = null; this.tripForm.reset({ type: 'Day Trip' }); this.showModal = true; }

  openEdit(t: any) {
    this.editTrip = t;
    this.tripForm.patchValue(t);
    this.showModal = true;
  }

  save() {
    if (this.tripForm.invalid) { this.tripForm.markAllAsTouched(); return; }
    if (this.editTrip) {
      Object.assign(this.editTrip, this.tripForm.value);
    } else {
      this.trips.push({ id: 'T' + Date.now(), booked: 0, status: 'draft', ...this.tripForm.value });
    }
    this.showModal = false;
  }

  delete(id: string) { this.trips = this.trips.filter(t => t.id !== id); }
  toggleStatus(t: any) { t.status = t.status === 'active' ? 'draft' : 'active'; }
}
