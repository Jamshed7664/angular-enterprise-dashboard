import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../../core/store/auth.store';
import { NotificationCenterComponent } from '../notification-center/notification-center.component';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NotificationCenterComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private readonly authStore = inject(AuthStore);
  private readonly themeService = inject(ThemeService);

  readonly currentUser = this.authStore.user;
  readonly displayName = computed(() => this.currentUser()?.name || 'Guest User');
  readonly roleLabel = computed(() => this.authStore.role()?.toUpperCase() ?? 'GUEST');
  readonly isDarkTheme = computed(() => this.themeService.activeTheme() === 'dark');

  logout(): void {
    this.authStore.logout();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}