import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStore } from '../../../../core/store/dashboard.store';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card.component';
import { RevenueChartComponent } from '../../components/revenue-chart/revenue-chart.component';
import { ActivityFeedComponent } from '../../components/activity-feed/activity-feed.component';
import { TeamPerformanceComponent } from '../../components/team-performance/team-performance.component';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions.component';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    KpiCardComponent,
    RevenueChartComponent,
    ActivityFeedComponent,
    TeamPerformanceComponent,
    QuickActionsComponent
  ],
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent {
  readonly dashboardStore = inject(DashboardStore);
}