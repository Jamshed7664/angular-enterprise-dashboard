import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <div class="page-header-card">
      <div>
        <p class="eyebrow">{{ eyebrow() }}</p>
        <h1>{{ title() }}</h1>
      </div>
      <p>{{ description() }}</p>
    </div>
  `,
  styles: [`.page-header-card{display:flex;justify-content:space-between;gap:1rem;align-items:end;padding:1.25rem;border-radius:1.25rem;background:#fff;border:1px solid rgba(15,23,42,.08);box-shadow:0 20px 45px rgba(15,23,42,.06)} .eyebrow{margin:0 0 .35rem;text-transform:uppercase;letter-spacing:.1em;font-size:.74rem;color:#0891b2;font-weight:700} h1{margin:0;font-size:1.55rem;color:#0f172a} p:last-child{margin:0;max-width:42rem;color:#475569}@media (max-width:767.98px){.page-header-card{flex-direction:column;align-items:start;}}`]
})
export class PageHeaderComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}