# Elyon Nest — How to share for approval

The repository contains the React source for the Elyon Nest website. To
generate a single shareable HTML file (everything inlined — works offline,
emailable, runs by double-click), run **one command**:

```bash
npm install
npm run build:single
```

This writes the single file to **`dist-single/index.html`** (~500 KB).

## What you can do with that file

- Email it to a stakeholder for approval
- Drop it in WhatsApp / Telegram / Slack
- Upload to Google Drive and share a link
- Open it directly in any browser (no server required)

## To get a hosted preview URL instead

Enable GitHub Pages on the repo:

1. **Settings → Pages**
2. **Source → GitHub Actions**

The included workflow then deploys automatically and your URL becomes:

> https://ssali-remy.github.io/ssali-remy.github/

Future commits redeploy automatically.
