# DESIGN.md

Design reference for the portfolio site. Any new page, section, or component must conform to these principles.

---

## 1. General Theme

Fully **dark mode** site (no light/dark toggle). Base background `#0a0a0a` (near-black). Primary accent is indigo (`#6366f1` / `indigo-500`).

---

## 2. Colors

### Base Palette

| Role                | Value                    | Tailwind Class                     |
| ------------------- | ------------------------ | ---------------------------------- |
| Page background     | `#0a0a0a`                | — (defined in global CSS)          |
| Card background     | `rgba(255,255,255,0.03)` | `bg-white/[0.03]`                  |
| Subtle border       | `rgba(255,255,255,0.05)` | `border-white/5`                   |
| Hover border        | `rgba(99,102,241,0.2)`   | `border-indigo-500/20`             |
| Primary accent      | `#6366f1`                | `bg-indigo-600`, `text-indigo-500` |
| Hover accent        | `#818cf8`                | `text-indigo-400`                  |
| Heading text        | `#ffffff` / `#f9fafb`    | `text-white` / `text-gray-50`      |
| Body text           | `#e5e5e5`                | `text-neutral-200`                 |
| Secondary text      | `#a3a3a3`                | `text-neutral-400`                 |
| Metadata text       | `#9ca3af`                | `text-gray-400`                    |
| Success / available | `#4ade80`                | `text-green-400`                   |

### Usage Rules

- **Borders** are always `border-white/5` at rest, `border-indigo-500/20` or `border-indigo-500/30` on hover.
- **Card backgrounds** are `bg-white/[0.03]` or transparent — never a strong opaque color.
- The **indigo accent** is reserved for primary actions, tags, section labels, and hover states.
- The **text gradient** (indigo → rose-red) is used only for featured elements (hero title, key highlight) via the `text-gradient` utility class.

---

## 3. Typography

**Single font: Inter** (Google Fonts, weights 300–800).

### Hierarchy

| Level           | Size                                       | Weight  | Color              |
| --------------- | ------------------------------------------ | ------- | ------------------ |
| H1 (hero)       | `text-4xl` → `sm:text-5xl` → `md:text-6xl` | 700     | `text-white`       |
| H2 (section)    | `text-3xl` → `text-4xl`                    | 700     | `text-white`       |
| H3 (subsection) | `text-2xl`                                 | 700     | `text-white`       |
| Section label   | `text-sm uppercase tracking-widest`        | 600     | `text-indigo-400`  |
| Body            | `text-base` / `text-lg`                    | 400–500 | `text-neutral-200` |
| Metadata        | `text-sm`                                  | 400     | `text-gray-400`    |
| Badge / tag     | `text-xs`                                  | 500–600 | `text-indigo-400`  |

### Rules

- Negative letter-spacing (`-tracking-tight` or `-0.025em`) on headings.
- Section labels (e.g. "EXPERIENCE", "SKILLS") are always **uppercase, small size, indigo-400**.
- Article body uses `leading-[1.75]` for good readability.

---

## 4. Spacing

| Usage                     | Value                                 |
| ------------------------- | ------------------------------------- |
| Section vertical padding  | `py-24` (96 px)                       |
| Global horizontal padding | `px-6` (24 px)                        |
| Section max-width         | `max-w-3xl` to `max-w-5xl` by density |
| Gap between cards         | `gap-6` or `gap-8`                    |
| Card inner padding        | `p-5` or `p-6`                        |
| Gap between inline items  | `gap-2` to `gap-4`                    |

---

## 5. Recurring Components

### Primary Button

```
bg-indigo-600 hover:bg-indigo-500 text-white
rounded-xl px-8 py-3.5 text-sm font-medium
inline-flex items-center gap-3 transition-colors
```

### Secondary / Ghost Button

```
border border-white/10 bg-white/5 hover:bg-white/10 text-white
rounded-xl px-8 py-3.5 text-sm font-medium
inline-flex items-center gap-3 transition-colors
```

### Card

```
rounded-xl border border-white/5 bg-white/[0.03]
hover:border-indigo-500/20 hover:bg-indigo-500/[0.03]
transition-colors p-5 (or p-6)
```

### Tag / Badge

```
rounded-full bg-indigo-500/10 text-indigo-400
text-xs font-medium px-3 py-1
```

### Icon + Text (button, link)

Always `inline-flex items-center gap-{2|3}`. The icon is an SVG `h-4 w-4` (or `h-3.5 w-3.5` for small badges).

---

## 6. Layout & Grid

- **Navigation**: fixed, `h-16`, `bg-black/60 backdrop-blur-xl border-b border-white/5`.
- **Sections**: centered with `mx-auto max-w-{3xl|4xl|5xl} px-6`.
- **Grids**:
  - 2 columns: `grid md:grid-cols-2 gap-{6|8|16}`
  - 4 columns: `grid md:grid-cols-4 gap-6`
  - Blog list: single column on mobile, flex-row with thumbnail on desktop.
- **Footer**: `border-t border-white/5 py-10`.

---

## 7. Hover Effects (Universal Pattern)

Apply consistently on cards and interactive links:

| Property   | Rest                | Hover                  |
| ---------- | ------------------- | ---------------------- |
| Border     | `border-white/5`    | `border-indigo-500/20` |
| Background | `bg-white/[0.03]`   | `bg-indigo-500/[0.03]` |
| Link text  | `text-gray-400`     | `text-indigo-400`      |
| Transition | `transition-colors` | —                      |

Micro-animations on icons are acceptable: `group-hover:-translate-x-1`, `group-hover:translate-x-0.5`, `group-hover:scale-125`.

---

## 8. Animations

- All color transitions: `transition-colors duration-300`.
- `animate-ping`: reserved for status indicators ("Available" badge).
- Smooth scroll: `scroll-behavior: smooth` (disabled via `prefers-reduced-motion`).
- Progress bar: gradient `from-indigo-500 to-violet-500`.
- **Respect `prefers-reduced-motion`** on all non-essential animations.

---

## 9. Responsive

Mobile-first. Breakpoints used:

| Breakpoint | Width    | Primary Usage                   |
| ---------- | -------- | ------------------------------- |
| _(base)_   | < 640 px | Mobile, single column           |
| `sm:`      | 640 px   | Larger typography               |
| `md:`      | 768 px   | Multi-column grids, desktop nav |
| `xl:`      | 1280 px  | Full blog layout                |

---

## 10. Accessibility

- Strict heading hierarchy: `h1` → `h2` → `h3`, never skipped.
- All icon-only buttons have an `aria-label`.
- Visible focus states: `outline-2 solid #818cf8 outline-offset-2px`.
- Alt text on all images (`alt`).
- Decorative elements: `aria-hidden="true"`.
- Skip link at the top of the page.
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.

---

## 11. What Not To Do

- Do not introduce a **light mode** or theme toggle.
- Do not use strong opaque colors for card backgrounds (keep transparency).
- Do not use any font other than Inter.
- Do not create buttons without a visible hover state.
- Do not omit `transition-colors` on interactive elements.
- Do not exceed `max-w-5xl` for main content.
- Do not use visible (solid color) borders at rest — always `white/5`.
