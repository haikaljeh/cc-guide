# CC Guide

Beginner-friendly static site teaching friends how to set up and use Claude Code on macOS.

## Stack
- Pure HTML/CSS/JS — no build tools, no framework
- Single `index.html` SPA with client-side page routing via JS
- Deployed to Vercel (auto-deploys on push to main)
- Live at: https://haikalops-cc-guide.vercel.app

## Structure
- `index.html` — all pages as `<div class="page" id="page-{name}">` containers
- `styles.css` — full design system (dark theme, gold accent `#d4a257`, Inter + JetBrains Mono)
- `script.js` — page routing, copy buttons, sidebar search, progress bar, history API

## Pages (in sidebar order)
Setup: Getting Started, VS Code, First Project
Beginner: Daily Basics, Memory
Leveling Up: Skills, Tips & Tricks
Advanced: Here Be Dragons

## Conventions
- Mac only — no Windows/Linux content
- Audience: complete beginners who don't know what a terminal is
- Tone: direct, personal ("tired of explaining to each one of you fools")
- Every command must have a copy button (SVG clipboard icon)
- Syntax highlighting uses manual span classes: token-cmd, token-arg, token-str, token-comment
- Avoid `&&` in commands — separate into individual code blocks with explanations
- Section numbers are sequential per page (01, 02, 03...)
- Use semantic card classes: .card.tip, .card.info, .card.warning, .card.success

## Testing
- Open `index.html` in browser — no build step
- Click every sidebar link — each page should show/hide with fade transition
- Copy buttons should copy and show "Copied!" tooltip
- Mobile: hamburger menu should toggle sidebar
