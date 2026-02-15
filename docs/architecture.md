# Architecture

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **i18n:** next-intl
- **Theming:** next-themes
- **Icons:** Lucide React

## Project Structure

```
app/[locale]/       # Localized pages (ko, en)
  ├── layout.tsx    # Root layout with providers
  ├── page.tsx      # Home page
  ├── projects/     # Projects listing
  └── about/        # About page

components/         # React components
  ├── ui/          # shadcn/ui base components
  ├── header.tsx   # Navigation header
  ├── footer.tsx   # Footer
  ├── project-card.tsx
  ├── theme-toggle.tsx
  ├── language-toggle.tsx
  └── theme-provider.tsx

lib/               # Utilities
  ├── i18n.ts     # i18n config
  ├── projects.ts # Project data
  └── utils.ts    # Helper functions

messages/          # Translations
  ├── ko.json     # Korean
  └── en.json     # English

docs/              # Documentation
  ├── setup.md    # Setup guide
  ├── deployment.md # Deployment guide
  └── architecture.md # This file
```

## Key Features

### Internationalization (i18n)
- URL-based locale routing (/ko, /en)
- Server-side translation with next-intl
- Language toggle with dropdown
- Automatic locale detection via middleware

**Implementation:**
- `lib/i18n.ts` - i18n configuration
- `middleware.ts` - Locale routing middleware
- `messages/` - Translation JSON files
- `app/[locale]/` - Localized page structure

### Theming
- System preference detection
- Manual dark/light toggle
- localStorage persistence
- Smooth transitions

**Implementation:**
- `components/theme-provider.tsx` - Theme wrapper
- `components/theme-toggle.tsx` - Toggle button
- `app/globals.css` - CSS variables for colors
- `tailwind.config.ts` - Theme configuration

### UI Components
- shadcn/ui components (Button, Card, Dropdown Menu, Badge)
- Custom components (Header, Footer, ProjectCard)
- Responsive design (mobile-first)

### Performance
- Static site generation (GitHub Pages)
- Image optimization disabled for static export
- Minimal bundle size (~87 KB shared JS)
- Code splitting by route

## Data Flow

### Page Rendering Flow

1. **Request** → `middleware.ts` detects locale
2. **Routing** → Next.js serves `app/[locale]/page.tsx`
3. **i18n** → `lib/i18n.ts` loads translations
4. **Providers** → ThemeProvider wraps app
5. **Components** → Render with translations and theme

### Theme Flow

1. **Initial Load** → System preference detected
2. **Toggle** → User clicks theme button
3. **Storage** → Preference saved to localStorage
4. **Apply** → CSS variables update via `class` on html element

### Language Switching Flow

1. **User selects** → Click language toggle
2. **URL Update** → Router pushes new locale path
3. **Reload** → Page re-renders with new locale
4. **Translations** → New messages loaded from JSON

## Deployment Targets

### Development: GitHub Pages
- **Type:** Static HTML
- **Build Command:** `npm run build`
- **Output:** `out/` folder
- **Config:** `next.config.mjs` with `output: 'export'`
- **Deployment:** GitHub Actions (push to main)

### Production: Docker
- **Type:** Node.js Standalone Server
- **Build Command:** `docker build`
- **Output:** Docker image with `node:20-alpine`
- **Config:** `docker.next.config.mjs` with `output: 'standalone'`
- **Deployment:** `docker-compose up -d`

## Design Decisions

### Why shadcn/ui?
- Copy-paste components (full code ownership)
- Built on Radix UI (accessible)
- Tailwind CSS integration
- Minimal/clean aesthetic

### Why next-intl?
- Built-in i18n routing
- TypeScript support
- Works with static export
- Server and client components

### Why Static Export + Docker?
- **GitHub Pages:** Free hosting, fast setup, good for development
- **Docker:** Production-ready, full Next.js features, scalable
- Easy switching between both with config swap

## Future Enhancements

Possible additions:
- Blog section with MDX
- Project detail pages
- Contact form
- Analytics integration
- SEO optimizations (metadata, sitemap)
- A11y improvements (ARIA labels, keyboard navigation)
