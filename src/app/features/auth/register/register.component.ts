import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user.model';

@Component({ selector: 'app-register', templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] })
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  showPassword = false;

  roles: { value: UserRole; label: string; icon: string; desc: string }[] = [
    { value: 'customer', label: 'Diver', icon: 'scuba_diving', desc: 'Discover & book dives' },
    { value: 'center', label: 'Dive Center', icon: 'storefront', desc: 'Manage trips & bookings' },
  ];

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['customer', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    const { name, email, password, role } = this.form.value;
    this.auth.register(name, email, password, role).subscribe({
      next: (user) => {
        const map: Record<UserRole, string> = { customer: '/home', center: '/center/dashboard', admin: '/admin/overview' };
        this.router.navigate([map[user.role]]);
      },
      error: () => { this.loading = false; }
    });
  }
}
