import { writable, get } from 'svelte/store';

type Theme = 'light' | 'dark';

export const theme = writable<Theme>('light');

export function initializeTheme(): void {
  const currentTheme = get(theme);
  const root = document.querySelector('div[data-theme]');
  if (root) {
    root.setAttribute('data-theme', currentTheme);
  }
}

export function toggleTheme(): void {
  theme.update(current => {
    const newTheme: Theme = current === 'light' ? 'dark' : 'light';
    const root = document.querySelector('div[data-theme]');
    if (root) {
      root.setAttribute('data-theme', newTheme);
    }
    return newTheme;
  });
}