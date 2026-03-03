import { getCollection, type CollectionEntry } from 'astro:content';

export type WorkEntry = CollectionEntry<'work'>;
export type WorkCategory = WorkEntry['data']['category'];

export interface WorkItem {
  entry: WorkEntry;
  slug: string;
  category: WorkCategory;
  url: string;
}

const categoryOrder: Record<WorkCategory, number> = {
  tattoos: 0,
  jewellery: 1,
  logos: 2,
};

const buildItemUrl = (entry: WorkEntry): string => {
  if (entry.data.category === 'logos') {
    return `/work/logos/${entry.data.slug}`;
  }

  return `/work/${entry.data.category}`;
};

const bySortOrder = (a: WorkItem, b: WorkItem): number => {
  const sortDelta = a.entry.data.sortOrder - b.entry.data.sortOrder;
  if (sortDelta !== 0) {
    return sortDelta;
  }

  return a.entry.data.title.localeCompare(b.entry.data.title);
};

export const getWorkItems = async (): Promise<WorkItem[]> => {
  const entries = await getCollection('work');

  return entries
    .map((entry) => ({
      entry,
      slug: entry.data.slug,
      category: entry.data.category,
      url: buildItemUrl(entry),
    }))
    .sort((a, b) => {
      const categoryDelta = categoryOrder[a.category] - categoryOrder[b.category];
      if (categoryDelta !== 0) {
        return categoryDelta;
      }

      return bySortOrder(a, b);
    });
};

export const getWorkItemsByCategory = async (category: WorkCategory): Promise<WorkItem[]> => {
  const items = await getWorkItems();
  return items.filter((item) => item.category === category);
};

export const getLogoItems = async (): Promise<WorkItem[]> => getWorkItemsByCategory('logos');
