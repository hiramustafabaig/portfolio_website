// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hira-baig-portfolio-website.netlify.app',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});