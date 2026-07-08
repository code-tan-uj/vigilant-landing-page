# CrowdSense™ Product Design Language

**Scope:** the authenticated dashboard product (cameras, alerts, compliance reports, team/settings) — not the marketing site, though it inherits and extends that brand.

---

## 1. The core tension this system has to resolve

The marketing site is deliberately monochrome — black, white, three greys, no color accents. That restraint is *why* it reads premium. But the product is a **safety-monitoring dashboard**: a PPE violation, an active fire alert, and a healthy compliance score are fundamentally different states that a plant manager needs to distinguish at a glance, often on a wall-mounted screen from six feet away, sometimes at 2 AM.

Pure monochrome fails a monitoring product. The design language below keeps the marketing site's restraint as the *base* (structure, typography, spacing, chrome) and treats color as a **reserved signal channel** — used only for status, never for decoration. If a customer sees red anywhere in this product, it should mean something is wrong. That's the whole principle driving every decision below.

---

## 2. Foundation (inherited from vigilantlabs.in, unchanged)

| Token | Value | Use |
|---|---|---|
| `--font-display` | Bebas Neue | Page titles, big numbers, camera names in fullscreen view |
| `--font-body` | DM Sans | All UI copy, table cells, form labels |
| `--font-mono` | DM Mono | Timestamps, camera IDs, coordinates, log entries, anything that benefits from tabular alignment |
| `--black` | `#080808` | App background |
| `--dark` | `#0f0f0f` | Panel/card background |
| `--panel` | `#161616` | Nested panel, table header row |
| `--card` | `#1d1d1d` | Elevated card (modals, popovers) |
| `--border` | `#2a2a2a` | All hairline borders |
| `--white` / `--light` / `--silver` | `#f5f5f5` / `#d4d4d4` / `#a8a8a8` | Text hierarchy, brightest to dimmest |

Keep the liquid-glass nav treatment for the product's top bar too — it's a strong, distinctive signature and the SDF-based version is cheap enough to reuse verbatim.

---

## 3. Status color system (new — this is the product's real design work)

Five states, each with a fixed meaning. Never reuse these hues for anything decorative.

| State | Color | Hex | When it fires |
|---|---|---|---|
| **Critical** | Red | `#e5484d` | Fire/smoke detected, restricted-zone breach, camera offline during active monitoring |
| **Warning** | Amber | `#f5a524` | PPE violation, SOP deviation, degraded camera feed |
| **Compliant / Healthy** | Green | `#4cc38a` | All clear, compliance score above threshold, camera online |
| **Info** | Blue | `#5b9df5` | System notices, deployment status, non-urgent updates |
| **Neutral** | Silver (`--silver`) | `#a8a8a8` | Resolved/archived items, disabled states |

**Rules:**
- Status color always pairs with an icon or text label, never color alone (accessibility — colorblind users are a real population in a safety product).
- Status colors appear as: a 3px left border on alert cards, a filled dot in tables/lists, and the accent stroke on charts. They do **not** fill entire backgrounds or buttons — that would compete with the monochrome chrome and make the UI feel like a Christmas tree at scale (a customer with 50 cameras will have dozens of these on screen at once).
- Critical alerts get one additional treatment: a slow (2s) opacity pulse on the status dot only, so an active fire alert is distinguishable from a *resolved* critical alert in a dense list without needing to read text.

---

## 4. Layout shell

Unlike the marketing site's single-column scroll, the product is a persistent-shell app:

```
┌─────────────────────────────────────────────────────┐
│  Liquid-glass top bar: logo · site selector · alerts │
│  bell (badge count) · user menu                      │
├──────────┬──────────────────────────────────────────┤
│          │                                           │
│ Sidebar  │  Main content area                        │
│ (icons + │  (scrolls independently of sidebar/nav)   │
│  labels, │                                            │
│  collap- │                                            │
│  sible)  │                                           │
│          │                                           │
└──────────┴──────────────────────────────────────────┘
```

- **Sidebar sections:** Overview · Live Feeds · Alerts · Compliance Reports · Cameras & Sites · Team · Settings
- Sidebar uses `--font-mono` uppercase labels at 11px, matching the marketing site's nav-link treatment, with the active item getting a 2px left accent bar in `--white` (not a status color — navigation state and alert state must never share a visual language, or users will misread "which page am I on" as "is something wrong").
- Content area max-width is **not** constrained like the marketing site (that was for readability of prose; dashboards want to use available width for tables/grids). Cap at `1600px` on ultra-wide monitors only.

---

## 5. Core components

### Alert card
The single most important component — this is what a plant manager stares at all day.

