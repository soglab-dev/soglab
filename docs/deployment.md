# Deployment Guide

## GitHub Pages (Development)

Current configuration for GitHub Pages deployment.

### Setup

1. **Push to main branch**
   ```bash
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Save

3. **GitHub Actions automatically deploys**
   - Check Actions tab in GitHub for deployment status
   - Workflow: `.github/workflows/deploy.yml`

4. **Access site**
   https://<username>.github.io/<repository>/

### Configuration Files

- `next.config.mjs` - Configured with `output: 'export'` for static generation
- Images are unoptimized (`unoptimized: true`) for static hosting compatibility

### Updating Content

1. Make changes locally
2. Test: `npm run build`
3. Commit and push to main branch
4. GitHub Actions auto-deploys

## Docker (Production)

### Building the image

```bash
docker build -t soglab-web .
```

**Note:** The Dockerfile uses `docker.next.config.mjs` which switches config to `output: 'standalone'`

### Running with Docker

```bash
docker run -p 3000:3000 soglab-web
```

### Running with Docker Compose

```bash
docker-compose up -d
```

Access at: http://localhost:3000

### Environment Variables

- `NODE_ENV` - Set to `production` automatically
- `PORT` - Default: 3000

### Stopping the container

```bash
docker-compose down
```

## Switching Between Static and Docker Builds

The project has two Next.js configurations:

### GitHub Pages (Static)
- Uses `next.config.mjs`
- `output: 'export'`
- Generates static HTML in `out/` folder

### Docker (Standalone Server)
- Uses `docker.next.config.mjs`
- `output: 'standalone'`
- Runs Node.js server

When building with Docker, the Dockerfile automatically swaps the config file.

### Manual Config Swap

If needed to manually switch:

**For GitHub Pages:**
```bash
cp next.config.mjs temp.config.mjs
# Edit temp.config.mjs to have output: 'export'
```

**For Docker:**
```bash
cp docker.next.config.mjs next.config.mjs
```

## Troubleshooting

### GitHub Pages Deployment Issues

1. Check GitHub Actions logs
2. Ensure `next.config.mjs` has `output: 'export'`
3. Verify `.github/workflows/deploy.yml` exists
4. Check Pages settings are set to "GitHub Actions"

### Docker Build Issues

1. Ensure Dockerfile has proper config swap
2. Check `docker.next.config.mjs` exists
3. Verify port 3000 is not already in use

### Middleware Issues

The site uses `middleware.ts` for i18n routing. This works with both:
- Static export (GitHub Pages)
- Standalone server (Docker)

If seeing middleware errors, ensure `next-intl/plugin` is properly configured in `next.config.mjs`.
