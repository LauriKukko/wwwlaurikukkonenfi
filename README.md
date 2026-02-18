# www.laurikukkonen.fi

Personal website with an IBM z/OS mainframe / ISPF / Tron-inspired aesthetic, built with React.

## Project Structure

```
src/
  components/       React components
  content/          JSON content files (edit these to change page text)
  hooks/            Custom React hooks (Instagram feed)
  styles/           CSS files
scripts/
  renew-instagram-token.js   Instagram token auto-renewal
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

## Install Dependencies

```bash
npm install
```

## Run Locally

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
```

Output goes to the `build/` folder.

## Editing Content

All page text is in JSON files under `src/content/`. Edit these without touching React code:

| File | Section |
|------|---------|
| `src/content/aboutme.json` | About Me |
| `src/content/it.json` | IT Career |
| `src/content/actor.json` | Actor |
| `src/content/photography.json` | Photography |

Each file has this structure:

```json
{
  "title": "PAGE TITLE",
  "subtitle": "Optional subtitle",
  "paragraphs": [
    "First paragraph text.",
    "Second paragraph text."
  ]
}
```

## Instagram Integration

The Photography page displays your latest Instagram photos.

### Setup

1. Go to [Facebook Developers](https://developers.facebook.com/) and create an app.
2. Add the **Instagram Basic Display** product (for Creator accounts).
3. Add your Instagram account as a test user and accept the invitation.
4. Generate a **User Token** from the Basic Display settings.
5. Exchange it for a long-lived token (valid 60 days):

```bash
curl -X GET "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=YOUR_APP_SECRET&access_token=YOUR_SHORT_LIVED_TOKEN"
```

6. Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```
REACT_APP_INSTAGRAM_ACCESS_TOKEN=your_long_lived_token_here
REACT_APP_INSTAGRAM_USER_ID=your_user_id_here
```

### Automatic Token Renewal

Long-lived tokens expire after 60 days. The renewal script refreshes them automatically.

**Run manually:**

```bash
npm run renew-instagram-token
```

**Schedule with cron (Linux/Mac) — every 50 days:**

```
0 0 */50 * * cd /path/to/project && node scripts/renew-instagram-token.js
```

**Schedule with Windows Task Scheduler:**

- Program: `node`
- Arguments: `scripts\renew-instagram-token.js`
- Start in: `C:\path\to\project`
- Trigger: every 50 days

**GitHub Actions (optional)** — create `.github/workflows/renew-token.yml`:

```yaml
name: Renew Instagram Token
on:
  schedule:
    - cron: '0 0 1 */2 *'  # Every 2 months on the 1st
  workflow_dispatch:

jobs:
  renew:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: |
          echo "REACT_APP_INSTAGRAM_ACCESS_TOKEN=${{ secrets.INSTAGRAM_TOKEN }}" > .env
          node scripts/renew-instagram-token.js
          # Read the new token from .env and update the GitHub secret
          NEW_TOKEN=$(grep REACT_APP_INSTAGRAM_ACCESS_TOKEN .env | cut -d= -f2)
          echo "::add-mask::$NEW_TOKEN"
          gh secret set INSTAGRAM_TOKEN --body "$NEW_TOKEN"
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Without a token configured, the site falls back to placeholder images automatically.

## Deploy to GitHub Pages

### 1. Initialize Git

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Create a GitHub Repository

Create a new repository on [github.com](https://github.com/new) (e.g., `laurikukkonen-fi`).

### 3. Connect and Push

```bash
git remote add origin https://github.com/YOUR_USERNAME/laurikukkonen-fi.git
git branch -M main
git push -u origin main
```

### 4. Configure Homepage

Edit `package.json` and set the `homepage` field:

```json
"homepage": "https://YOUR_USERNAME.github.io/laurikukkonen-fi"
```

If using a custom domain (`www.laurikukkonen.fi`), set:

```json
"homepage": "https://www.laurikukkonen.fi"
```

And create `public/CNAME` containing:

```
www.laurikukkonen.fi
```

### 5. Deploy

```bash
npm run deploy
```

This builds the project and pushes the `build/` output to the `gh-pages` branch.

### 6. Enable GitHub Pages

In your repository settings:

1. Go to **Settings > Pages**
2. Set Source to **Deploy from a branch**
3. Select the **gh-pages** branch, root folder
4. Save

### 7. Update the Site

After making changes:

```bash
git add .
git commit -m "Update content"
git push
npm run deploy
```

## Custom Domain Setup

To use `www.laurikukkonen.fi`:

1. Create `public/CNAME` with content: `www.laurikukkonen.fi`
2. In your domain registrar, add a CNAME record: `www` -> `YOUR_USERNAME.github.io`
3. In GitHub repo settings > Pages, enter `www.laurikukkonen.fi` as the custom domain
4. Enable "Enforce HTTPS"
