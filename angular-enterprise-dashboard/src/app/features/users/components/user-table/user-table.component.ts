import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ManagedUser } from '../../../../core/models/user-management.model';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  @Input({ required: true }) users: ManagedUser[] = [];
  @Output() editUser = new EventEmitter<ManagedUser>();
  @Output() deleteUser = new EventEmitter<ManagedUser>();
  @Output() toggleStatus = new EventEmitter<ManagedUser>();
}