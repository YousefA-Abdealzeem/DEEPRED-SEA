import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    const stored = localStorage.getItem('deepred_user');
    if (stored) {
      this.currentUserSubject.next(JSON.parse(stored));
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  get userRole(): UserRole | null {
    return this.currentUserSubject.value?.role ?? null;
  }

  login(email: string, password: string, role: UserRole): Observable<User> {
    // Mock login — replace with real HTTP call
    const mockUsers: Record<UserRole, User> = {
      customer: { id: '1', email, name: 'Ahmed Diver', role: 'customer', avatar: '' },
      center: { id: '2', email, name: 'Deep Blue Center', role: 'center', avatar: '' },
      admin: { id: '3', email, name: 'Super Admin', role: 'admin', avatar: '' },
    };
    const user = mockUsers[role];
    localStorage.setItem('deepred_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return of(user);
  }

  register(name: string, email: string, password: string, role: UserRole): Observable<User> {
    const user: User = { id: Date.now().toString(), email, name, role };
    localStorage.setItem('deepred_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return of(user);
  }

  logout(): void {
    localStorage.removeItem('deepred_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }
}
