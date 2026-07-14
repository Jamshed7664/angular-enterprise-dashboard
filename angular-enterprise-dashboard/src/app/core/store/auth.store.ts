import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';

const demoUsers: Record<string, User> = {
    admin: { id: 1, name: 'Aarav Sharma', email: 'admin@enterprise.dev', role: 'admin', title: 'Chief Operations Officer', avatar: 'AS' },
    manager: { id: 2, name: 'Neha Verma', email: 'manager@enterprise.dev', role: 'manager', title: 'Regional Delivery Manager', avatar: 'NV' },
    analyst: { id: 3, name: 'Rohan Singh', email: 'analyst@enterprise.dev', role: 'analyst', title: 'Business Intelligence Analyst', avatar: 'RS' },
    developer: { id: 4, name: 'Jamshed Ahmad', email: 'jamshed@enterprise.dev', role: 'developer', title: 'Developer access', avatar: 'JA' }
};

@Injectable({ providedIn: 'root' })
export class AuthStore {
    private readonly activeUser = signal<User | null>(demoUsers['admin']);
    private readonly loading = signal(false);

    readonly user = computed(() => this.activeUser());
    readonly isAuthenticated = computed(() => !!this.activeUser());
    readonly role = computed<UserRole | null>(() => this.activeUser()?.role ?? null);
    readonly isLoading = computed(() => this.loading());

    constructor(private readonly router: Router) { }

    loginAs(role: UserRole): void {
        this.loading.set(true);
        queueMicrotask(() => {
            this.activeUser.set(demoUsers[role]);
            this.loading.set(false);
            this.router.navigate(['/dashboard']);
        });
    }

    logout(): void {
        this.activeUser.set(null);
        this.router.navigate(['/login']);
    }

    hasRole(allowedRoles: UserRole[]): boolean {
        const currentRole = this.role();
        return currentRole ? allowedRoles.includes(currentRole) : false;
    }
}