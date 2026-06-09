import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-center-layout', templateUrl: './center-layout.component.html',
  styleUrls: ['./center-layout.component.css'] })
export class CenterLayoutComponent {
  sidebarOpen = false;

  navLinks = [
    { label: 'Dashboard', icon: 'dashboard', route: '/center/dashboard' },
    { label: 'Trips', icon: 'sailing', route: '/center/trips' },
    { label: 'Bookings', icon: 'event_available', route: '/center/bookings' },
    { label: 'Reviews', icon: 'star', route: '/center/reviews' },
    { label: 'Profile', icon: 'store', route: '/center/profile' },
    { label: 'Settings', icon: 'settings', route: '/center/settings' },
  ];

  constructor(public auth: AuthService) {}
  logout() { this.auth.logout(); }
}
