import { Component, input } from '@angular/core';
import { ActivityItem } from '../../../../core/models/dashboard.model';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  templateUrl: './activity-feed.component.html',
  styleUrl: './activity-feed.component.scss'
})
export class ActivityFeedComponent {
  readonly items = input.required<ActivityItem[]>();
}