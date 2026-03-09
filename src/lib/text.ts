import { getCollection, type CollectionEntry } from 'astro:content';
import { estimateReadingMinutes } from './reading';

export type TextEntry = CollectionEntry<'text'>;

export interface TextArticle {
  entry: TextEntry;
  slug: string;
  url: string;
  readingMinutes: number;
}

const getPublishTime = (entry: TextEntry): number => entry.data.publishDate?.getTime() ?? 0;

export const getTextArticles = async (): Promise<TextArticle[]> => {
  const entries = await getCollection('text', ({ data }) => data.published);

  return entries
    .map((entry) => ({
      entry,
      slug: entry.data.slug,
      url: `/text/${entry.data.slug}`,
      readingMinutes: estimateReadingMinutes(entry.body ?? ''),
    }))
    .sort((a, b) => {
      const publishDelta = getPublishTime(b.entry) - getPublishTime(a.entry);
      if (publishDelta !== 0) {
        return publishDelta;
      }

      return a.entry.data.title.localeCompare(b.entry.data.title);
    });
};
