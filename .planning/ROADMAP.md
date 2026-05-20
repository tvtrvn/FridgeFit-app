# Roadmap: FridgeFit

**Created:** 2026-05-19
**Granularity:** Coarse (one phase per remaining milestone)
**Structure:** Vertical MVP — each phase delivers an end-to-end user capability

> M1 (scaffold) and M2 (SQLite persistence) are already shipped. This roadmap covers M3–M8.

## Phase Overview

| # | Phase | Milestone | Goal | Requirements | Success Criteria | UI hint |
|---|-------|-----------|------|--------------|------------------|---------|
| 1 | Discover & Match | M3 | Turn the fridge into a ranked list of cookable recipes | MATCH-01, DISC-01–05 | 5 | yes |
| 2 | Recipe Detail | M4 | Show a full recipe with have-vs-need breakdown and actions | RDET-01–06 | 5 | yes |
| 3 | Favorites & Filters | M5 | Save recipes offline and filter results by diet/allergens | FAV-01–03, PREF-01–04 | 4 | yes |
| 4 | Onboarding & Polish | M6 | First-run flow and motion that make the app feel finished | ONB-01–02, POL-01–02 | 4 | yes |
| 5 | Planner & Nutrition | M7 | Plan meals across a week and show estimated nutrition | PLAN-01–03, HLTH-01, NUTR-01–02, RCNT-01 | 5 | yes |
| 6 | App Store Submission | M8 | Ship FridgeFit to the App Store / Play Store | SHIP-01–04 | 4 | no |

---

## Phase Details

### Phase 1: Discover & Match
**Goal:** A user with ingredients in their fridge sees a ranked list of recipes they can mostly or fully make right now, pulled live from TheMealDB.
**Mode:** mvp
**Requirements:** MATCH-01, DISC-01, DISC-02, DISC-03, DISC-04, DISC-05
**Success Criteria:**
1. With ingredients in the fridge, the Discover tab shows recipes ranked by match score (best match first)
2. Each card displays image, title, an "X of Y ingredients" badge, and diet tags
3. The diet filter bar narrows results to the selected diet(s)
4. Sorting toggles between best match and fewest missing
5. An empty fridge shows the "Add ingredients to start cooking" empty state

### Phase 2: Recipe Detail
**Goal:** Tapping a recipe opens a detail screen that makes it obvious what the user has, what they need to buy, and how to cook it.
**Mode:** mvp
**Requirements:** RDET-01, RDET-02, RDET-03, RDET-04, RDET-05, RDET-06
**Success Criteria:**
1. Tapping a card navigates to `recipe/[id]` and loads the recipe
2. Detail shows hero image, title, source attribution, and a "You have X of Y" summary
3. Ingredients are split into "In your fridge" and "You'll need to buy" sections
4. Step-by-step instructions and tags render
5. Save-to-favorites and add-to-plan actions are present and trigger the right state

### Phase 3: Favorites & Filters
**Goal:** Users can keep recipes they like (available offline) and set diet/allergen preferences that filter what they see everywhere.
**Mode:** mvp
**Requirements:** FAV-01, FAV-02, FAV-03, PREF-01, PREF-02, PREF-03, PREF-04
**Success Criteria:**
1. One tap saves/unsaves a recipe; the Favorites grid reflects it
2. Saved recipes open and display fully while offline
3. Settings lets the user multi-select diets and allergens (separately)
4. Diet/allergen preferences filter recipe results app-wide; Reset app data clears local state

### Phase 4: Onboarding & Polish
**Goal:** A first-time user is oriented in three screens, and the whole app feels finished through polished empty states and motion.
**Mode:** mvp
**Requirements:** ONB-01, ONB-02, POL-01, POL-02
**Success Criteria:**
1. On first launch, a skippable 3-screen onboarding appears (what it does, how matching works, choose diet)
2. Onboarding does not reappear on subsequent launches
3. Every tab's empty state is a polished, first-class screen
4. Key interactions have micro-animations via Reanimated

### Phase 5: Planner & Nutrition
**Goal:** Users can plan meals across a week, see curated healthy picks, and view estimated nutrition for recipes.
**Mode:** mvp
**Requirements:** PLAN-01, PLAN-02, PLAN-03, HLTH-01, NUTR-01, NUTR-02, RCNT-01
**Success Criteria:**
1. User can view a week calendar and assign/edit/remove a recipe on a date
2. User can quick-add to the plan from favorites
3. Discover shows a curated "healthy picks" row from a seed file
4. Recipe detail shows USDA-estimated calories per serving (labeled "Estimated") and caches the lookup
5. The add-ingredient flow surfaces recent ingredients as one-tap chips

### Phase 6: App Store Submission
**Goal:** FridgeFit is legally and visually ready and submitted to the stores via EAS.
**Requirements:** SHIP-01, SHIP-02, SHIP-03, SHIP-04
**Success Criteria:**
1. A privacy policy and disclaimer exist and are linked from Settings
2. App Store / Play Store screenshots are produced
3. The app builds successfully via EAS Build
4. The app is submitted via EAS Submit

---

## Dependencies

- Phase 2 depends on Phase 1 (detail consumes the matched recipe + fridge data).
- Phase 3 depends on Phase 2 (save/plan actions live on the detail screen; favorites reuse the recipe payload).
- Phase 5's planner reuses favorites from Phase 3; nutrition reuses the detail screen from Phase 2.
- Phase 6 depends on all feature phases being complete.

Phases are intended to run in order; within a phase, independent plans may run in parallel.

---
*Last updated: 2026-05-19 after initialization*
