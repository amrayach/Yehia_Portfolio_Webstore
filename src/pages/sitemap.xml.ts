import type { APIRoute } from 'astro';
import { getEditorialChapters } from '../lib/editorial';
import { getShopCollections } from '../lib/shop';
import { getTextArticles } from '../lib/text';
import { getLogoItems } from '../lib/work';

export const prerender = true;

const STATIC_ROUTES = ['/', '/editorial', '/shop', '/text', '/work', '/work/tattoos', '/work/jewellery', '/work/logos', '/contact'] as const;

const escapeXml = (value: string): string =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

const toAbsoluteUrl = (site: URL, path: string): string => new URL(path, site).toString();

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response('Site URL is not configured. Set `site` in astro.config.mjs.', { status: 500 });
  }

  const [chapters, collections, articles, logos] = await Promise.all([
    getEditorialChapters(),
    getShopCollections(),
    getTextArticles(),
    getLogoItems(),
  ]);

  const urls = new Set<string>([
    ...STATIC_ROUTES.map((path) => toAbsoluteUrl(site, path)),
    ...chapters.map((chapter) => toAbsoluteUrl(site, chapter.url)),
    ...collections.map((collection) => toAbsoluteUrl(site, collection.url)),
    ...articles.map((article) => toAbsoluteUrl(site, article.url)),
    ...logos.map((logo) => toAbsoluteUrl(site, logo.url)),
  ]);

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    ...urls,
  ]
    .sort((a, b) => a.localeCompare(b))
    .map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`)
    .join('\n')}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
