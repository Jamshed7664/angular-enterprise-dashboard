import { Injectable, computed, effect, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ActiveTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly themeMode = signal<ThemeMode>('light');

  readonly activeTheme = computed<ActiveTheme>(() => {
    const mode = this.themeMode();

    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return mode;
  });

  constructor() {
    effect(() => {
      const theme = this.activeTheme();
      document.documentElement.setAttribute('data-theme', theme);
    });

    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');

      media.addEventListener?.('change', () => {
        if (this.themeMode() === 'system') {
          document.documentElement.setAttribute('data-theme', media.matches ? 'dark' : 'light');
        }
      });
    }
  }

  setTheme(mode: ThemeMode): void {
    this.themeMode.set(mode);
  }

  toggleTheme(): void {
    this.themeMode.update(mode => {
      const current = mode === 'system' ? this.activeTheme() : mode;
      return current === 'dark' ? 'light' : 'dark';
    });
  }

  isDark(): boolean {
    return this.activeTheme() === 'dark';
  }
}