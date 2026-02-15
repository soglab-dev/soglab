# Soglab Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a minimal/clean portfolio website for Soglab company showcasing software consulting, game development, and deep learning R&D projects with Korean/English language support and dark/light theme switching.

**Architecture:** Next.js 14 with App Router for SEO-friendly SSR, shadcn/ui for pre-built minimal components, next-intl for i18n routing, next-themes for theme persistence. Static export for GitHub Pages (Phase 1), standalone build for Docker (Phase 2).

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, next-intl, next-themes, Lucide React, Noto Sans KR

---

## Prerequisites

**Required:**
- Node.js 20+ installed
- npm or yarn package manager
- Git account for GitHub Pages deployment

**Not Required:**
- No backend needed (static site)
- No database (all content hardcoded)
- No authentication

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: All Next.js base files via `create-next-app`

**Step 1: Create Next.js project with TypeScript and Tailwind**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

Expected output:
```
✔ Would you like to use App Router? › Yes
✔ Would you like to use TypeScript? › Yes
✔ Would you like to use Tailwind CSS? › Yes
```

**Step 2: Install additional dependencies**

Run:
```bash
npm install next-intl next-themes lucide-react class-variance-authority clsx tailwind-merge
```

Expected: Packages installed successfully

**Step 3: Install dev dependencies (shadcn requirements)**

Run:
```bash
npm install -D @types/node
```

Expected: Dev dependencies installed

**Step 4: Initialize shadcn/ui**

Run:
```bash
npx shadcn@latest init --yes --defaults
```

Expected:
```
✔ components/.json created
✔ Tailwind config updated
```

**Step 5: Add shadcn components**

Run:
```bash
npx shadcn@latest add button card navigation-menu dropdown-menu
```

Expected: Components created in `components/ui/`

**Step 6: Remove default Next.js boilerplate**

Delete: `app/page.tsx` content (keep file structure)

**Step 7: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js project with TypeScript, Tailwind, and shadcn/ui"
```

---

## Task 2: Configure Tailwind and Design System

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

**Step 1: Update Tailwind config for custom colors and fonts**

Edit: `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

**Step 2: Add CSS variables for theming**

