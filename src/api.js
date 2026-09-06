const configuredBase = (import.meta.env.VITE_API_BASE || '').trim().replace(/\/$/, '');

export const API_BASE = configuredBase || 'http://localhost:5000';

export function apiUrl(path = '') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}
