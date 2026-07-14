import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../../../core/store/auth.store';
import { UserRole } from '../../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authStore = inject(AuthStore);
  readonly selectedRole = signal<UserRole>('admin');
  readonly personas: { role: UserRole; title: string; description: string; }[] = [
    { role: 'admin', title: 'Admin access', description: 'Manage platform policy, governance, and privileged workflows.' },
    { role: 'manager', title: 'Manager access', description: 'Review delivery metrics, team health, and revenue pacing.' },
    { role: 'analyst', title: 'Analyst access', description: 'Inspect trends, build reports, and monitor performance signals.' },
    { role: 'developer', title: 'Developer access', description: 'Access the codebase, build features, and fix bugs.' }
  ];

  signIn(): void {
    this.authStore.loginAs(this.selectedRole());
  }
}