import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({ selector: 'app-booking', templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'] })
export class BookingComponent {
  step = 1;
  personalForm: FormGroup;
  paymentForm: FormGroup;
  selectedPayment = 'deposit';
  loading = false;
  divers = 1;

  center = { name: 'Orca Dive Club', location: 'Sharm El Sheikh' };
  trip = { name: 'Morning Reef Dive', date: '2025-07-15', duration: '3 hrs', depth: '18m', price: 350 };

  paymentOptions = [
    { id: 'deposit', icon: 'payments', label: 'Pay Deposit (30%)', desc: 'Secure your spot — pay the rest at the center' },
    { id: 'card', icon: 'credit_card', label: 'Full Payment — Card', desc: 'Pay the full amount now by credit/debit card' },
    { id: 'wallet', icon: 'account_balance_wallet', label: 'Mobile Wallet', desc: 'Vodafone Cash, Orange Money, Etisalat Cash' },
  ];

  get total() { return this.trip.price * this.divers; }
  get deposit() { return Math.ceil(this.total * 0.3); }
  get amountDue() { return this.selectedPayment === 'deposit' ? this.deposit : this.total; }

  constructor(private fb: FormBuilder, private router: Router) {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      diverLevel: ['beginner'],
      notes: [''],
    });
    this.paymentForm = this.fb.group({
      cardNumber: [''], expiry: [''], cvv: [''], cardName: [''],
    });
  }

  nextStep() {
    if (this.step === 1 && this.personalForm.invalid) { this.personalForm.markAllAsTouched(); return; }
    if (this.step < 3) this.step++;
  }
  prevStep() { if (this.step > 1) this.step--; }
  confirm() {
    this.loading = true;
    setTimeout(() => { this.loading = false; this.step = 4; }, 1800);
  }
  incDivers() { if (this.divers < 10) this.divers++; }
  decDivers() { if (this.divers > 1) this.divers--; }
}
