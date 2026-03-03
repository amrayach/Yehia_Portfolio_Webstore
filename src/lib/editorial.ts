import { getCollection, type CollectionEntry } from 'astro:content';

export type EditorialEntry = CollectionEntry<'editorial'>;

export interface EditorialChapter {
  entry: EditorialEntry;
  piece: string;
  chapter: string;
  url: string;
}

export interface EditorialPiece {
  piece: string;
  title: string;
  summary: string;
  chapters: EditorialChapter[];
}

const toSortKey = (chapter: EditorialChapter): number => chapter.entry.data.chapterNumber;

const byChapterOrder = (a: EditorialChapter, b: EditorialChapter): number => {
  const orderDelta = toSortKey(a) - toSortKey(b);
  if (orderDelta !== 0) {
    return orderDelta;
  }

  return a.chapter.localeCompare(b.chapter);
};

const parseEditorialId = (id: string): { piece: string; chapter: string } => {
  const segments = id.split('/').filter(Boolean);
  if (segments.length < 2) {
    throw new Error(`Editorial entry id "${id}" must be in "<piece>/<chapter>" format.`);
  }

  const chapter = segments[segments.length - 1]!;
  const piece = segments.slice(0, -1).join('/');
  return { piece, chapter };
};

export const getEditorialChapters = async (): Promise<EditorialChapter[]> => {
  const entries = await getCollection('editorial', ({ data }) => data.published);

  return entries
    .map((entry) => {
      const { piece, chapter } = parseEditorialId(entry.id);
      return {
        entry,
        piece,
        chapter,
        url: `/editorial/${piece}/${chapter}`,
      };
    })
    .sort((a, b) => {
      const pieceDelta = a.piece.localeCompare(b.piece);
      if (pieceDelta !== 0) {
        return pieceDelta;
      }

      return byChapterOrder(a, b);
    });
};

export const getEditorialPieces = async (): Promise<EditorialPiece[]> => {
  const chapters = await getEditorialChapters();
  const byPiece = new Map<string, EditorialPiece>();

  for (const chapter of chapters) {
    const existingPiece = byPiece.get(chapter.piece);

    if (existingPiece) {
      existingPiece.chapters.push(chapter);
      continue;
    }

    byPiece.set(chapter.piece, {
      piece: chapter.piece,
      title: chapter.entry.data.pieceTitle,
      summary: chapter.entry.data.pieceSummary,
      chapters: [chapter],
    });
  }

  return [...byPiece.values()]
    .map((piece) => ({
      ...piece,
      chapters: [...piece.chapters].sort(byChapterOrder),
    }))
    .sort((a, b) => a.piece.localeCompare(b.piece));
};
