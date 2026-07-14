import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagedUser, UserRole, UserStatus } from '../../../../core/models/user-management.model';

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {
  @Input() set user(value: ManagedUser | null) {
    if (value) {
      this.mode.set('edit');
      this.form.patchValue(value);
    } else {
      this.mode.set('create');
      this.form.reset({
        name: '',
        email: '',
        role: 'manager',
        team: '',
        title: '',
        status: 'active',
        avatar: 'AU',
        lastActive: new Date().toISOString().slice(0, 10)
      });
    }
  }

  @Input() visible = false;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() submitUser = new EventEmitter<Omit<ManagedUser, 'id'>>();

  readonly roles: UserRole[] = ['admin', 'manager', 'analyst', 'developer'];
  readonly statuses: UserStatus[] = ['active', 'inactive'];
  readonly mode = signal<'create' | 'edit'>('create');
  readonly dialogTitle = computed(() => this.mode() === 'create' ? 'Add new user' : 'Edit user');

  private readonly fb = new FormBuilder();

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['manager' as UserRole, Validators.required],
    team: ['', Validators.required],
    title: ['', Validators.required],
    status: ['active' as UserStatus, Validators.required],
    lastActive: [new Date().toISOString().slice(0, 10), Validators.required],
    avatar: ['AU', [Validators.required, Validators.maxLength(2)]]
  });

  close(): void {
    this.closeDialog.emit();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitUser.emit(this.form.getRawValue() as Omit<ManagedUser, 'id'>);
  }
}