import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}'], theme: { extend: { colors: { ink:'#07111f', panel:'#0d1b2d', line:'#20334a', cyan:'#5eead4' }, boxShadow: { glow:'0 0 40px rgba(94,234,212,.12)' } } }, plugins: [] } satisfies Config;
