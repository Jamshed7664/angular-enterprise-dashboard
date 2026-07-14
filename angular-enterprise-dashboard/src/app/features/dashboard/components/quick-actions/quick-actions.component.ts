import { Component } from '@angular/core';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  template: `
    <section class="panel-card quick-actions-card">
      <div>
        <p class="eyebrow">Execution shortcuts</p>
        <h3>Quick actions</h3>
      </div>
      <div class="actions-grid">
        <button type="button" class="action-tile"><strong>Create report</strong><span>Launch a new board pack with the current filters.</span></button>
        <button type="button" class="action-tile"><strong>Review alerts</strong><span>Focus on high-risk renewals, escalations, and overdue tasks.</span></button>
        <button type="button" class="action-tile"><strong>Sync teams</strong><span>Share KPI snapshots with delivery, finance, and support leads.</span></button>
      </div>
    </section>
  `,
  styles: [`.panel-card{background:#fff;border-radius:1.25rem;padding:1.1rem;border:1px solid rgba(148,163,184,.18);box-shadow:0 15px 35px rgba(15,23,42,.05)} .eyebrow{margin:0 0 .3rem;text-transform:uppercase;letter-spacing:.1em;font-size:.72rem;color:#0891b2;font-weight:700} .actions-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.75rem;margin-top:1rem}.action-tile{padding:1rem;border-radius:1rem;background:#f8fafc;text-align:left;border:1px solid rgba(148,163,184,.16)} .action-tile strong{display:block;margin-bottom:.35rem;color:#0f172a}.action-tile span{color:#64748b;font-size:.88rem}@media (max-width:767.98px){.actions-grid{grid-template-columns:1fr;}}`]
})
export class QuickActionsComponent { }