# FridgeFit — Product Requirements Document

**Status:** Draft v1
**Owner:** Thinh Vu
**Last updated:** 2026-05-13

---

## 1. One-line pitch

FridgeFit turns whatever is in your fridge into healthy recipes you can actually cook tonight — and tells you exactly what you'd need to buy to unlock more.

## 2. Why this app exists

People throw away food because they don't know what to cook with what they already have. Existing recipe apps assume you start with a recipe and then go shopping. FridgeFit flips that: start with your fridge, end with dinner.

**Success looks like:**
- A user can go from "I have eggs, spinach, and feta" to a ranked list of cookable recipes in under 15 seconds.
- A first-time user can complete their first cook-from-fridge flow without ever feeling stuck.
- The app is usable offline once recipes are cached.

## 3. Target user

- **Primary:** 20–35 year olds cooking for themselves, budget-conscious, mildly health-aware. Comfortable with phones, not necessarily cooks.
- **Secondary:** Students living in shared housing with limited pantry space.
- **Tertiary:** Anyone managing dietary restrictions (vegetarian, gluten-free, allergies) who wants filtering done for them.

## 4. Top user stories (MVP)

1. **As a hungry user,** I can type in the ingredients I have so the app knows what I can work with.
2. **As a hungry user,** I see a ranked list of recipes I can mostly or fully make right now.
3. **As a hungry user,** I can see clearly what I have vs. what I'm missing for any recipe.
4. **As a returning user,** I can save recipes I liked so I find them again later.
5. **As a dietary-restricted user,** I can set "vegetarian" once and never see meat recipes again.

## 5. MVP feature scope

### 5.1 Fridge tab (Home)
- Add ingredients via a single text input with suggestions
- Display as removable chips
- Search/filter within the list once it grows
- Persisted locally; survives app restarts
- Empty state with a friendly prompt and 3 suggested starter ingredients

### 5.2 Discover tab
- Pulls recipes from TheMealDB based on current ingredients
- Ranked by match score (descending)
- Each card shows: image, title, "X of Y ingredients" badge, diet tags
- Diet filter bar at the top (vegetarian, vegan, gluten-free, dairy-free, nut-free)
- Sort options: best match (default), fewest missing
- Empty state if fridge is empty: "Add ingredients to start cooking"

### 5.3 Recipe detail
- Hero image, title, source attribution
- Match summary: "You have 4 of 6 ingredients"
- Two ingredient sections: **In your fridge** ✓ and **You'll need to buy** 🛒
- Step-by-step instructions
- Tags (cuisine, diet)
- Calorie estimate (if available; clearly labeled as estimate)
- Buttons: Save to favorites, Add to meal plan (v1)
- Disclaimer: "Nutrition figures are estimates, not medical advice."

### 5.4 Favorites tab
- Grid of saved recipes
- Tap to open detail
- Swipe or long-press to unsave
- Available offline (uses cached recipe payload)

### 5.5 Settings tab
- Dietary preferences (multi-select)
- Allergy filters (multi-select, separate from diet)
- Reset app data
- Privacy policy link
- Disclaimer link
- App version

### 5.6 Onboarding
- 3 screens: what FridgeFit does, how matching works, choose your diet
- Skippable
- Shown once on first launch

## 6. V1 features (after MVP)

### 6.1 Meal planner
- Calendar view (React Native Calendars)
- Tap a date → pick a recipe (from favorites or recent suggestions) → assign
- Day view shows planned meals
- Edit/remove planned meals
- Quick-add from favorites

### 6.2 Healthy picks
- Curated editorial section on Discover (collapsible card row at top)
- Powered by a `healthy-picks.json` seed file with 20–30 hand-picked recipes
- Each tagged with why it's healthy ("high protein", "under 400 cal")

### 6.3 Nutrition via USDA
- For each recipe, look up calorie estimates per ingredient from USDA FoodData Central
- Sum across ingredients per serving
- Always labeled "Estimated"
- Cached locally after first lookup

### 6.4 Recent ingredients
- Track the last 30 ingredients added
- Show as one-tap chips in the add-ingredient flow