Edit: `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --accent: 217.2 91.2% 59.8%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --accent: 217.2 91.2% 59.8%;
    --accent-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Step 3: Add Noto Sans KR font**

Create: `app/layout.tsx` (root layout)

```typescript
import type { Metadata } from "next";
import { Noto_Sans_KR, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soglab - AI, Games, Software Innovation",
  description: "Soglab delivers cutting-edge technology solutions in AI, game development, and software consulting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${notoSans.variable} ${jetbrains.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**Step 4: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors

**Step 5: Commit**

```bash
git add .
git commit -m "feat: configure Tailwind colors, fonts, and design system"
```

---

## Task 3: Setup Internationalization (i18n)

**Files:**
- Create: `lib/i18n.ts`
- Create: `messages/ko.json`
- Create: `messages/en.json`
- Create: `middleware.ts`
- Create: `app/[locale]/layout.tsx`
- Create: `app/[locale]/template.tsx`

**Step 1: Create i18n configuration**

Create: `lib/i18n.ts`

```typescript
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["ko", "en"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

export { locales };
```

**Step 2: Create Korean translations**

Create: `messages/ko.json`

```json
{
  "nav": {
    "home": "홈",
    "projects": "프로젝트",
    "about": "소개"
  },
  "hero": {
    "title": "AI, Games, Software의 교차점에서 혁신을 만듭니다",
    "subtitle": "Soglab은 첨단 기술 솔루션을 제공합니다",
    "cta": "프로젝트 보기"
  },
  "services": {
    "title": "서비스",
    "software": {
      "title": "소프트웨어 개발",
      "description": "클라우드 네이티브 애플리케이션과 엔터프라이즈 솔루션"
    },
    "game": {
      "title": "게임 개발",
      "description": "실시간 멀티플레이어 게임과 AI 기반 게임 시스템"
    },
    "ai": {
      "title": "딥러닝 R&D",
      "description": "컴퓨터 비전, 자연어 처리, 강화학습 연구"
    }
  },
  "projects": {
    "title": "프로젝트",
    "subtitle": "진행 중인 주요 프로젝트들을 소개합니다",
    "viewMore": "더보기",
    "comingSoon": "Coming Soon"
  },
  "about": {
    "title": "Soglab 소개",
    "vision": "혁신적인 기술로 더 나은 미래를 만듭니다",
    "description": "Soglab은 AI, 게임, 소프트웨어 개발의 교차점에서 혁신적인 솔루션을 만드는 테크 기업입니다."
  },
  "footer": {
    "copyright": "© 2026 Soglab. All rights reserved.",
    "contact": "연락처"
  }
}
```

**Step 3: Create English translations**

Create: `messages/en.json`

```json
{
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "about": "About"
  },
  "hero": {
    "title": "Innovating at the Intersection of AI, Games & Software",
    "subtitle": "Soglab delivers cutting-edge technology solutions",
    "cta": "View Projects"
  },
  "services": {
    "title": "Services",
    "software": {
      "title": "Software Development",
      "description": "Cloud-native applications and enterprise solutions"
    },
    "game": {
      "title": "Game Development",
      "description": "Real-time multiplayer games and AI-powered game systems"
    },
    "ai": {
      "title": "Deep Learning R&D",
      "description": "Computer vision, NLP, and reinforcement learning research"
    }
  },
  "projects": {
    "title": "Projects",
    "subtitle": "Showcasing our key ongoing projects",
    "viewMore": "View More",
    "comingSoon": "Coming Soon"
  },
  "about": {
    "title": "About Soglab",
    "vision": "Building a better future with innovative technology",
    "description": "Soglab is a tech company creating innovative solutions at the intersection of AI, games, and software development."
  },
  "footer": {
    "copyright": "© 2026 Soglab. All rights reserved.",
    "contact": "Contact"
  }
}
```

**Step 4: Create Next.js middleware for locale detection**

Create: `middleware.ts`

```typescript
import createMiddleware from "next-intl/middleware";
import { locales } from "./lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale: "ko",
  localePrefix: "always",
});

export const config = {
  matcher: ["/", "/(ko|en)/:path*"];
};
```

**Step 5: Create localized layout**

Create: `app/[locale]/layout.tsx`

```typescript
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";
import { ThemeProvider } from "@/components/theme-provider";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Soglab - AI, Games, Software Innovation",
  description: "Soglab delivers cutting-edge technology solutions",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Step 6: Commit**

```bash
git add .
git commit -m "feat: setup internationalization with next-intl (ko/en)"
```

---

## Task 4: Create Theme Provider and Toggle Component

**Files:**
- Create: `components/theme-provider.tsx`
- Create: `components/theme-toggle.tsx`

**Step 1: Create theme provider component**

Create: `components/theme-provider.tsx`

```typescript
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

**Step 2: Create theme toggle button**

Create: `components/theme-toggle.tsx`

```typescript
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

**Step 3: Test theme switching locally**

Run:
```bash
npm run dev
```

Expected: Dev server starts on port 3000

Visit: http://localhost:3000

Expected: Page loads without errors (will be empty, no layout yet)

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add theme provider and toggle button with next-themes"
```

---

## Task 5: Create Language Toggle Component

**Files:**
- Create: `components/language-toggle.tsx`

**Step 1: Create language selector**

Create: `components/language-toggle.tsx`

```typescript
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

const languages = [
  { code: "ko", name: "한국어" },
  { code: "en", name: "English" },
];

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={lang.code === locale ? "bg-accent" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add language toggle component (ko/en)"
```

---

## Task 6: Create Header Component

**Files:**
- Create: `components/header.tsx`

**Step 1: Create navigation header**

Create: `components/header.tsx`

```typescript
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const navItems = [
    { href: "/ko", label: t("home") },
    { href: "/ko/projects", label: t("projects") },
    { href: "/ko/about", label: t("about") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Soglab</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add header with navigation, theme toggle, and language toggle"
```

---

## Task 7: Create Footer Component

**Files:**
- Create: `components/footer.tsx`

**Step 1: Create footer component**

Create: `components/footer.tsx`

```typescript
import { useTranslations } from "next-intl";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm text-muted-foreground">
            {t("copyright")}
          </p>

          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/soglab" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com/company/soglab" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add footer component with social links"
```

---

## Task 8: Create Project Card Component

**Files:**
- Create: `components/project-card.tsx`
- Create: `lib/projects.ts`

**Step 1: Define project data structure**

Create: `lib/projects.ts`

```typescript
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AI 기반 챗봇 시스템",
    description: "LLM 기반 고객 지원 챗봇으로 자연어 질문 이해 및 답변 생성",
    image: "https://placehold.co/600x400/e2e8f0/0f172a?text=AI+Chatbot",
    tags: ["Python", "LangChain", "OpenAI", "FastAPI"],
    slug: "ai-chatbot",
  },
  {
    id: 2,
    title: "실시간 멀티플레이어 게임",
    description: "WebSocket 기반 실시간 동기화 게임 서버",
    image: "https://placehold.co/600x400/e2e8f0/0f172a?text=Multiplayer+Game",
    tags: ["Node.js", "WebSocket", "Redis", "React"],
    slug: "multiplayer-game",
  },
  {
    id: 3,
    title: "컴퓨터 비전 분석 도구",
    description: "이미지 처리 및 객체 검출을 위한 CV 분석 플랫폼",
    image: "https://placehold.co/600x400/e2e8f0/0f172a?text=Computer+Vision",
    tags: ["Python", "OpenCV", "TensorFlow", "Flask"],
    slug: "cv-tool",
  },
  {
    id: 4,
    title: "클라우드 관리 대시보드",
    description: "인프라 모니터링 및 리소스 관리 시스템",
    image: "https://placehold.co/600x400/e2e8f0/0f172a?text=Cloud+Dashboard",
    tags: ["React", "TypeScript", "AWS", "GraphQL"],
    slug: "cloud-dashboard",
  },
  {
    id: 5,
    title: "게임 AI 엔진",
    description: "강화학습 기반 NPC 행동 및 의사결정 시스템",
    image: "https://placehold.co/600x400/e2e8f0/0f172a?text=Game+AI",
    tags: ["Python", "PyTorch", "RL", "Unity"],
    slug: "game-ai",
  },
  {
    id: 6,
    title: "자연어 처리 파이프라인",
    description: "텍스트 분석, 감성 분류, 요약 자동화 플랫폼",
    image: "https://placehold.co/600x400/e2e8f0/0f172a?text=NLP+Pipeline",
    tags: ["Python", "Hugging Face", "spaCy", "Kubernetes"],
    slug: "nlp-pipeline",
  },
];
```

**Step 2: Create project card component**

Create: `components/project-card.tsx`

```typescript
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-mono text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">
          자세히 보기 →
        </Button>
      </CardFooter>
    </Card>
  );
}
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add project card component with project data"
```

---

## Task 9: Add Badge Component (if not exists)

**Files:**
- Check: `components/ui/badge.tsx`
- Create: `components/ui/badge.tsx` (if missing)

**Step 1: Check if badge component exists**

Run:
```bash
ls components/ui/badge.tsx 2>/dev/null || echo "Badge component not found"
```

**Step 2: Add badge component if missing**

Run:
```bash
npx shadcn@latest add badge
```

Expected: `components/ui/badge.tsx` created

**Step 3: Commit (if badge was created)**

```bash
git add components/ui/badge.tsx
git commit -m "feat: add shadcn badge component"
```

---

## Task 10: Create Home Page

**Files:**
- Create: `app/[locale]/page.tsx`

**Step 1: Create main landing page**

Create: `app/[locale]/page.tsx`

```typescript
import { useTranslations } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t("hero.subtitle")}
            </p>
            <Button size="lg" asChild>
              <a href="#projects">{t("hero.cta")}</a>
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section className="container py-24 bg-muted/50">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("services.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{t("services.software.title")}</h3>
              <p className="text-muted-foreground">{t("services.software.description")}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{t("services.game.title")}</h3>
              <p className="text-muted-foreground">{t("services.game.description")}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{t("services.ai.title")}</h3>
              <p className="text-muted-foreground">{t("services.ai.description")}</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("projects.title")}</h2>
            <p className="text-xl text-muted-foreground">{t("projects.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="container py-24 bg-muted/50">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">{t("about.title")}</h2>
            <p className="text-2xl font-semibold text-primary mb-6">{t("about.vision")}</p>
            <p className="text-lg text-muted-foreground">{t("about.description")}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
```

**Step 2: Test home page**

Run:
```bash
npm run dev
```

Visit: http://localhost:3000/ko

Expected: Full home page with hero, services, projects, about sections

**Step 3: Test language switching**

Click: Language toggle button (🌐)

Expected: Switches between Korean and English

**Step 4: Test theme switching**

Click: Theme toggle button (☀️/🌙)

Expected: Switches between light and dark mode

**Step 5: Commit**

```bash
git add .
git commit -m "feat: create home page with all sections (hero, services, projects, about)"
```

---

## Task 11: Create Projects Page

**Files:**
- Create: `app/[locale]/projects/page.tsx`

**Step 1: Create projects listing page**

Create: `app/[locale]/projects/page.tsx`

```typescript
import { useTranslations } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

**Step 2: Test projects page**

Visit: http://localhost:3000/ko/projects

Expected: Projects grid page with all 6 projects

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add dedicated projects page"
```

---

## Task 12: Create About Page

**Files:**
- Create: `app/[locale]/about/page.tsx`

**Step 1: Create about page**

Create: `app/[locale]/about/page.tsx`

```typescript
import { useTranslations } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-8 text-center">{t("title")}</h1>

          <div className="prose prose-lg mx-auto dark:prose-invert">
            <p className="text-2xl font-semibold text-primary mb-8 text-center">
              {t("vision")}
            </p>

            <p className="text-lg text-muted-foreground mb-6">
              {t("description")}
            </p>

            <div className="my-12 p-6 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Core Values</h3>
              <ul className="space-y-2">
                <li><strong>혁신:</strong> 최신 기술을 통해 새로운 가능성을 탐구합니다</li>
                <li><strong>품질:</strong> 모든 프로젝트에서 엄격한 품질 기준을 유지합니다</li>
                <li><strong>협업:</strong> 투명한 커뮤니케이션과 고객 중심 접근</li>
              </ul>
            </div>

            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-muted-foreground">
                프로젝트 문의: contact@soglab.com
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

**Step 2: Test about page**

Visit: http://localhost:3000/ko/about

Expected: About page with company info

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add about page with company information"
```

---

## Task 13: Configure for GitHub Pages (Static Export)

**Files:**
- Modify: `next.config.js`
- Create: `.github/workflows/deploy.yml`

**Step 1: Update Next.js config for static export**

Modify: `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

**Step 2: Create GitHub Actions workflow**

Create: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 3: Update package.json scripts**

Modify: `package.json` (scripts section)

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

**Step 4: Test static build**

Run:
```bash
npm run build
```

Expected: `out/` folder created with static HTML files

**Step 5: Commit**

```bash
git add .
git commit -m "feat: configure static export for GitHub Pages deployment"
```

---

## Task 14: Create Docker Configuration

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `docker.next.config.js`
- Create: `.dockerignore`

**Step 1: Create Dockerfile for production**

Create: `Dockerfile`

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Use Docker-specific config for production
COPY docker.next.config.js temp.config.js
RUN mv temp.config.js next.config.js

RUN npm run build

# Stage 3: Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Step 2: Create docker-compose for easy deployment**

Create: `docker-compose.yml`

```yaml
version: '3.8'

services:
  soglab-web:
    build: .
    container_name: soglab-website
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

**Step 3: Create Docker-specific Next.js config**

Create: `docker.next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

**Step 4: Create .dockerignore**

Create: `.dockerignore`

```
node_modules
.next
.git
.github
out
docs
*.md
.env
.env.local
```

**Step 5: Test Docker build (optional)**

Run:
```bash
docker build -t soglab-web .
```

Expected: Docker image builds successfully (takes a few minutes)

**Step 6: Commit**

```bash
git add .
git commit -m "feat: add Docker configuration for production deployment"
```

---

## Task 15: Create Documentation

**Files:**
- Create: `docs/setup.md`
- Create: `docs/deployment.md`
- Create: `docs/architecture.md`

**Step 1: Create setup guide**

Create: `docs/setup.md`

```markdown
# Soglab Website - Setup Guide

## Prerequisites

- Node.js 20+
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
```

**Step 2: Create deployment guide**

Create: `docs/deployment.md`

```markdown
# Deployment Guide

## GitHub Pages (Development)

Current configuration for GitHub Pages deployment.

1. **Push to main branch**
   ```bash
   git push origin main
   ```

2. **GitHub Actions automatically deploys**
   - Check Actions tab in GitHub for deployment status

3. **Access site**
   https://soglab.github.io/soglab-website/

## Docker (Production)

### Building the image

```bash
docker build -t soglab-web .
```

### Running with Docker

```bash
docker run -p 3000:3000 soglab-web
```

### Running with Docker Compose

```bash
docker-compose up -d
```

Access at: http://localhost:3000

### Switching between static and Docker builds

- **GitHub Pages:** Uses `next.config.js` with `output: 'export'`
- **Docker:** Uses `docker.next.config.js` with `output: 'standalone'`

Before Docker build:
```bash
cp docker.next.config.js next.config.js
```

Before GitHub Pages build:
```bash
cp github-pages.next.config.js next.config.js
```
```

**Step 3: Create architecture documentation**

Create: `docs/architecture.md`

```markdown
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
  └── language-toggle.tsx

lib/               # Utilities
  ├── i18n.ts     # i18n config
  ├── projects.ts # Project data
  └── utils.ts    # Helper functions

messages/          # Translations
  ├── ko.json     # Korean
  └── en.json     # English
```

## Key Features

### Internationalization
- URL-based locale routing (/ko, /en)
- Server-side translation with next-intl
- Language toggle with dropdown

### Theming
- System preference detection
- Manual dark/light toggle
- localStorage persistence
- Smooth transitions

### Performance
- Static site generation (GitHub Pages)
- Image optimization disabled for static export
- Minimal bundle size

## Deployment Targets

1. **Development:** GitHub Pages (static HTML)
2. **Production:** Docker container (standalone server)
```

**Step 4: Commit**

```bash
git add .
git commit -m "docs: add comprehensive documentation (setup, deployment, architecture)"
```

---

## Task 16: Final Testing and Polish

**Files:**
- Test: All pages and components
- Verify: Responsive design
- Check: Accessibility

**Step 1: Run final build test**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors or warnings

**Step 2: Test all pages locally**

Run:
```bash
npm run dev
```

Test checklist:
- [ ] Home page loads at http://localhost:3000/ko
- [ ] Projects page loads at http://localhost:3000/ko/projects
- [ ] About page loads at http://localhost:3000/ko/about
- [ ] Language toggle switches between ko/en
- [ ] Theme toggle switches light/dark
- [ ] All links work
- [ ] Responsive on mobile (use browser dev tools)

**Step 3: Test linter**

Run:
```bash
npm run lint
```

Expected: No linting errors (fix warnings if any)

**Step 4: Check accessibility**

Run: Manually test with keyboard navigation
- Tab through interactive elements
- Verify focus indicators are visible
- Check color contrast

**Step 5: Verify all Git commits**

Run:
```bash
git log --oneline
```

Expected: Clean commit history with descriptive messages

**Step 6: Final commit**

```bash
git add .
git commit -m "test: complete final testing and polish"
```

---

## Task 17: Create README

**Files:**
- Create: `README.md`

**Step 1: Create project README**

Create: `README.md`

```markdown
# Soglab Website

> Soglab company portfolio website showcasing software consulting, game development, and deep learning R&D projects.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- 🌍 **Multilingual**: Korean and English support
- 🌓 **Theme Switching**: Dark and light mode
- 📱 **Responsive**: Mobile-first design
- ⚡ **Fast**: Static site generation
- 🎨 **Minimal Design**: Clean and professional UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **i18n**: next-intl
- **Icons**: Lucide React

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### GitHub Pages
Push to `main` branch. GitHub Actions will automatically deploy.

### Docker
```bash
docker-compose up -d
```

See [docs/deployment.md](docs/deployment.md) for details.

## Documentation

- [Setup Guide](docs/setup.md)
- [Deployment Guide](docs/deployment.md)
- [Architecture](docs/architecture.md)
- [Design Document](docs/plans/2026-02-15-soglab-website-design.md)

## License

MIT © Soglab
```

**Step 2: Final commit**

```bash
git add README.md
git commit -m "docs: add comprehensive README"
```

---

## Task 18: Push to GitHub

**Files:**
- Remote: GitHub repository

**Step 1: Add GitHub remote**

Run:
```bash
git remote add origin <your-github-repo-url>
```

Replace `<your-github-repo-url>` with actual repository URL

**Step 2: Push to GitHub**

Run:
```bash
git push -u origin main
```

Expected: Code pushed to GitHub repository

**Step 3: Enable GitHub Pages**

1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. Save

**Step 4: Verify deployment**

1. Go to Actions tab in GitHub
2. Wait for "Deploy to GitHub Pages" workflow to complete
3. Visit deployed site URL

**Step 5: Tag release (optional)**

Run:
```bash
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0
```

**Step 6: Final celebration** 🎉

Website is live!

---

## Summary

This implementation plan creates a complete, production-ready portfolio website for Soglab with:

✅ Next.js 14 with TypeScript
✅ Minimal/clean design using shadcn/ui
✅ Korean/English language support
✅ Dark/light theme switching
✅ 6 placeholder projects
✅ Responsive design
✅ GitHub Pages deployment (development)
✅ Docker deployment (production)
✅ Comprehensive documentation

**Estimated completion time:** 2-3 hours for experienced developer

**Commit frequency:** 18 tasks = ~18 commits (atomic, descriptive commits)

**Testing strategy:** Build test, manual testing, linter, accessibility check
