## Browser Automation

Use `agent-browser` for web automation. Run `agent-browser --help` for all commands.

### Installation (If missing)
If `agent-browser` or `playwright` commands are not found, install them using **Node.js v20+**:

```bash
# 1. Install nvm (if needed) & use Node v20
nvm use 20

# 2. Install agent-browser (Global)
npm install -g agent-browser
agent-browser install

# 3. Install Playwright Test Runner (Local Dev Dependency)
# Required if you want to run tests (npx playwright test)
npm install -D @playwright/test
```

Core workflow:
1. `agent-browser open <url>` - Navigate to page
2. `agent-browser snapshot -i` - Get interactive elements with refs (@e1, @e2)
3. `agent-browser click @e1` / `fill @e2 "text"` - Interact using refs
4. Re-snapshot after page changes

### Using Google Chrome (For Agents)

Use the installed Google Chrome browser when `agent-browser` is insufficient (e.g., specific rendering issues, media codec support, or when explicitly requested).

- **Launch Command**:
  Execute this command to assume control of a full Chrome instance:
  ```bash
  google-chrome --no-sandbox <URL>
  ```
  *Note: Add `--user-data-dir=/tmp/chrome-user-data` if a clean profile is needed.*

- **Running Tests with Chrome**:
  If a user asks to run tests specifically against Google Chrome:
  ```bash
  npx playwright test --project=Google\ Chrome
  ```

## CI/CD & Local Development Consistency

To ensure that the code works identically in both local and GitHub Actions environments without errors, follow these guidelines:

### 1. Node.js Version Management
- **Requirement**: Use **Node.js v20 (LTS)** or higher.
- **Local Setup**:
  - Use `nvm` (Node Version Manager) instead of system-installed Node.
  - Set default version: `nvm alias default 20`
  - Activate version: `nvm use 20`
- **GitHub Actions**:
  - Ensure the workflow uses `setup-node` with `node-version: 20`.

### 2. Package Management
- **Do NOT use `sudo`** for `npm install`. This reverts to the system Node version and causes permission/version errors.
- **Local Installation**:
  - Use `npm install` for adding dependencies.
  - Dependencies like `agent-browser` or `playwright` should be installed in the current Node environment (via nvm).
- **CI Installation**:
  - Use `npm ci` in GitHub Actions. This installs strict versions from `package-lock.json`, ensuring consistency.

### 3. Verification Before Push
Before pushing to GitHub, always run these commands locally to catch errors early:

```bash
# 1. Check for linting errors (identifies typos, unused variables, etc.)
npm run lint

# 2. Verify build (checks for type errors and build failures)
npm run build
```

### 4. Playwright & Browser Tools
- **Installation**:
  - Install dependencies locally: `npm install -D @playwright/test`
  - Install browser binaries: `npx playwright install`
- **CI Configuration**:
  - If running tests in CI, ensure the workflow includes `npx playwright install --with-deps` to cache and setup browsers.