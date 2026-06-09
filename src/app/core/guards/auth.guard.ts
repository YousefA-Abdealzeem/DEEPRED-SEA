import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const requiredRole: UserRole | undefined = route.data['role'];
    if (requiredRole && this.auth.userRole !== requiredRole) {
      // Redirect to correct panel
      const redirectMap: Record<UserRole, string> = {
        customer: '/home',
        center: '/center/dashboard',
        admin: '/admin/overview',
      };
      this.router.navigate([redirectMap[this.auth.userRole!]]);
      return false;
    }

    return true;
  }
}
