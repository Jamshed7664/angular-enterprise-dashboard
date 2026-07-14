import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
// import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-profile-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.scss']
})
export class UserProfileMenuComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isOpen = signal(false);
  readonly currentUser = this.authService.currentUser;

  readonly initials = computed(() => {
    const name = this.currentUser()?.name?.trim() ?? 'User';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  });

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isOpen.update(value => !value);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }

  onMenuClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  goToProfile(): void {
    this.closeMenu();
    this.router.navigate(['/profile']);
  }

  goToSettings(): void {
    this.closeMenu();
    this.router.navigate(['/settings']);
  }

  logout(): void {
    this.closeMenu();
    this.authService.logout();
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeMenu();
  }
}