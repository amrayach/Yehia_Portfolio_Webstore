import { getCollection, type CollectionEntry } from 'astro:content';
import { buildInstagramInquiryUrl, buildMailtoUrl } from './site';

export type ShopEntry = CollectionEntry<'shop'>;

export interface ShopCollection {
  entry: ShopEntry;
  slug: string;
  url: string;
}

export interface ShopItem {
  id: string;
  title: string;
  image: string;
  statusLabel: 'SOLD OUT';
  inquiryMessage: string;
  instagramInquiryUrl: string;
  emailInquiryUrl: string;
}

const bySortOrder = (a: ShopCollection, b: ShopCollection): number => {
  const sortDelta = a.entry.data.sortOrder - b.entry.data.sortOrder;
  if (sortDelta !== 0) {
    return sortDelta;
  }

  return a.entry.data.title.localeCompare(b.entry.data.title);
};

const buildInquiryMessage = (collectionTitle: string, itemTitle: string): string => {
  return `Hi Yehia, I want to inquire about ${collectionTitle} (${itemTitle}). I understand it is sold out, please share any future availability.`;
};

const buildEmailInquiryUrl = (subject: string, message: string): string => {
  return buildMailtoUrl(subject, message);
};

export const getShopCollections = async (): Promise<ShopCollection[]> => {
  const entries = await getCollection('shop');

  return entries
    .map((entry) => ({
      entry,
      slug: entry.data.slug,
      url: `/shop/${entry.data.slug}`,
    }))
    .sort(bySortOrder);
};

export const getShopCollectionBySlug = async (slug: string): Promise<ShopCollection | undefined> => {
  const collections = await getShopCollections();
  return collections.find((collection) => collection.slug === slug);
};

export const getShopItems = (collection: ShopCollection): ShopItem[] => {
  const gallery = collection.entry.data.gallery?.length
    ? collection.entry.data.gallery
    : [collection.entry.data.heroImage];

  return gallery.map((image, index) => {
    const itemTitle = `${collection.entry.data.title} Item ${String(index + 1).padStart(2, '0')}`;
    const inquiryMessage = buildInquiryMessage(collection.entry.data.title, itemTitle);

    return {
      id: `${collection.slug}-${index + 1}`,
      title: itemTitle,
      image,
      statusLabel: 'SOLD OUT',
      inquiryMessage,
      instagramInquiryUrl: buildInstagramInquiryUrl(inquiryMessage),
      emailInquiryUrl: buildEmailInquiryUrl(collection.entry.data.inquirySubject, inquiryMessage),
    };
  });
};
