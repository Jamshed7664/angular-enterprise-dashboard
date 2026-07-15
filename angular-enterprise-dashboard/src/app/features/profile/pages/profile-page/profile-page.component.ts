import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '../../../../core/store/auth.store';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  private readonly fb = new FormBuilder();
  private readonly authStore = inject(AuthStore);

  readonly currentUser = this.authStore.user;

  readonly saving = signal(false);
  readonly securitySaving = signal(false);
  readonly saved = signal(false);
  readonly securitySaved = signal(false);

  readonly initials = computed(() => {
    const name = this.currentUser()?.name ?? 'Guest User';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  });

  readonly profileForm = this.fb.group({
    name: [this.currentUser()?.name ?? 'Aarav Sharma', [Validators.required, Validators.minLength(3)]],
    email: [this.currentUser()?.email ?? 'aarav@axionops.com', [Validators.required, Validators.email]],
    title: ['Director of Operations', Validators.required],
    team: ['Platform Ops', Validators.required],
    phone: ['+91 98765 43210', Validators.required],
    location: ['Bengaluru, India', Validators.required],
    bio: ['Leading identity operations, user governance, and delivery workflows across business teams.']
  });

  readonly preferenceForm = this.fb.group({
    emailAlerts: [true],
    weeklyDigest: [true],
    productUpdates: [false],
    twoFactor: [true]
  });

  readonly securityForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  });

  readonly passwordMismatch = computed(() => {
    const form = this.securityForm.getRawValue();
    return !!form.confirmPassword && form.newPassword !== form.confirmPassword;
  });

  saveProfile(): void {
    if (this.profileForm.invalid || this.preferenceForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.preferenceForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.saved.set(false);

    setTimeout(() => {
      this.saving.set(false);
      this.saved.set(true);
    }, 700);
  }

  updateSecurity(): void {
    if (this.securityForm.invalid || this.passwordMismatch()) {
      this.securityForm.markAllAsTouched();
      return;
    }

    this.securitySaving.set(true);
    this.securitySaved.set(false);

    setTimeout(() => {
      this.securitySaving.set(false);
      this.securitySaved.set(true);
      this.securityForm.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 700);
  }
}