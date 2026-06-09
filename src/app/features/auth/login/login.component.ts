import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  error = '';
  showPassword = false;

  roles: { value: UserRole; label: string; icon: string }[] = [
    { value: 'customer', label: 'Diver', icon: 'scuba_diving' },
    { value: 'center', label: 'Dive Center', icon: 'storefront' },
    { value: 'admin', label: 'Admin', icon: 'admin_panel_settings' },
  ];

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['customer', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    const { email, password, role } = this.form.value;
    this.auth.login(email, password, role).subscribe({
      next: (user) => {
        const map: Record<UserRole, string> = {
          customer: '/home',
          center: '/center/dashboard',
          admin: '/admin/overview',
        };
        this.router.navigate([map[user.role]]);
      },
      error: () => { this.error = 'Invalid credentials.'; this.loading = false; }
    });
  }
}
