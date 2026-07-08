import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vigilantlabs.in',
  output: 'static',
  integrations: [sitemap()],
});
