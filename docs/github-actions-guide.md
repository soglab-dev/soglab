# GitHub Actions Deployment Guide

이 문서는 `.github/workflows/deploy.yml` 파일의 구성 요소와 작동 방식을 설명합니다. 이 워크플로우는 Next.js 프로젝트를 빌드하고 GitHub Pages에 자동으로 배포하는 역할을 합니다.

## 파일 구조 설명

### 1. 이름 및 실행 조건 (Name & Triggers)
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:
```
- **`name`**: GitHub Actions 탭에 표시되는 워크플로우 이름입니다.
- **`on.push`**: `main` 브랜치에 코드가 푸시(업로드)될 때 자동으로 실행됩니다.
- **`on.workflow_dispatch`**: GitHub 웹사이트에서 'Run workflow' 버튼을 통해 수동으로 실행할 수 있게 합니다.

### 2. 권한 설정 (Permissions)
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```
- **`contents: read`**: 저장소의 코드를 읽을 권한 (빌드용).
- **`pages: write`**: GitHub Pages에 배포할 권한.
- **`id-token: write`**: OIDC 인증을 위한 권한 (보안).

### 3. 동시성 제어 (Concurrency)
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```
- 배포 작업이 동시에 여러 개 실행되어 충돌하는 것을 방지합니다.
- 이미 진행 중인 배포가 있다면 그것을 취소하지 않고 대기시킵니다.

### 4. 빌드 작업 (Build Job)
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```
- 우분투(Linux) 환경에서 실행됩니다.

#### 주요 단계 (Steps):
1.  **Checkout**: 코드를 내려받습니다.
2.  **Detect package manager**: `npm`, `yarn`, `pnpm` 중 어떤 것을 사용하는지 자동으로 감지합니다.
3.  **Setup Node**: Node.js 20 버전을 설치하고 캐싱을 설정합니다.
4.  **Setup Pages**: GitHub Pages 배포를 위한 기본 설정을 자동으로 구성합니다.
5.  **Restore cache**: 이전 빌드의 캐시를 복구하여 빌드 속도를 높입니다.
6.  **Install dependencies**: `npm ci`를 통해 의존성 패키지를 설치합니다.
7.  **Build with Next.js**: `next build`를 실행하여 정적 사이트를 생성합니다 (`./out` 폴더 생성).
8.  **Create .nojekyll file**: `./out` 폴더에 `.nojekyll` 파일을 생성합니다. 이는 GitHub Pages가 `_next`와 같은 언더스코어로 시작하는 폴더를 무시하지 않도록 합니다.
9.  **Upload artifact**: 빌드된 `./out` 폴더를 업로드하여 배포 단계로 넘깁니다.

### 5. 배포 작업 (Deploy Job)
```yaml
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
```
- **`needs: build`**: 빌드 작업이 성공해야만 실행됩니다.

#### 주요 단계 (Steps):
1.  **Deploy to GitHub Pages**: 업로드된 아티팩트를 실제 GitHub Pages 서버에 배포합니다.

## 트러블슈팅

### 404 오류가 발생하는 경우
- `.nojekyll` 파일이 `out` 폴더에 생성되었는지 확인하세요.
- `next.config.mjs`의 `output: 'export'` 설정이 올바른지 확인하세요.

### 빌드 오류가 발생하는 경우
- 로컬에서 `npm run build`가 성공하는지 확인하세요.
- `package-lock.json` 파일이 커밋되었는지 확인하세요.
