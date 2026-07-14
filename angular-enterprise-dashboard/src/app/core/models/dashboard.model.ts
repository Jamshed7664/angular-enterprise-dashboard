export interface KpiCard {
    title: string;
    value: string;
    delta: string;
    trend: 'up' | 'down';
    helper: string;
}

export interface ActivityItem {
    title: string;
    description: string;
    time: string;
    tone: 'success' | 'warning' | 'info';
}

export interface TeamMetric {
    team: string;
    completion: number;
    revenue: string;
    owner: string;
}