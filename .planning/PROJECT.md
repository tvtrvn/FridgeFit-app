# FridgeFit

## What This Is

FridgeFit is a local-first iOS + Android app (Expo, React Native, TypeScript) that turns whatever is already in your fridge into recipes you can cook tonight — and tells you exactly what you'd need to buy to unlock more. Most recipe apps assume you start with a recipe; FridgeFit flips that: start with your fridge, end with dinner. It is a solo learning project aimed at the App Store.

## Core Value

A user can go from "I have eggs, spinach, and feta" to a ranked list of cookable recipes in under 15 seconds — offline, with no account.

## Requirements

### Validated

<!-- Shipped and confirmed working in the codebase (M1 + M2). -->

- ✓ App scaffold: Expo Router file-based navigation, 5 bottom tabs + dynamic `recipe/[id]` route — M1
- ✓ Design system primitives: Screen, Text, Button, Card, Chip, Input, EmptyState — M1
- ✓ Light-only theme tokens (colors, spacing, radii, shadows, type) — M1
- ✓ Fridge tab: add/remove ingredients as chips with a single text input — M1
- ✓ Ingredient name normalization (`lib/normalize.ts`) — M1
- ✓ SQLite persistence: `ingredients` table, repo layer, single-connection client with migrations — M2
- ✓ Zustand ingredients store with write-through to SQLite and rollback on failure — M2
- ✓ One-shot hydration of ingredients from SQLite on app start — M2

### Active

<!-- Hypotheses until shipped and validated. Mapped to roadmap phases M3–M8. -->

- [ ] M3 — Pull recipes from TheMealDB and rank by ingredient match; Discover tab with diet filter bar and sort
- [ ] M4 — Recipe detail screen (`recipe/[id]`): have-vs-need breakdown, steps, tags, save/plan actions
- [ ] M5 — Favorites (save/unsave, offline) + diet/allergen filters wired through Settings
- [ ] M6 — First-run onboarding, polished empty states, motion (Reanimated)
- [ ] M7 — Meal planner (calendar week), healthy picks, USDA nutrition estimates
- [ ] M8 — App Store submission: privacy policy, screenshots, EAS Build + Submit

### Out of Scope

<!-- Explicit boundaries from the PRD. -->

- User accounts / login — local-first; no backend in v1
- Cloud sync — architectural seams left for v1.1, not built now
- Push notifications — out of scope for v1
- Photo / barcode ingredient recognition — too costly; manual entry is the v1 path
- Grocery list export — deferred
- Social features / sharing — not core to the fridge-to-dinner value
- In-app purchases — not monetizing v1

## Context

- **Brownfield.** M1 (scaffold/design system/navigation/Fridge UI) and M2 (SQLite persistence) are already built and working. This GSD setup plans the remaining milestones M3–M8.
- **Local-first.** All user data lives in `expo-sqlite` on the device; nothing leaves the phone. The only external calls are read-only metadata pulls from free public APIs (TheMealDB for recipes, USDA FoodData Central for nutrition).
- **State pattern.** Zustand store is the in-memory single source of truth; mutations write through to a SQLite repo asynchronously and roll back the in-memory snapshot if a write fails.
- **Managed Expo workflow.** No committed `ios/`/`android/` dirs — native projects are generated at build time. Only API key ever needed is USDA FoodData Central (free), stored in `.env.local` for M7.
- **Docs already exist:** `README.md` (pitch + roadmap), `docs/PRD.md` (full spec, user stories, matching algorithm), `walkthrough.md` (complete code walkthrough), `docs/SETUP.md`.
- **Reserved-but-unused deps** signal future intent: `react-hook-form` + `zod` (M4 detail / onboarding forms), `react-native-reanimated` + worklets (M6 motion), `types/recipe.ts` and `types/preferences.ts` (M3/M5).

## Constraints

- **Tech stack**: Locked — Expo SDK 54 (managed), React Native 0.81 / React 19, TypeScript, Expo Router 6, Zustand 5, expo-sqlite 16. Don't introduce a navigation lib, state lib, or DB beyond these.
- **Theme**: Light-only. No dark mode in this scope.
- **Bundle identifier**: `com.thinhvu.fridgefit`.
- **Recipe data**: TheMealDB (free, no key). **Nutrition**: USDA FoodData Central (free, requires API key in `.env.local`).
- **Offline**: App must remain usable offline once recipes are cached (favorites + saved recipe payloads).
- **Privacy**: No user data leaves the device. Nutrition figures are always labeled estimates, not medical advice.
- **Builds**: EAS Build + EAS Submit (managed cloud builds) for App Store / Play Store.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| One GSD phase per remaining milestone (coarse granularity) | Matches the existing 8-milestone mental model in README/PRD; keeps tracking simple for a solo dev | — Pending |
| Generate roadmap inline (skip research subagents) | Brownfield with thorough existing docs (PRD, walkthrough); domain is well understood | — Pending |
| Install full GSD agent set project-locally (not global) | User wants planning/verify agents available for this project without affecting other projects | — Pending |
| Local-first, no backend | Privacy, offline-first UX, simpler v1, learning focus | — Pending |
| TheMealDB for recipes | Free, no API key, good-enough metadata for match-by-ingredient | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-19 after initialization*
