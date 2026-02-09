# CLAUDE.md — Juan Borjas Portfolio Site

## Goal
Turn the included `index.html` prototype into a live, deployed personal portfolio website. Ship fast — get it live first, refine later.

## Priority: Speed to Deploy
This is an MVP. Do not over-engineer. Do not add features not listed here. Get it live on a public URL as fast as possible.

## Tech Stack
- **Framework**: Next.js (App Router) — chosen for Vercel's zero-config deploy
- **Styling**: Tailwind CSS — match the visual design in `index.html` as closely as possible
- **Fonts**: DM Sans + Newsreader (Google Fonts)
- **Blog**: Markdown files in `/content/blog/` rendered with gray-matter + next-mdx-remote (or remark/rehype — your call, pick the simplest)
- **Hosting**: Vercel (free tier)
- **No database. No auth. No CMS. No analytics yet.**

## Reference File
`index.html` is the design prototype. It contains:
- The exact layout, typography, spacing, and color palette to replicate
- Real content (about bio, project descriptions, experience timeline, blog titles, contact section)
- Mobile responsive breakpoints to match

Use it as the source of truth for both design and copy. Do not invent new sections or redesign anything.

## Site Structure

```
/                   → Home (all sections from the prototype on one scrollable page)
/blog               → Blog index (list of posts)
/blog/[slug]        → Individual blog post (rendered from markdown)
/projects/[slug]    → Individual project page (for future use — just create the route and a simple template)
```

The homepage is the priority. Blog and project pages are secondary — basic templates are fine.

## Pages & Sections (Homepage)

Replicate these sections from `index.html` in this order:
1. **Nav** — fixed top, blur background, mobile hamburger menu
2. **Hero** — headline, subtitle, two CTA buttons (View Projects, Get in Touch)
3. **About** — two-column: bio text left, detail cards right
4. **Projects** — two-column grid of project cards with thumbnail, tags, description
5. **Blog** — list of posts pulled from markdown files in `/content/blog/`
6. **Experience** — timeline layout with date, title, company, description
7. **Contact** — text + email/LinkedIn/GitHub links
8. **Footer** — copyright line

## Blog System

Keep it dead simple:
- Blog posts are `.mdx` or `.md` files in `/content/blog/`
- Each file has frontmatter: `title`, `date`, `description`, `published` (boolean)
- Only posts with `published: true` show up on the site
- Create 1 placeholder post so the system works end-to-end
- Blog index page shows posts sorted by date descending
- Individual post pages render the markdown with basic typography styling

## Project Pages

- Create a `/projects/[slug]` route with a simple template
- For now, just show project title, description, tags, and a placeholder for "live demo coming soon"
- Project data can live in a simple JSON or TS file in `/content/projects/` — no database
- The homepage project cards should link to these pages

## Content to Use

All copy comes directly from `index.html`. The only things that need placeholder values:
- **Email**: use `hello@juanborjas.com` as placeholder
- **LinkedIn**: use `https://linkedin.com/in/juanborjas` as placeholder
- **GitHub**: use `https://github.com/juanborjas` as placeholder

I will replace these with real URLs before deploying.

## Design Rules

- **Match the prototype exactly.** Same colors, same fonts, same spacing, same hover effects.
- CSS variables from the prototype for reference:
  - `--fg: #1a1a1a` (primary text)
  - `--fg-secondary: #5a5a5a`
  - `--fg-tertiary: #8a8a8a`
  - `--bg: #fafaf8` (page background)
  - `--bg-card: #ffffff`
  - `--border: #e8e8e4`
  - `--accent: #2a5a3a` (green accent)
  - `--accent-light: #e8f0eb`
- Serif font (Newsreader) for headings, sans (DM Sans) for body
- Fade-in animation on hero section
- Subtle hover states on cards, blog items, nav links
- Mobile responsive with the same breakpoints as the prototype

## What NOT to Do

- Do not add a dark mode toggle
- Do not add animations beyond what's in the prototype
- Do not add a contact form — just email/social links
- Do not set up a CMS
- Do not add analytics, SEO meta tags, or OpenGraph (I'll add these later)
- Do not add loading spinners, skeleton screens, or page transitions
- Do not create a custom 404 page
- Do not add TypeScript strict mode config or linting setup

## Deployment Checklist

After building, prepare for Vercel deploy:
1. Ensure `next.config.js` is clean with no experimental flags
2. Ensure `npm run build` completes with zero errors
3. Confirm all routes work: `/`, `/blog`, `/blog/[slug]`, `/projects/[slug]`
4. Confirm mobile nav toggle works
5. Confirm smooth scroll works for anchor links on homepage

## File Structure Expected

```
/
├── CLAUDE.md
├── index.html              ← design prototype (reference only, not deployed)
├── package.json
├── next.config.js
├── tailwind.config.js
├── public/
├── content/
│   ├── blog/
│   │   └── placeholder-post.mdx
│   └── projects/
│       └── projects.json   (or .ts)
├── app/
│   ├── layout.tsx
│   ├── page.tsx            ← homepage with all sections
│   ├── blog/
│   │   ├── page.tsx        ← blog index
│   │   └── [slug]/
│   │       └── page.tsx    ← individual post
│   └── projects/
│       └── [slug]/
│           └── page.tsx    ← individual project
└── components/
    ├── Nav.tsx
    ├── Hero.tsx
    ├── About.tsx
    ├── Projects.tsx
    ├── Blog.tsx
    ├── Experience.tsx
    ├── Contact.tsx
    └── Footer.tsx
```

## Summary

Build it. Make it match the prototype. Make it deploy. That's it.
