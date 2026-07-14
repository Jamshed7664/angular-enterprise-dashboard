import { Component, computed, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { DashboardStore } from '../../../../core/store/dashboard.store';
import { ThemeService } from '../../../../core/services/theme.service';

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
  private readonly themeService = inject(ThemeService);

  readonly ranges = ['7d', '30d', '90d'] as const;
  readonly selectedRange = this.dashboardStore.selectedRange;

  readonly chartData = computed<ChartConfiguration<'line'>['data']>(() => {
    this.themeService.activeTheme();

    const series = this.dashboardStore.revenueSeries();

    return {
      labels: series.labels,
      datasets: [
        {
          data: series.data,
          label: 'Revenue momentum',
          tension: 0.35,
          fill: true,
          borderColor: this.getCssVar('--chart-line'),
          backgroundColor: this.getCssVar('--chart-fill'),
          pointBackgroundColor: this.getCssVar('--chart-point-bg'),
          pointBorderColor: this.getCssVar('--chart-point-border'),
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
  });

  readonly chartOptions = computed<ChartConfiguration<'line'>['options']>(() => {
    this.themeService.activeTheme();

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: this.getCssVar('--chart-tooltip-bg'),
          titleColor: this.getCssVar('--chart-tooltip-text'),
          bodyColor: this.getCssVar('--chart-tooltip-text'),
          borderColor: this.getCssVar('--chart-tooltip-border'),
          borderWidth: 1,
          displayColors: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: this.getCssVar('--chart-grid')
          },
          ticks: {
            color: this.getCssVar('--chart-tick')
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: this.getCssVar('--chart-tick')
          }
        }
      }
    };
  });

  setRange(range: RevenueRange): void {
    this.dashboardStore.setRange(range);
  }

  private getCssVar(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
}