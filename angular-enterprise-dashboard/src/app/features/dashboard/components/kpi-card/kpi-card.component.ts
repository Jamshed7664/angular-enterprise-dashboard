import { Component, input } from '@angular/core';
import { KpiCard } from '../../../../core/models/dashboard.model';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent {
  readonly card = input.required<KpiCard>();
}