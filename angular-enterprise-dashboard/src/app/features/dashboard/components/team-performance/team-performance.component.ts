import { Component, input } from '@angular/core';
import { TeamMetric } from '../../../../core/models/dashboard.model';

@Component({
  selector: 'app-team-performance',
  standalone: true,
  templateUrl: './team-performance.component.html',
  styleUrl: './team-performance.component.scss'
})
export class TeamPerformanceComponent {
  readonly teams = input.required<TeamMetric[]>();
}