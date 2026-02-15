# Soglab Website Design Document

**Date:** 2026-02-15
**Status:** Approved
**Designer:** Claude + User Collaboration

---

## Overview

Soglab 회사 포트폴리오/프로젝트 쇼케이스 홈페이지로, 회사 소개와 브랜딩을 포함한 미니멀/클린한 디자인의 React 기반 웹사이트입니다. 1인 회사임을 강조하지 않고 전문적인 이미지를 전달하는 것을 목표로 합니다.

---

## Technology Stack

### Core Framework
- **Next.js 14** (App Router) - SEO 친화적, 서버 컴포넌트 지원
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 스타일링

### UI Components
- **shadcn/ui** - 미니멀/클린한 컴포넌트 라이브러리 (복사-붙여넣기 방식)
  - Button, Card, Navigation Menu 등

### Internationalization & Theming
- **next-intl** - 다국어 지원 (한국어/영어)
- **next-themes** - 다크/라이트 테마 스위칭

### Typography
- **Noto Sans KR** (Google Fonts) - 한국어 중심 폰트
- **JetBrains Mono** - 코드/기술 스택 태그용 (선택)

---

## Project Structure

```
soglab-website/
├── app/                      # Next.js App Router
│   ├── [locale]/            # i18n 라우팅 (ko, en)
│   │   ├── layout.tsx       # 레이아웃 (테마 프로바이더)
│   │   ├── page.tsx         # 메인 페이지
│   │   ├── projects/        # 프로젝트 섹션
│   │   ├── about/           # 회사 소개
│   │   └── contact/         # 연락처
│   └── globals.css
├── components/              # React 컴포넌트
│   ├── ui/                 # shadcn/ui 컴포넌트
│   ├── theme-toggle.tsx    # 다크/라이트 스위치
│   ├── language-toggle.tsx # 한/영 스위치
│   └── project-card.tsx    # 프로젝트 카드
├── docs/                    # 📚 문서화
│   ├── setup.md            # 프로젝트 설정 방법
│   ├── deployment.md       # 배포 가이드
│   ├── architecture.md     # 아키텍처 설명
│   └── contributing.md     # 기여 가이드
├── lib/                    # 유틸리티
│   ├── i18n.ts            # 다국어 설정
│   └── utils.ts           # shadcn 유틸
├── messages/              # 번역 파일
│   ├── ko.json
│   └── en.json
├── public/               # 정적 에셋
├── Dockerfile           # Docker 설정 (최종 배포용)
└── next.config.js       # Next.js 설정
```

---

## Page Layout

### Header (Fixed)
- Logo: "Soglab"
- Navigation: Home, Projects, About
- Language Toggle (🌐)
- Theme Toggle (☀️/🌙)
- Responsive mobile menu

### Hero Section
- Headline: "AI, Games, Software의 교차점에서 혁신을 만듭니다" (KR) / "Innovating at the Intersection of AI, Games & Software" (EN)
- Subtitle: 짧은 회사 소개
- CTA Button: "View Projects" / "프로젝트 보기"

### Services Section
간단한 3개 서비스 소개:
- Software Development
- Game Development
- Deep Learning R&D

### Projects Portfolio (카드형)
- 그리드 레이아웃 (responsive: 1-3 columns)
- 각 카드: 썸네일, 제목, 설명, 기술 스택 태그, "더보기" 버튼
- Hover 효과 (subtle shadow, scale)

### About Section
- 회사 비전, 미션
- 짧은 소개 텍스트

### Footer
- Copyright
- Social links (GitHub, LinkedIn)
- Contact info

---

## Design System

### Color Palette (미니멀/클린)

**Light Mode:**
- Primary: `#0f172a` (Slate 900) - 짙은 회색
- Secondary: `#64748b` (Slate 500) - 중간 회색
- Accent: `#3b82f6` (Blue 500) - 블루 악센트
- Background: `#ffffff` - 흰색
- Foreground: `#0f172a` - 짙은 회색 텍스트

**Dark Mode:**
- Primary: `#f8fafc` (Slate 50) - 밝은 회색
- Secondary: `#94a3b8` (Slate 400) - 중간 회색
- Accent: `#60a5fa` (Blue 400) - 밝은 블루
- Background: `#0f172a` - 짙은 회색 배경
- Foreground: `#f8fafc` - 밝은 회색 텍스트

