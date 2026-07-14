import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserFormDialogComponent } from '../../components/user-form-dialog/user-form-dialog.component';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { UsersService } from '../../services/users.service';
import { ManagedUser, UserQueryParams } from '../../../../core/models/user-management.model';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UserTableComponent, UserFormDialogComponent],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {
  private readonly usersService = inject(UsersService);
  private readonly fb = new FormBuilder();
  private readonly destroyRef = inject(DestroyRef);

  readonly users = signal<ManagedUser[]>([]);
  readonly totalUsers = signal(0);
  readonly loading = signal(false);
  readonly page = signal(1);
  readonly limit = signal(8);
  readonly dialogOpen = signal(false);
  readonly selectedUser = signal<ManagedUser | null>(null);
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalUsers() / this.limit())));

  readonly filtersForm = this.fb.group({
    search: [''],
    role: [''],
    status: ['']
  });

  constructor() {
    this.bindSearch();
    this.loadUsers();
  }

  private bindSearch(): void {
    this.filtersForm.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.page.set(1);
      this.loadUsers();
    });
  }

  loadUsers(): void {
    const query: UserQueryParams = {
      page: this.page(),
      limit: this.limit(),
      search: this.filtersForm.value.search ?? '',
      role: this.filtersForm.value.role ?? '',
      status: this.filtersForm.value.status ?? ''
    };

    this.loading.set(true);
    this.usersService.getUsers(query).subscribe({
      next: ({ data, total }) => {
        this.users.set(data);
        this.totalUsers.set(total);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  openCreateDialog(): void {
    this.selectedUser.set(null);
    this.dialogOpen.set(true);
  }

  openEditDialog(user: ManagedUser): void {
    this.selectedUser.set(user);
    this.dialogOpen.set(true);
  }

  closeDialog(): void {
    this.dialogOpen.set(false);
  }

  saveUser(payload: Omit<ManagedUser, 'id'>): void {
    const existing = this.selectedUser();
    const request$ = existing
      ? this.usersService.updateUser(existing.id, payload)
      : this.usersService.createUser(payload);

    request$.subscribe(() => {
      this.dialogOpen.set(false);
      this.loadUsers();
    });
  }

  removeUser(user: ManagedUser): void {
    const confirmed = window.confirm(`Delete ${user.name}?`);
    if (!confirmed) return;

    this.usersService.deleteUser(user.id).subscribe(() => this.loadUsers());
  }

  toggleUserStatus(user: ManagedUser): void {
    this.usersService.toggleStatus(user).subscribe(() => this.loadUsers());
  }

  changePage(nextPage: number): void {
    if (nextPage < 1 || nextPage > this.totalPages()) return;
    this.page.set(nextPage);
    this.loadUsers();
  }

  resetFilters(): void {
    this.filtersForm.reset({ search: '', role: '', status: '' });
    this.page.set(1);
    this.loadUsers();
  }
}