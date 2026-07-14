import { Injectable, computed, signal } from '@angular/core';
import { ActivityItem, KpiCard, TeamMetric } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardStore {
    readonly sidebarCollapsed = signal(false);
    readonly selectedRange = signal<'7d' | '30d' | '90d'>('30d');

    private readonly kpis = signal<KpiCard[]>([
        { title: 'Net revenue', value: '$1.28M', delta: '+18.4%', trend: 'up', helper: 'Compared with last month' },
        { title: 'Qualified leads', value: '3,842', delta: '+9.1%', trend: 'up', helper: 'Sales accepted pipeline' },
        { title: 'Escalation risk', value: '14', delta: '-21.3%', trend: 'down', helper: 'Accounts needing leadership review' },
        { title: 'Renewal coverage', value: '92%', delta: '+6.8%', trend: 'up', helper: 'Contracts closing this quarter' }
    ]);

    private readonly activities = signal<ActivityItem[]>([
        { title: 'Board summary published', description: 'Finance shared the weekly operating snapshot with commentary.', time: '12 min ago', tone: 'info' },
        { title: 'High-risk ticket resolved', description: 'The support pod closed the logistics integration outage.', time: '29 min ago', tone: 'success' },
        { title: 'Access review pending', description: 'Three elevated permissions need admin approval before 6 PM.', time: '1 hour ago', tone: 'warning' }
    ]);

    private readonly teamMetrics = signal<TeamMetric[]>([
        { team: 'North zone growth', completion: 84, revenue: '$420K', owner: 'Neha Verma' },
        { team: 'Enterprise renewals', completion: 76, revenue: '$318K', owner: 'Kunal Mehta' },
        { team: 'Platform adoption', completion: 91, revenue: '$284K', owner: 'Simran Gill' },
        { team: 'Strategic partnerships', completion: 69, revenue: '$251K', owner: 'Aisha Khan' }
    ]);

    readonly kpiCards = computed(() => this.kpis());
    readonly recentActivities = computed(() => this.activities());
    readonly teamPerformance = computed(() => this.teamMetrics());

    readonly revenueSeries = computed(() => {
        const range = this.selectedRange();
        if (range === '7d') {
            return { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [84, 92, 88, 102, 110, 104, 118] };
        }
        if (range === '90d') {
            return { labels: ['Jan', 'Feb', 'Mar'], data: [320, 360, 410] };
        }
        return { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [260, 295, 312, 418] };
    });

    toggleSidebar(): void {
        this.sidebarCollapsed.update((collapsed) => !collapsed);
    }

    setRange(range: '7d' | '30d' | '90d'): void {
        this.selectedRange.set(range);
    }
}