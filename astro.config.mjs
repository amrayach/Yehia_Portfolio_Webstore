import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

const resolveSiteUrl = () => {
  const rawSiteUrl = process.env.PUBLIC_SITE_URL ?? process.env.CF_PAGES_URL ?? 'https://example.com';

  if (rawSiteUrl.startsWith('http://') || rawSiteUrl.startsWith('https://')) {
    return rawSiteUrl;
  }

  return `https://${rawSiteUrl}`;
};

export default defineConfig({
  site: resolveSiteUrl(),
  output: 'static',
  outDir: 'dist',
  adapter: cloudflare(),
  integrations: [tailwind(), mdx()],
});