```
┌────────────────────────────────────────┐
│ ┃ 🔥 Fire detected                       │  <- 3px status border (critical)
│ ┃ Line 3, Camera 07 · 2 min ago          │
│ ┃ [View clip]  [Acknowledge]  [Escalate] │
└────────────────────────────────────────┘
```
- Timestamp always in `--font-mono`, always relative ("2 min ago") with absolute time on hover (tooltip) — never make someone do timezone math during an incident.
- Actions are always visible, never hidden behind a hover state or overflow menu — this is a safety product, not a marketing card; discoverability of "what can I do about this" matters more than visual cleanliness here.

### Compliance score
Big number treatment, borrowing directly from the marketing site's `.num-val` (Bebas Neue, huge, tabular). A single score (e.g. "94%") should look and feel exactly like the "10 Days," "40 Sec," etc. numbers on the homepage — this is the through-line that makes the product feel like it belongs to the same company.

- Score ≥ 90%: rendered in `--white` with a small green dot, not full green text (a 94% shouldn't scream "success," it should read as the default healthy state).
- Score < threshold (configurable per customer, default 75%): rendered in amber, with the dot switching to amber/red accordingly.

### Camera feed tile
- 16:9, `--border` hairline, status dot top-right corner (small, persistent, always visible even when not hovering).
- Hover reveals a thin `--panel` scrim at the bottom with camera name + a "view live" affordance — mirrors the `.uc-item` hover pattern from the marketing site (padding-left shift on hover) for interaction-language consistency.
- Offline cameras: full desaturation (grayscale filter) + centered "Offline since [time]" — never just a blank/broken tile.

### Data tables (compliance logs, camera lists, team members)
- `--font-mono` for any numeric/ID/timestamp column, `--font-body` for names/descriptions — same principle as the marketing site's use of mono for eyebrows/labels vs. DM Sans for prose.
- Row hover: `--panel` background, matching `.cap-card:hover` from the marketing site.
- Zebra striping: **no** — a hairline `--border` bottom on every row is enough; zebra striping fights with the status-dot color system by adding a second layer of visual noise.

### Buttons
- Primary action: solid `--white` on `--black`, exactly like `.btn-primary` on the marketing site (same font, same hover-to-silver, same 2px lift). One primary button per view, always.
- Destructive action (delete camera, remove team member): same shape, but `--white` text on a `1px solid` critical-red border, background transparent until hover (fills red). Never a solid red button at rest — reserve full-saturation red for *alerts*, not routine UI chrome, so a "Delete" button doesn't visually compete with "your factory is on fire."
- Secondary/ghost: transparent, `--border` outline, exactly like the marketing site's nav-cta default state.

---

## 6. Motion

Reuse the marketing site's `prefers-reduced-motion` discipline exactly — this is a dashboard people may have open for 8-hour shifts; gratuitous motion is fatigue, not delight, in this context specifically (unlike a marketing site where a little flourish helps conversion).

- Alert cards: enter with the same `fadeUp` used in `.reveal` (fast, 300ms, no bounce) — new alerts should feel *noticed*, not *animated*.
- Status dot pulse (critical only): the one deliberate exception, because it needs to draw the eye. Everything else stays still.
- No skeleton-loading shimmer animations — use static `--panel`-colored placeholder blocks instead. Shimmer reads as "trust me, it's loading" marketing flourish; a static placeholder reads as "the system is calm," which matters more here.

---

## 7. Accessibility notes specific to this product

- This system will run in control rooms with wall-mounted 4K displays viewed from a distance, **and** on a supervisor's phone during a plant walk. Every status color pair (text+background, or dot+card background) must hit **4.5:1 minimum**, tested against `--dark` and `--panel` specifically (the two backgrounds status elements actually sit on) — the marketing site's earlier contrast bug (`--muted`/`--dim` failing WCAG AA) is exactly the kind of thing to catch *before* shipping here, not after a Lighthouse run.
- Never rely on the critical-pulse animation alone to signal urgency — always pair with persistent text ("ACTIVE") so a user glancing at a paused/frozen screen share (common in incident review) still gets the signal.

---

## 8. What this deliberately does *not* copy from the marketing site

- The custom cursor (`#cursor` / `#cursor-ring`) — charming on a marketing page, actively harmful in a data-dense dashboard where users need standard cursor affordances (resize handles, text selection, table sorting).
- The noise/grain overlay — invisible on a hero image, but a fixed `position:fixed` full-viewport overlay repainting behind live video tiles is a real performance cost this product can't afford at 50+ camera tiles on screen.
- Scroll-triggered `.reveal` animations — appropriate for a one-time marketing scroll, wrong for a dashboard where content is constantly re-rendering (new alerts, live tiles) and re-triggering fade-ins on every data refresh would be distracting and slow.

---
