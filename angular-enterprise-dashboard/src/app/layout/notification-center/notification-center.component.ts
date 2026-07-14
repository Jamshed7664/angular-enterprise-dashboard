import { Component, HostListener, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'info' | 'warning' | 'success';
}

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss']
})
export class NotificationCenterComponent {
  readonly isOpen = signal(false);

  readonly notifications = signal<NotificationItem[]>([
    {
      id: 1,
      title: 'Revenue milestone reached',
      message: 'Weekly revenue exceeded the projected target by 8.4%.',
      time: '5 min ago',
      unread: true,
      type: 'success'
    },
    {
      id: 2,
      title: 'Renewal risk detected',
      message: 'Three enterprise accounts require leadership review today.',
      time: '18 min ago',
      unread: true,
      type: 'warning'
    },
    {
      id: 3,
      title: 'Deployment completed',
      message: 'Customer support dashboard improvements are now live.',
      time: '1 hour ago',
      unread: false,
      type: 'info'
    }
  ]);

  readonly unreadCount = computed(
    () => this.notifications().filter(item => item.unread).length
  );

  toggleDropdown(): void {
    this.isOpen.update(value => !value);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  markAllAsRead(): void {
    this.notifications.update(items =>
      items.map(item => ({ ...item, unread: false }))
    );
  }

  markAsRead(id: number): void {
    this.notifications.update(items =>
      items.map(item =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  }

  trackById(_: number, item: NotificationItem): number {
    return item.id;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeDropdown();
  }

  onPanelClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}