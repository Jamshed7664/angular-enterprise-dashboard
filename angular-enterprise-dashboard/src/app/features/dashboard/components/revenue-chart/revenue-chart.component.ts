import { Component, computed, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { DashboardStore } from '../../../../core/store/dashboard.store';

type RevenueRange = '7d' | '30d' | '90d';

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss']
})
export class RevenueChartComponent {
  private readonly dashboardStore = inject(DashboardStore);

  readonly ranges = ['7d', '30d', '90d'] as const;
  readonly selectedRange = this.dashboardStore.selectedRange;

  readonly chartData = computed<ChartConfiguration<'line'>['data']>(() => {
    const series = this.dashboardStore.revenueSeries();

    return {
      labels: series.labels,
      datasets: [
        {
          data: series.data,
          label: 'Revenue momentum',
          tension: 0.35,
          fill: true,
          borderColor: '#0891b2',
          backgroundColor: 'rgba(8, 145, 178, 0.12)',
          pointBackgroundColor: '#0f172a',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
  });

  readonly chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(148, 163, 184, 0.18)' },
        ticks: { color: '#64748b' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748b' }
      }
    }
  };

  setRange(range: RevenueRange): void {
    this.dashboardStore.setRange(range);
  }
}