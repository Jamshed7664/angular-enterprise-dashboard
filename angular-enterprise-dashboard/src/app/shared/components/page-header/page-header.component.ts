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
      <p class="page-description">{{ description() }}</p>
    </div>
  `,
  styles: [`
    .page-header-card {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 1rem;
      padding: 1.25rem;
      border-radius: 1.25rem;
      background: var(--dashboard-panel-bg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      color: var(--text-primary);
    }

    .eyebrow {
      margin: 0 0 .35rem;
      text-transform: uppercase;
      letter-spacing: .1em;
      font-size: .74rem;
      font-weight: 700;
      color: var(--brand-secondary);
    }

    h1 {
      margin: 0;
      font-size: 1.55rem;
      color: var(--text-primary);
      line-height: 1.15;
    }

    .page-description {
      margin: 0;
      max-width: 42rem;
      color: var(--text-secondary);
      font-size: .95rem;
      line-height: 1.6;
    }

    @media (max-width: 767.98px) {
      .page-header-card {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class PageHeaderComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}