import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { DashboardStore } from '../../core/store/dashboard.store';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  private readonly dashboardStore = inject(DashboardStore);
  readonly collapsed = computed(() => this.dashboardStore.sidebarCollapsed());
}