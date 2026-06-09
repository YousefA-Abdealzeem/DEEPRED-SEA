import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CenterLayoutComponent } from './layouts/center-layout.component';
import { CenterDashboardComponent } from './dashboard/dashboard.component';
import { CenterTripsComponent } from './trips/trips.component';
import { CenterBookingsComponent } from './bookings/bookings.component';
import { CenterReviewsComponent } from './reviews/reviews.component';
import { CenterProfileComponent } from './profile/profile.component';
import { CenterSettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: CenterLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CenterDashboardComponent },
      { path: 'trips', component: CenterTripsComponent },
      { path: 'bookings', component: CenterBookingsComponent },
      { path: 'reviews', component: CenterReviewsComponent },
      { path: 'profile', component: CenterProfileComponent },
      { path: 'settings', component: CenterSettingsComponent },
    ]
  }
];

@NgModule({
  declarations: [
    CenterLayoutComponent, CenterDashboardComponent, CenterTripsComponent,
    CenterBookingsComponent, CenterReviewsComponent, CenterProfileComponent, CenterSettingsComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class CenterPanelModule {}
