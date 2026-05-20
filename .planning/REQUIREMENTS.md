# Requirements: FridgeFit

**Defined:** 2026-05-19
**Core Value:** A user can go from a few fridge ingredients to a ranked list of cookable recipes in under 15 seconds — offline, no account.

> Scope note: M1 (scaffold/design system/Fridge UI) and M2 (SQLite persistence) are already shipped — see PROJECT.md ## Validated. The requirements below cover the remaining milestones **M3–M8**.

## v1 Requirements

### Matching (M3)

- [ ] **MATCH-01**: System normalizes ingredient names and computes a match score per recipe (have vs. required), used to rank results

### Discover (M3)

- [ ] **DISC-01**: User sees a list of recipes from TheMealDB ranked by match score against their current fridge
- [ ] **DISC-02**: Each recipe card shows image, title, an "X of Y ingredients" match badge, and diet tags
- [ ] **DISC-03**: User can filter Discover by diet (vegetarian, vegan, gluten-free, dairy-free, nut-free) via a top filter bar
- [ ] **DISC-04**: User can sort results by best match (default) or fewest missing ingredients
- [ ] **DISC-05**: When the fridge is empty, Discover shows an empty state prompting the user to add ingredients

### Recipe Detail (M4)

- [ ] **RDET-01**: User can open a recipe detail screen from a Discover/Favorites card via the `recipe/[id]` route
- [ ] **RDET-02**: Detail shows hero image, title, and source attribution
- [ ] **RDET-03**: Detail shows a match summary ("You have X of Y ingredients")
- [ ] **RDET-04**: Detail splits ingredients into "In your fridge" ✓ and "You'll need to buy" 🛒
- [ ] **RDET-05**: Detail shows step-by-step instructions and tags (cuisine, diet)
- [ ] **RDET-06**: From detail, user can save the recipe to favorites and add it to the meal plan

### Favorites (M5)

- [ ] **FAV-01**: User can save and unsave a recipe with one tap
- [ ] **FAV-02**: Favorites tab shows a grid of saved recipes; tapping one opens its detail
- [ ] **FAV-03**: Saved recipes are viewable offline using the cached recipe payload

### Preferences (M5)

- [ ] **PREF-01**: User can set dietary preferences (multi-select) in Settings
- [ ] **PREF-02**: User can set allergy filters (multi-select, separate from diet) in Settings
- [ ] **PREF-03**: Diet and allergen preferences filter recipe results across the app
- [ ] **PREF-04**: User can reset all app data from Settings

### Onboarding (M6)

- [ ] **ONB-01**: First-time user sees a 3-screen onboarding (what FridgeFit does, how matching works, choose your diet)
- [ ] **ONB-02**: Onboarding is skippable and shown only once, on first launch

### Polish (M6)

- [ ] **POL-01**: Empty states across all tabs are polished, first-class screens
- [ ] **POL-02**: Key interactions have micro-animations / motion via Reanimated

### Planner (M7)

- [ ] **PLAN-01**: User can view a calendar week and assign a recipe to a date
- [ ] **PLAN-02**: Day view shows planned meals; user can edit or remove them
- [ ] **PLAN-03**: User can quick-add a recipe to the plan from favorites

### Healthy Picks (M7)

- [ ] **HLTH-01**: Discover shows a curated "healthy picks" section sourced from a seed file, each item tagged with why it's healthy

### Nutrition (M7)

- [ ] **NUTR-01**: Recipe detail shows estimated calories per serving via USDA FoodData Central, clearly labeled "Estimated"
- [ ] **NUTR-02**: Nutrition lookups are cached locally after first fetch

### Recent Ingredients (M7)

- [ ] **RCNT-01**: The add-ingredient flow shows the last 30 added ingredients as one-tap chips

### Shipping (M8)

- [ ] **SHIP-01**: A privacy policy exists and is linked from Settings
- [ ] **SHIP-02**: A disclaimer is linked from Settings; nutrition is labeled as estimates, not medical advice
- [ ] **SHIP-03**: App Store / Play Store screenshots are produced
- [ ] **SHIP-04**: App is built and submitted via EAS Build + EAS Submit

## v2 Requirements

Deferred to a future release. Tracked but not in the current roadmap.

### Cloud (v1.1)

- **SYNC-01**: Optional cloud sync of fridge, favorites, and plan across devices (architectural seams left in v1)

## Out of Scope

Explicitly excluded for v1 (from PRD §7). Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| User accounts / login | Local-first; no backend in v1 |
| Cloud sync | Deferred to v1.1; seams left but not built |
| Push notifications | Not core to the fridge-to-dinner loop |
| Photo / barcode ingredient recognition | High complexity/cost; manual entry suffices for v1 |
| Grocery list export | Deferred |
| Social features / sharing | Not core to the value proposition |
| In-app purchases | Not monetizing v1 |

## Traceability

Each requirement maps to exactly one phase (one phase per remaining milestone).

| Requirement | Phase | Status |
|-------------|-------|--------|
| MATCH-01 | Phase 1 (M3) | Pending |
| DISC-01 | Phase 1 (M3) | Pending |
| DISC-02 | Phase 1 (M3) | Pending |
| DISC-03 | Phase 1 (M3) | Pending |
| DISC-04 | Phase 1 (M3) | Pending |
| DISC-05 | Phase 1 (M3) | Pending |
| RDET-01 | Phase 2 (M4) | Pending |
| RDET-02 | Phase 2 (M4) | Pending |
| RDET-03 | Phase 2 (M4) | Pending |
| RDET-04 | Phase 2 (M4) | Pending |
| RDET-05 | Phase 2 (M4) | Pending |
| RDET-06 | Phase 2 (M4) | Pending |
| FAV-01 | Phase 3 (M5) | Pending |
| FAV-02 | Phase 3 (M5) | Pending |
| FAV-03 | Phase 3 (M5) | Pending |
| PREF-01 | Phase 3 (M5) | Pending |
| PREF-02 | Phase 3 (M5) | Pending |
| PREF-03 | Phase 3 (M5) | Pending |
| PREF-04 | Phase 3 (M5) | Pending |
| ONB-01 | Phase 4 (M6) | Pending |
| ONB-02 | Phase 4 (M6) | Pending |
| POL-01 | Phase 4 (M6) | Pending |
| POL-02 | Phase 4 (M6) | Pending |
| PLAN-01 | Phase 5 (M7) | Pending |
| PLAN-02 | Phase 5 (M7) | Pending |
| PLAN-03 | Phase 5 (M7) | Pending |
| HLTH-01 | Phase 5 (M7) | Pending |
| NUTR-01 | Phase 5 (M7) | Pending |
| NUTR-02 | Phase 5 (M7) | Pending |
| RCNT-01 | Phase 5 (M7) | Pending |
| SHIP-01 | Phase 6 (M8) | Pending |
| SHIP-02 | Phase 6 (M8) | Pending |
| SHIP-03 | Phase 6 (M8) | Pending |
| SHIP-04 | Phase 6 (M8) | Pending |

**Coverage:**
- v1 requirements: 34 total
- Mapped to phases: 34
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-19*
*Last updated: 2026-05-19 after initialization*
