import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  selectedTab  = 'bookings';
  selectedDive: any = null;

  // Settings
  editName     = '';
  editEmail    = '';
  editBio      = '';
  editLocation = '';
  editCert     = 'Advanced Open Water';
  currentPass  = '';
  newPass      = '';
  confirmPass  = '';
  avatarPreview: string | null = null;
  saveSuccess   = false;
  passSuccess   = false;
  passError     = '';
  confirmDelete = false;
  logSaved      = false;

  // Password visibility
  showCurrent = false;
  showNew     = false;
  showConfirm = false;

  stats = { dives: 24, streak: 7, level: 'Advanced Diver', points: 1840 };

  bookings = [
    { id: 'B001', center: 'Orca Dive Club',    trip: 'Morning Reef Dive',  date: '2025-07-15', status: 'confirmed', total: 350, notes: '', photos: [] as string[] },
    { id: 'B002', center: 'Blue Ocean Divers', trip: 'Ras Mohammed NP',    date: '2025-06-28', status: 'confirmed', total: 650, notes: '', photos: [] as string[] },
    { id: 'B003', center: 'Dahab Divers',      trip: 'Blue Hole Freedive', date: '2025-05-10', status: 'completed', total: 220, notes: '', photos: [] as string[] },
  ];

  get completedDives() {
    return this.bookings.filter(b => b.status === 'completed');
  }

  constructor(public auth: AuthService) {}

  onAvatarChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => this.avatarPreview = e.target?.result as string;
    reader.readAsDataURL(file);
  }

  saveProfile(): void {
    this.saveSuccess = true;
    setTimeout(() => this.saveSuccess = false, 3000);
  }

  changePassword(): void {
    this.passError = '';
    if (!this.currentPass || !this.newPass) { this.passError = 'Please fill all fields.'; return; }
    if (this.newPass !== this.confirmPass)   { this.passError = 'Passwords do not match.'; return; }
    if (this.newPass.length < 8)             { this.passError = 'Minimum 8 characters.'; return; }
    this.passSuccess = true;
    this.currentPass = this.newPass = this.confirmPass = '';
    this.showCurrent = this.showNew = this.showConfirm = false;
    setTimeout(() => this.passSuccess = false, 3000);
  }

  deleteAccount(): void {
    this.auth.logout();
  }

  openFromBooking(booking: any): void {
    this.selectedTab = 'logbook';
    setTimeout(() => this.openDiveLog(booking), 350);
  }

  openDiveLog(booking: any): void {
    this.selectedDive = booking;
  }

  getDiveStats(dive: any) {
    return [
      { key: 'Duration',   val: '45 min' },
      { key: 'Max Depth',  val: '18 m'   },
      { key: 'Visibility', val: '20 m'   },
      { key: 'Temp',       val: '26°C'   },
    ];
  }

  onPhotoUpload(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => this.selectedDive.photos.push(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  }

  saveDiveLog(): void {
    this.logSaved = true;
    setTimeout(() => this.logSaved = false, 3000);
  }
}