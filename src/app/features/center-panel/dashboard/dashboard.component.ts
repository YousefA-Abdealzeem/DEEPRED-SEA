import { Component } from '@angular/core';

@Component({ selector: 'app-center-dashboard', templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] })
export class CenterDashboardComponent {
  stats = [
    { label: 'Total Bookings', value: '124', change: '+12%', up: true, icon: 'event_available', color: '#005d90' },
    { label: 'Revenue (EGP)', value: '43,200', change: '+8%', up: true, icon: 'payments', color: '#00677d' },
    { label: 'Active Trips', value: '8', change: '+2', up: true, icon: 'sailing', color: '#3156a2' },
    { label: 'Avg. Rating', value: '4.9', change: '+0.1', up: true, icon: 'star', color: '#f59e0b' },
  ];

  recentBookings = [
    { id: 'B041', diver: 'Sarah Mitchell', trip: 'Morning Reef Dive', date: '2025-07-18', divers: 2, total: 700, status: 'confirmed' },
    { id: 'B040', diver: 'James Kowalski', trip: 'Thistlegorm Wreck', date: '2025-07-17', divers: 1, total: 850, status: 'pending' },
    { id: 'B039', diver: 'Lena Petrova', trip: 'PADI Open Water', date: '2025-07-16', divers: 3, total: 8400, status: 'confirmed' },
    { id: 'B038', diver: 'Omar Hassan', trip: 'Ras Mohammed NP', date: '2025-07-15', divers: 2, total: 1300, status: 'confirmed' },
  ];

  monthlyData = [
    { month: 'Jan', bookings: 18, revenue: 6300 },
    { month: 'Feb', bookings: 24, revenue: 8400 },
    { month: 'Mar', bookings: 32, revenue: 11200 },
    { month: 'Apr', bookings: 28, revenue: 9800 },
    { month: 'May', bookings: 35, revenue: 12250 },
    { month: 'Jun', bookings: 42, revenue: 14700 },
  ];

  get maxBookings() { return Math.max(...this.monthlyData.map(d => d.bookings)); }

  updateStatus(id: string, status: string) {
    const b = this.recentBookings.find(b => b.id === id);
    if (b) b.status = status;
  }
}
