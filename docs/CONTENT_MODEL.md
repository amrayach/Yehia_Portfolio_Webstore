# Content Model

## Goals
- Keep content simple, file-based, and static-friendly.
- Allow easy additions to editorial chapters, text articles, PDFs, and work galleries.
- Keep data contracts explicit so contributors can add content without guessing.

## Folder Structure
```text
src/
  content/
    editorial/
      self-mashallah-01.md
      self-mashallah-02.md
    text/
      article-title.md
    shop/
      love-collection.md
      love-classic-collection.md
      shams-collection.md
      prints.md
    work/
      tattoos/item-slug.md
      logos/item-slug.md
      jewellery/item-slug.md
public/
  images/
    editorial/
    shop/
    work/
  pdfs/
    love-registry.pdf
    article-appendix.pdf
```

## Content Schemas (Frontmatter Contracts)

### `EditorialChapter`
```yaml
title: string                # required
slug: string                 # required, kebab-case
chapterNumber: number        # required
summary: string              # required
coverImage: string           # required, /images/editorial/*
frameImages: string[]        # optional
published: boolean           # required
publishDate: YYYY-MM-DD      # optional
```

### `TextArticle`
```yaml
title: string                # required
slug: string                 # required, kebab-case
excerpt: string              # required
coverImage: string           # optional
pdfUrl: string               # optional, /pdfs/*
published: boolean           # required
publishDate: YYYY-MM-DD      # optional
```

### `ShopCollection`
```yaml
title: string                # required
slug: string                 # required, kebab-case
description: string          # required
status: "out_of_stock"       # required, fixed for MVP
heroImage: string            # required
gallery: string[]            # optional
inquirySubject: string       # required
sortOrder: number            # required
```

### `WorkItem`
```yaml
title: string                # required
slug: string                 # required, kebab-case
category: "tattoos" | "logos" | "jewellery"   # required
summary: string              # optional
image: string                # optional
pdfUrl: string               # optional
behanceUrl: string           # optional
sortOrder: number            # required
```

## Inquiry Payload Contract
```yaml
name: string                 # required
email: string                # required
instagramHandle: string      # optional
subject: string              # required
message: string              # required
collectionSlug: string       # optional
status: "new" | "replied" | "closed"
createdAt: ISO datetime
```

## How To Add Content

### Add an editorial chapter
1. Create `src/content/editorial/<slug>.md`.
2. Fill `EditorialChapter` frontmatter.
3. Add assets under `public/images/editorial/`.
4. Ensure `published: true` when ready.

### Add a text article
1. Create `src/content/text/<slug>.md`.
2. Fill `TextArticle` frontmatter.
3. Add optional PDF to `public/pdfs/` and set `pdfUrl`.

### Add a shop collection
1. Create/update `src/content/shop/<slug>.md`.
2. Keep `status: out_of_stock`.
3. Set clear `inquirySubject` used by contact/inquiry form.

### Add a work item
1. Create file in category folder under `src/content/work/*`.
2. Choose one canonical asset target:
  - local image
  - local PDF
  - external Behance link
3. Set `sortOrder` for deterministic listing.

## Validation Rules
- `slug` must be lowercase kebab-case.
- Required images/PDF paths must exist before merge.
- `sortOrder` must be unique within each collection/category.
- Unpublished entries must not appear in production lists.
