import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../../core/store/auth.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly authStore = inject(AuthStore);
  readonly currentUser = this.authStore.user;
  readonly roleLabel = computed(() => this.authStore.role()?.toUpperCase() ?? 'GUEST');

  logout(): void {
    this.authStore.logout();
  }
}