### Typography
- **본문:** Noto Sans KR (16px base)
- **제목:** 크기 단계별 증가 (h1-h6)
- **코드/태그:** JetBrains Mono (선택)

### Style Principles
- 여백 넉넉하게: Section padding 4-6rem
- 미세한 그림자: `shadow-sm`
- 부드러운 트랜지션: `transition-all duration-200`
- 둥근 모서리: `rounded-lg` (8px)
- 그리드 레이아웃: Grid gap-6

---

## Internationalization (i18n)

### URL Structure
- `/ko` - 한국어 (기본)
- `/en` - 영어
- `/ko/projects` - 한국어 프로젝트
- `/en/projects` - 영어 프로젝트

### Implementation
- URL 경로로 언어 구분
- Language toggle 클릭 시 해당 언어 URL로 리다이렉트
- localStorage에 선택된 언어 저장
- 모든 텍스트는 `messages/ko.json`, `messages/en.json`에서 관리

---

## Theme Switching

### Behavior
- 시스템 테마 자동 감지 (기본)
- 헤더 토글 버튼으로 수동 전환
- localStorage에 저장
- 부드러운 전환 애니메이션

### Mode Differences
- **Light:** 밝은 배경, 어두운 텍스트
- **Dark:** 어두운 배경, 밝은 텍스트

---

## Placeholder Content

### Initial Projects (6개)
1. **AI 기반 챗봇 시스템** - LLM 기반 고객 지원 챗봇
2. **실시간 멀티플레이어 게임** - WebSocket 기반 게임 서버
3. **컴퓨터 비전 분석 도구** - 이미지 처리 및 분석
4. **클라우드 관리 대시보드** - 인프라 모니터링 시스템
5. **게임 AI 엔진** - NPC 행동 시스템
6. **자연어 처리 파이프라인** - 텍스트 분석 플랫폼

각 프로젝트:
- Placeholder 이미지: `https://placehold.co/600x400`
- 짧은 설명 (2-3문장)
- 기술 스택 태그
- "Coming Soon" 또는 "View Details" 버튼

---

## Deployment Strategy

### Phase 1: GitHub Pages (개발 중)
```javascript
// next.config.js
module.exports = {
  output: 'export',           // 정적 HTML로 빌드
  images: {
    unoptimized: true,
  },
  basePath: '/soglab',        // 레포지토리 이름
}
```
- 정적 파일로 빌드 (`out/` 폴더)
- GitHub Actions로 자동 배포
- Docker 사용 안 함

### Phase 2: Docker (최종 자체 서버)
```dockerfile
# Multi-stage build, Alpine 기반
# 최종 이미지 크기: ~200MB
# 포트 3000
```

```javascript
// next.config.js
module.exports = {
  output: 'standalone',       // 독립 실행 가능한 서버
}
```

- Docker 컨테이너로 Next.js 서버 실행
- `docker-compose up`로 간단 배포
- 환경변수로 설정 관리

---

## Setup Commands

```bash
# 1. Next.js 프로젝트 생성
npx create-next-app@latest soglab-website --typescript --tailwind --app

# 2. shadcn/ui 초기화
npx shadcn-ui@latest init

# 3. 필요한 컴포넌트 추가
npx shadcn-ui@latest add button card navigation-menu

# 4. 의존성 설치
npm install next-intl next-themes lucide-react
```

---

## Design Principles

1. **미니멀/클린** - 여백과 간결함 중시
2. **전문적** - 1인 회사임을 강조하지 않음
3. **반응형** - 모바일/태블릿/데스크톱 지원
4. **접근성** - 키보드 네비게이션, 색상 대비
5. **성능** - 빠른 로딩, 최적화된 번들

---

## Next Steps

1. Create implementation plan using `superpowers:writing-plans` skill
2. Implement core structure (Next.js + shadcn/ui)
3. Add i18n and theme support
4. Create placeholder content
5. Test locally
6. Deploy to GitHub Pages (Phase 1)
7. Prepare Docker configuration (Phase 2)

---

**Approval:** ✅ Approved by user on 2026-02-15