## 7. Out of scope (explicitly)

- User accounts / login
- Cloud sync (architectural seams left for v1.1)
- Push notifications
- Photo / barcode ingredient recognition
- Grocery list export
- Social features / sharing
- In-app purchases

## 8. Matching algorithm (v1)

Plain English:

1. Normalize every ingredient name (lowercase, trim, strip "fresh", "chopped", "diced", etc., singular form).
2. For each recipe candidate, compute:
   - `have = count of recipe ingredients that match fridge ingredients`
   - `total = total recipe ingredients`
   - `missing = total - have`
   - `score = have / total`
3. Bonus: if all "essential" ingredients are present (essential = first 3 listed in recipe), add +0.1 to score.
4. Rank recipes by score descending. Ties broken by `missing` ascending.
5. Filter out anything that violates the active diet/allergy filters before ranking.

**Why this works:** simple, explainable, no ML, runs in milliseconds on-device, easy to debug when a user says "why is this recipe at the top?"

## 9. Nutrition logic (v1)

- Prefer nutrition data from the recipe source (TheMealDB doesn't provide it, so fall back).
- Fallback: for each recipe ingredient, fetch its calorie density (kcal/100g) from USDA FDC, assume default quantities (TheMealDB measurements are stringly-typed and messy), sum.
- Cache USDA lookups indefinitely (food facts don't change).
- **Always** display with the word "Estimated" and a tap-to-info icon explaining methodology.
- Skip recipes from nutrition calc if more than 30% of ingredients are unrecognized.

## 10. Privacy and data

- **No accounts, no analytics in MVP.** Zero PII collected.
- All data lives in on-device SQLite.
- Network requests go to TheMealDB and USDA FDC only.
- No third-party SDKs that phone home.
- Settings includes a "Reset app data" button that wipes the SQLite DB.

## 11. Design principles

1. **The fridge is the home base.** First tab, first thing the user sees.
2. **One primary action per screen.** Never make the user wonder what to tap.
3. **Empty states are first-class screens,** not afterthoughts.
4. **Trust the user; don't over-confirm.** No "are you sure?" dialogs unless the action is destructive.
5. **Friendly, not cute.** Warm tone, calm colors, no exclamation marks.

## 12. Tech stack summary

| Layer | Choice |
|---|---|
| Runtime | Expo (managed workflow) |
| Framework | React Native + TypeScript |
| Routing | Expo Router (file-based) |
| Local DB | Expo SQLite |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Calendar | react-native-calendars |
| Recipes API | TheMealDB (free, no key) |
| Nutrition API | USDA FoodData Central (free, API key) |
| Build/Submit | EAS Build + EAS Submit |

## 13. Success metrics (portfolio-style)

Since there's no analytics in MVP, "success" is qualitative:

- Anyone you hand the phone to can cook a recipe from their fridge without asking you a question.
- Demo videos look smooth — no jank, no flash of unstyled content.
- README, screenshots, and a 60-second demo GIF are in the repo.
- App passes App Store review on first or second submission.

## 14. Milestones

| Milestone | What's done |
|---|---|
| **M1: Scaffold** | Expo project running on device, theme + nav skeleton |
| **M2: Fridge** | Add/remove/persist ingredients with polished UI |
| **M3: Discover** | TheMealDB integration + matching + ranked list |
| **M4: Detail** | Recipe screen with have/missing breakdown |
| **M5: Favorites + Settings** | Local saves + diet filters working end-to-end |
| **M6: Polish pass** | Onboarding, empty states, motion, dark mode (optional) |
| **M7: V1 features** | Meal planner, healthy picks, USDA nutrition |
| **M8: App Store** | Privacy policy, screenshots, EAS submit |

## 15. Open questions

- Do we want dark mode in MVP, or save for v1.1? *(My recommendation: build the theme to support it from day 1, ship light-only.)*
- What's the cuisine focus of the curated healthy picks? *(Default: globally varied, weighted toward Mediterranean / Asian.)*
- App icon and brand mark — DIY, AI-generated, or commissioned? *(Need decision before submission.)*
