// API base URL: set VITE_API_URL in .env for production (e.g. EC2)
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';
