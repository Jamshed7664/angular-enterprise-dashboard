import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardStore } from '../../core/store/dashboard.store';
import { AuthStore } from '../../core/store/auth.store';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private readonly dashboardStore = inject(DashboardStore);
  private readonly authStore = inject(AuthStore);

  readonly collapsed = computed(() => this.dashboardStore.sidebarCollapsed());
  readonly currentUser = this.authStore.user;
  readonly isAdmin = computed(() => this.authStore.role() === 'admin');

  toggleSidebar(): void {
    this.dashboardStore.toggleSidebar();
  }
}