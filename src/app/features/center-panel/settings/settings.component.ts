import { Component } from '@angular/core';

@Component({ selector: 'app-center-settings', templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'] })
export class CenterSettingsComponent {
  newBooking = true;
  cancellation = true;
  review = true;
  payment = false;
  autoApprove = false;
  depositRequired = true;
  saved = false;

  notifItems = [
    { key: 'newBooking' as const, label: 'New Booking', desc: 'Notify me when a new booking arrives' },
    { key: 'cancellation' as const, label: 'Cancellation', desc: 'Notify me when a booking is cancelled' },
    { key: 'review' as const, label: 'New Review', desc: 'Notify me when a customer leaves a review' },
    { key: 'payment' as const, label: 'Payment Received', desc: 'Notify me when payment is confirmed' },
  ];

  bookingItems = [
    { key: 'autoApprove' as const, label: 'Auto-Approve Bookings', desc: 'Automatically confirm new bookings without review' },
    { key: 'depositRequired' as const, label: 'Require Deposit', desc: 'Require 30% deposit to confirm a booking' },
  ];

  save() { this.saved = true; setTimeout(() => this.saved = false, 3000); }
}
