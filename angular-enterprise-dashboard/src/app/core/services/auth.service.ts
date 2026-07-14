import { Injectable, computed, signal } from '@angular/core';

export type UserRole = 'admin' | 'manager' | 'analyst' | 'user';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatar: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userState = signal<AuthUser | null>(null);

  readonly currentUser = computed(() => this.userState());
  readonly isAuthenticated = computed(() => !!this.userState());
  readonly userRole = computed(() => this.userState()?.role ?? null);
  readonly userName = computed(() => this.userState()?.name ?? '');
  readonly token = computed(() => this.userState()?.token ?? null);

  login(payload: { name: string; email: string; password: string }): boolean {
    const normalizedEmail = payload.email.trim().toLowerCase();

    let role: UserRole = 'user';
    let title = 'Operations Specialist';

    if (normalizedEmail.includes('admin')) {
      role = 'admin';
      title = 'Chief Operations Officer';
    } else if (normalizedEmail.includes('manager')) {
      role = 'manager';
      title = 'Delivery Program Manager';
    } else if (normalizedEmail.includes('analyst')) {
      role = 'analyst';
      title = 'Business Intelligence Analyst';
    }

    const cleanName = payload.name.trim() || 'User';

    this.userState.set({
      id: Date.now(),
      name: cleanName,
      email: normalizedEmail,
      role,
      title,
      avatar: this.getInitials(cleanName),
      token: 'demo-jwt-token'
    });

    return true;
  }

  logout(): void {
    this.userState.set(null);
  }

  hasRole(...roles: UserRole[]): boolean {
    const role = this.userState()?.role;
    return !!role && roles.includes(role);
  }

  isAdmin(): boolean {
    return this.userState()?.role === 'admin';
  }

  updateProfile(partial: Partial<Omit<AuthUser, 'id' | 'token'>>): void {
    const current = this.userState();

    if (!current) {
      return;
    }

    const nextName = partial.name ?? current.name;

    this.userState.set({
      ...current,
      ...partial,
      avatar: this.getInitials(nextName)
    });
  }

  getToken(): string | null {
    return this.userState()?.token ?? null;
  }

  private getInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
}