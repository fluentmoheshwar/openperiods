# OpenPeriods Codebase Instructions

## Project Overview

**OpenPeriods** is a menstrual cycle tracking application built with **Svelte 5** and **Vite**, using **Tailwind CSS 4** for styling. The app enables users to log period details (start/end dates, flow intensity) with persistent storage via localStorage.

### Tech Stack

- **Frontend Framework**: Svelte 5 with runes (`$state`)
- **Build Tool**: Vite with rolldown
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`) with custom design tokens
- **Storage**: Browser localStorage (JSON serialization)
- **Package Manager**: bun

## Architecture

### Component Structure

The app follows a single-page modular component structure rooted in [src/App.svelte](src/App.svelte):

```
App.svelte (main orchestrator)
├── Header.svelte (nav + greeting)
├── LastPeriod.svelte (displays most recent period)
├── ExpectedPeriod.svelte (shows predicted next period)
└── AddNew.svelte (form to log new period)
└── Counter.svelte (demo component - can be removed)
```

**Data Flow**:

- `AddNew.svelte` persists data to localStorage via `JSON.parse/stringify` on form submission
- Display components (`LastPeriod`, `ExpectedPeriod`) read from localStorage (currently hardcoded placeholder data)
- No shared store yet—consider Svelte stores if cross-component state sharing grows

### Styling Architecture

[src/app.css](src/app.css) defines custom Tailwind design tokens in `@theme` block:

- **Colors**: `blush`, `lavender`, `peach`, `mint`, `rose` (pastel palette for health/wellness context)
- **Typography**: `Poppins` (sans), `Playfair Display` (serif)
- **Utilities**: `radius-xl` (1rem), `shadow-soft` (subtle shadow)

**Convention**: Use Tailwind classes with custom theme tokens. Example: `class="bg-lavender p-10 rounded-xl shadow-soft"` in [src/lib/LastPeriod.svelte](src/lib/LastPeriod.svelte).

## Development Workflow

### Local Development

```bash
bun dev      # Start dev server with HMR on http://localhost:5173
bun build    # Production build to dist/
bun preview  # Preview production build locally
```

### Code Organization Rules

1. **Components**: Place in `src/lib/` as `.svelte` files, import via `./lib/ComponentName.svelte`
2. **Runes Pattern**: Use Svelte 5 runes for state—`let count = $state(0)` (see [Counter.svelte](src/lib/Counter.svelte))
3. **Form Handling**: Use `on:submit|preventDefault` to bypass reload (see [AddNew.svelte](src/lib/AddNew.svelte#L22))
4. **Styling**: Inline Tailwind classes; no CSS modules needed at this scale

### HMR & State Preservation

HMR is enabled but **does not preserve local component state** (see README). If state persistence is needed across HMR cycles, use an external Svelte store (`import { writable } from 'svelte/store'`).

## Data Persistence Pattern

**Current Approach** (AddNew.svelte):

```javascript
const periods = JSON.parse(localStorage.getItem("periods")) || [];
periods.push(newPeriod);
localStorage.setItem("periods", JSON.stringify(periods));
```

**Notes**:

- Data shape: `{ startDate, endDate, flow }` (strings)
- No validation or date parsing (ISO date strings assumed)
- Display components read static data (update them to fetch from localStorage)

## Key Conventions

1. **Typography Hierarchy**: Use `text-4xl` (headers), `text-2xl` (section titles), `text-lg` (body)
2. **Spacing**: Use `p-*` (padding) and `m-*` (margin) consistently; `gap-*` for flex gaps
3. **Color Semantic**: `bg-lavender` for informational sections, `bg-rose` for accents, `bg-pink` for secondary data
4. **Component Exports**: All components are functional (no class-based patterns)
5. **Type Hints**: `AddNew.svelte` uses `lang="ts"` but lacks strict typing; consider adding `let startDate: string = ""` for clarity

## Common Tasks

- **Add a new period section**: Create component in `src/lib/`, compose in `App.svelte`, style with theme tokens
- **Fetch periods from storage**: Replace hardcoded data in `LastPeriod`/`ExpectedPeriod` with `onMount` + `localStorage.getItem("periods")`
- **Adjust colors**: Modify `--color-*` in `src/app.css` `@theme` block
- **Update build config**: Edit `vite.config.js` (plugins array controls Svelte + Tailwind + rolldown)

## Recommended Reading

- [Svelte 5 Runes Docs](https://svelte.dev/docs/svelte/runes)
- [Tailwind CSS 4 Migration](https://tailwindcss.com/docs/upgrading-to-v4) (key: `@theme` for tokens)
- Files to understand state flow: [AddNew.svelte](src/lib/AddNew.svelte), [App.svelte](src/App.svelte), [app.css](src/app.css)
