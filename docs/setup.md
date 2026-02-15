# Soglab Website - Setup Guide

## Prerequisites

- Node.js 18+ (18.19.1 tested)
- npm or yarn

## Local Development

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd soglab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to http://localhost:3000

   The site will automatically route to:
   - http://localhost:3000/ko (Korean, default)
   - http://localhost:3000/en (English)

## Adding New Projects

1. Edit `lib/projects.ts`
2. Add new project object to the array:
   ```typescript
   {
     id: 7,
     title: "Project Title",
     description: "Short description",
     image: "https://placehold.co/600x400/...",
     tags: ["React", "TypeScript"],
     slug: "project-slug",
   }
   ```

## Adding Translations

Edit `messages/ko.json` or `messages/en.json` to add or modify translations.

**Translation keys structure:**
- `nav.*` - Navigation items
- `hero.*` - Hero section
- `services.*` - Services section
- `projects.*` - Projects section
- `about.*` - About section
- `footer.*` - Footer content

## Customizing Theme

**Colors:** Edit `app/globals.css` CSS variables in `:root` and `.dark` sections

**Fonts:** Edit `app/layout.tsx` - change `Noto_Sans_KR` and `JetBrains_Mono` imports

**Component styles:** Components use Tailwind CSS - modify class names as needed

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm run start` - Start production server (not used with static export)
- `npm run lint` - Run ESLint
