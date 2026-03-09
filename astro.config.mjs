import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

const resolveSiteUrl = () => {
  const rawSiteUrl = (process.env.PUBLIC_SITE_URL ?? process.env.CF_PAGES_URL ?? '').trim();
  const shouldEnforceSiteUrl = process.env.CI === 'true' || process.env.CF_PAGES === '1';

  if (!rawSiteUrl) {
    if (shouldEnforceSiteUrl) {
      throw new Error('PUBLIC_SITE_URL is required for production builds.');
    }

    return 'http://localhost:4321';
  }

  if (rawSiteUrl.startsWith('http://') || rawSiteUrl.startsWith('https://')) {
    if (shouldEnforceSiteUrl && rawSiteUrl.includes('example.com')) {
      throw new Error('PUBLIC_SITE_URL cannot point to example.com for production builds.');
    }
    return rawSiteUrl;
  }

  const normalizedSiteUrl = `https://${rawSiteUrl}`;
  if (shouldEnforceSiteUrl && normalizedSiteUrl.includes('example.com')) {
    throw new Error('PUBLIC_SITE_URL cannot point to example.com for production builds.');
  }
  return normalizedSiteUrl;
};

export default defineConfig({
  site: resolveSiteUrl(),
  output: 'static',
  outDir: 'dist',
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  adapter: cloudflare(),
  integrations: [tailwind(), mdx()],
});
