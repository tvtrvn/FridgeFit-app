# FridgeFit — Complete Codebase Walkthrough

A comprehensive guide for anyone (engineers, designers, future-you) who wants to understand every part of this React Native + Expo app: what it does, how it's structured, where each piece lives, and what every term means.

---

## 1. Introduction

**FridgeFit** is a mobile app for iOS and Android that turns *what you already have in your fridge* into recipes you can cook tonight. The pitch is one sentence: most recipe apps assume you start with a recipe — FridgeFit starts with your fridge.

It is being built as an **8-milestone solo project** to learn React Native end-to-end and to ship a real App Store app. The current state of the repo is roughly **M1 + M2** — the scaffolding (navigation, design system, theme, fridge tab) is wired up and ingredients persist to SQLite. Discover, recipe detail, favorites, planner, and Settings filters are stubbed empty-states pointing toward future milestones.

Eight feature milestones the codebase is organized around (from `README.md`):

| Milestone | Status | What it adds |
|---|---|---|
| **M1** — Scaffold | done | Expo Router, tab navigation, design system primitives, Fridge tab UI |
| **M2** — SQLite | done | `ingredients` table, repo layer, hydration on app start |
| **M3** — TheMealDB + match | pending | Pull recipes, ingredient-matching algorithm, Discover tab |
| **M4** — Recipe detail | pending | Dynamic `/recipe/[id]` route |
| **M5** — Favorites + diet/allergen filters | pending | Heart toggle, settings wired to filters |
| **M6** — Onboarding + motion polish | pending | First-run flow, micro-animations |
| **M7** — Planner + USDA nutrition | pending | Calendar week, nutrition lookup via FoodData Central |
| **M8** — App Store submission | pending | Screenshots, privacy policy, EAS Submit |

The five **bottom-tab routes** today:

| Tab | File | What it does (today) |
|---|---|---|
| **Fridge** | `app/(tabs)/index.tsx` | Add/remove ingredients; persists to SQLite |
| **Discover** | `app/(tabs)/discover.tsx` | Empty state pointing to M3 |
| **Planner** | `app/(tabs)/planner.tsx` | Empty state pointing to M7 |
| **Saved** (Favorites) | `app/(tabs)/favorites.tsx` | Empty state pointing to M5 |
| **Settings** | `app/(tabs)/settings.tsx` | Empty section cards pointing to M5 |

---

## 2. High-Level Architecture

```
+---------------------------------------------------------------+
|                       Mobile device                           |
|  +---------------------------------------------------------+  |
|  | Expo runtime (iOS / Android / web via react-native-web) |  |
|  |                                                         |  |
|  |  +-----------------------+    +-----------------------+ |  |
|  |  | Expo Router           |    | React Navigation      | |  |
|  |  | (app/ file-based)     |--->| Stack + Bottom Tabs   | |  |
|  |  +-----------------------+    +-----------------------+ |  |
|  |             |                                           |  |
|  |             v                                           |  |
|  |  +---------------------------------------------+        |  |
|  |  | Screens (5 tabs + recipe/[id])              |        |  |
|  |  +---------------------------------------------+        |  |
|  |             |              ^                            |  |
|  |             v              |                            |  |
|  |  +---------------+   +-----------------+                |  |
|  |  | Zustand store |   | UI primitives   |                |  |
|  |  | ingredients   |   | (components/ui) |                |  |
|  |  +-------+-------+   +-----------------+                |  |
|  |          |                                              |  |
|  |          v                                              |  |
|  |  +---------------+                                      |  |
|  |  | repo (SQL)    |                                      |  |
|  |  +-------+-------+                                      |  |
|  |          |                                              |  |
|  |          v                                              |  |
|  |  +---------------+                                      |  |
|  |  | expo-sqlite   |                                      |  |
|  |  | fridgefit.db  |                                      |  |
|  |  +---------------+                                      |  |
|  +---------------------------------------------------------+  |
+---------------------------------------------------------------+
```

The app is **local-first**: everything the user types lives in `expo-sqlite` on the device. Future milestones (M3, M7) will pull recipe metadata from public free APIs (TheMealDB, USDA FoodData Central), but no user data ever leaves the phone.

State flows through a tiny **Zustand store** (`stores/ingredientsStore.ts`) as the in-memory single source of truth. Mutations go through the store, which writes-through to the SQLite repo asynchronously. If a write fails, the store rolls back to the prior snapshot.

---

## 3. Tech Stack at a Glance

| Layer | Technology | Purpose |
|---|---|---|
| Runtime | **Expo SDK 54** (managed) | Native bridge, build tooling, OTA updates |
| Framework | **React Native 0.81** + **React 19** | UI components and hooks |
| Language | **TypeScript 5.9** | Type safety across screens, stores, repos |
| Routing | **Expo Router 6** (file-based) | Pulls structure from `app/` directory |
| Navigation primitives | **@react-navigation/native + bottom-tabs 7** | Underlying stack + tab navigators |
| State | **Zustand 5** | Tiny global stores (currently one: ingredients) |
| Local DB | **expo-sqlite 16** | Persists ingredients across app launches |
| Forms (reserved) | **react-hook-form 7 + Zod 4** | Will power M4 recipe-detail and onboarding |
| Icons | **@expo/vector-icons (Ionicons)** | Tab icons, chip icons, button icons |
| Haptics | **expo-haptics** | Light tap on tab change via `HapticTab` |
| Animation | **react-native-reanimated 4** + **worklets** | Reserved for M6 motion polish |
| Bundler | **Metro** (Expo default) | JS bundling |
| Lint | **ESLint 9** + `eslint-config-expo` | Code style |
| Cloud builds | **EAS Build / EAS Submit** | Native binaries for App Store / Play Store |

The app is built with the **managed Expo workflow**: no `ios/` or `android/` directories committed — everything is generated at build time from `app.json` + the `expo-*` modules referenced in `package.json`.

---

## 4. Project Layout

```
FridgeFit-app/
├── app.json                      # Expo config: name, icons, splash, plugins
├── metro.config.js               # Metro (bundler) overrides
├── tsconfig.json                 # Path alias @/* → repo root
├── eslint.config.js              # Flat config, expo preset
├── package.json
├── README.md                     # Product pitch + roadmap
├── AGENTS.md / CLAUDE.md         # GitNexus notes for AI agents
├── docs/                         # PRD, SETUP, DISCLAIMER (not deep-dived here)
├── assets/                       # Icons, splash images
├── scripts/
│   └── reset-project.js          # CLI to wipe Expo's scaffolded examples
├── app/                          # ← Expo Router routes (file = route)
│   ├── _layout.tsx               # Root Stack: (tabs) + recipe/[id]
│   └── (tabs)/                   # Tab group — Bottom Tabs navigator
│       ├── _layout.tsx           # Tab config (icons, colors, HapticTab)
│       ├── index.tsx             # Fridge (home)
│       ├── discover.tsx          # Discover (M3 stub)
│       ├── planner.tsx           # Planner (M7 stub)
│       ├── favorites.tsx         # Saved (M5 stub)
│       └── settings.tsx          # Settings (M5 stub)
├── components/
│   ├── haptic-tab.tsx            # Custom tab button: light haptic on press
│   └── ui/                       # Design system primitives
│       ├── Screen.tsx            # SafeAreaView + ScrollView wrapper
│       ├── Text.tsx              # Typed Text variant API
│       ├── Button.tsx            # Brand button (primary / secondary / ghost)
│       ├── Card.tsx              # Container with surface, shadow, radius
│       ├── Chip.tsx              # Pill with optional icon, remove, tones
│       ├── Input.tsx             # Bordered field with left icon / right slot
│       ├── EmptyState.tsx        # Icon + title + description + optional action
│       └── index.ts              # Barrel export
├── constants/
│   ├── theme.ts                  # Colors, Spacing, Radii, Shadows, Type, Fonts
│   ├── diets.ts                  # Diet enum + labels
│   └── allergens.ts              # Allergen enum + labels
├── stores/
│   └── ingredientsStore.ts       # Zustand store: hydrate, add, remove, clear
├── services/
│   └── db/
│       ├── client.ts             # getDb() — single SQLite connection + migrations
│       └── ingredients.repo.ts   # CRUD helpers for the ingredients table
├── hooks/
│   └── useIngredientsHydration.ts # One-shot hydrate on app start
├── lib/
│   └── normalize.ts              # normalizeIngredient() — strip units, prep, plurals
└── types/
    ├── ingredient.ts             # Ingredient + IngredientId types
    ├── preferences.ts            # Preferences (diets, allergens, calories)
    └── recipe.ts                 # Recipe shape (reserved for M3)
```

The `(tabs)` folder name is wrapped in parentheses because **Expo Router treats the parens as "group folders"** — the folder exists in the file system but does not contribute a URL segment. So `app/(tabs)/index.tsx` resolves to `/` rather than `/(tabs)/`.

---

## 5. How to Run Locally

### Prerequisites

- **Node.js 18+**.
- **Expo Go** installed on your phone (iOS or Android) — the easiest path; alternatively, you can run an iOS Simulator (requires Xcode on macOS) or Android Emulator (requires Android Studio).

### Setup

```bash
git clone <this-repo>
cd FridgeFit-app
npm install
npm start
```

`npm start` runs `expo start`, which fires up Metro on your machine and opens a Dev Tools window in the terminal. Three ways to launch the app from there:

- **Phone (Expo Go)** — scan the QR code with your phone's camera (iOS) or with Expo Go (Android). Metro pushes the JS bundle over your local network.
- **iOS Simulator** — press `i` in the terminal.
- **Android Emulator** — press `a`.
- **Web** — press `w`. The app runs in the browser via `react-native-web` (best-effort; the experience is tuned for native).

Hot reload is on by default — save any `.tsx` and the changed module is swapped in without losing state.

### Reset the app

If you want a clean slate, the in-app path is **Settings → Reset app data** (planned for M5 — currently you can call `resetAllData()` from `services/db/client.ts` in dev). Or, on the phone, delete and reinstall Expo Go.

### Lint and typecheck

```bash
npm run lint          # expo lint (eslint flat config)
npx tsc --noEmit      # typecheck
```

---

## 6. How to Build for the App Stores

The repo is configured for **EAS Build** (Expo Application Services) — Expo's cloud build infrastructure. The flow looks like:

1. Install the EAS CLI: `npm install -g eas-cli`.
2. Log in: `eas login`.
3. Configure project (one-time): `eas build:configure`.
4. Build:
   - iOS: `eas build --platform ios`
   - Android: `eas build --platform android`
5. EAS builds in the cloud, then gives you a download link to the binary.
6. Submit: `eas submit --platform ios` (uses App Store Connect) or `--platform android` (uses Play Console).

App Store specifics (privacy policy URL, screenshots, store descriptions) are tracked separately in `docs/PRD.md` and `docs/APP_STORE.md` (planned M8 deliverables).

Because the app is **local-first**, there are no production environment variables, secrets, or backend infrastructure to provision. The only API key the project will ever need is **USDA FoodData Central** (for M7 nutrition), which is free and stored in `.env.local`.

---

## 7. Code Deep-Dive

### 7.1 Expo Router and the routing tree

Expo Router takes the structure of the `app/` directory and turns it into the app's navigation graph automatically. Two top-level routes are declared in `app/_layout.tsx`:

```tsx
<Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="recipe/[id]" options={{ title: '', headerTransparent: true }} />
</Stack>
```

- `(tabs)` → the bottom-tab navigator, defined in `app/(tabs)/_layout.tsx`. The parens make it a "group" that doesn't appear in the URL.
- `recipe/[id]` → a dynamic route reserved for M4 (recipe detail page). The square brackets mark `id` as a route parameter.

The tab layout (`app/(tabs)/_layout.tsx`) declares five screens with custom tab bar styling (84px tall, green active tint, brand off-white background). The tab button is replaced with a custom `<HapticTab>` so each tab press fires a light haptic via `expo-haptics`.

`unstable_settings = { anchor: '(tabs)' }` in the root layout tells Expo Router which screen to fall back to when no route matches — equivalent to the "home" of the stack.

### 7.2 `app/_layout.tsx` — root provider + theme

```tsx
const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.brand,
    background: Colors.surface,
    card: Colors.surfaceElevated,
    text: Colors.text,
    border: Colors.border,
    notification: Colors.accent,
  },
};

export default function RootLayout() {
  useIngredientsHydration();
  return (
    <ThemeProvider value={NavTheme}>
      <Stack screenOptions={{ headerStyle: { backgroundColor: Colors.surface }, ... }}>
        ...
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
```

Three responsibilities concentrated in this file:

- **Theme registration with React Navigation.** `NavTheme` overrides the default React Navigation colors with the FridgeFit design tokens from `constants/theme.ts`. This is what makes the header bar, back button, and active tints pick up brand colors without per-screen overrides.
- **Hydration.** `useIngredientsHydration()` runs once on app start, loading rows from SQLite into the Zustand store. Until it completes, the Fridge screen renders nothing in its list section (it shows neither the empty state nor a stale list, avoiding flicker).
- **Status bar style.** `<StatusBar style="dark" />` sets dark text on the (off-white) status bar background.

### 7.3 `app/(tabs)/_layout.tsx` — bottom tab navigation

A pure config file. Each `<Tabs.Screen>` registers one tab; the `name` field matches a file under `(tabs)/`. The `tabBarButton: HapticTab` line is the key swap — replacing the default pressable with a custom one that emits a light haptic.

`HapticTab` (in `components/haptic-tab.tsx`) is a thin wrapper around the default `BottomTabBarButton` that calls `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` in its `onPressIn`. Subtle, but it gives the app a tangible feel that distinguishes it from a "generic Expo template."

### 7.4 `app/(tabs)/index.tsx` — the Fridge screen

This is the only screen with real interactivity right now. Roughly 130 lines.

Top-down flow:

1. Local state for the input text (`text`) and a ref to the `<TextInput>`.
2. Subscribe to the Zustand store for `ingredients`, `hydrated`, `add`, and `remove` — *each as a separate selector* so the component only re-renders when its specific slice changes (a Zustand best practice).
3. `handleAdd` reads the current text, trims it, and dispatches `add(text)`. If the trimmed text is empty, it bails.

Render layout:

- A header (`<Text variant="display">Your Fridge</Text>`) plus subtitle.
- An `<Input>` with a search icon on the left and a conditional **arrow-up Add button** on the right (only when the text isn't empty).
- A conditional body:
  - If `!hydrated` → render nothing (the store hasn't loaded yet).
  - If `ingredients.length === 0` → show `<EmptyState>` with six **starter suggestion chips** (`tomato`, `spinach`, `egg`, `chicken`, `rice`, `garlic`) — tapping any chip adds it to the fridge.
  - Otherwise → render the chip list and a sticky **"Find recipes I can make"** CTA button (currently a no-op — M3 will navigate to Discover).

The `<Chip onRemove={...}>` prop renders a small × button on each chip; tapping it dispatches `remove(id)`.

### 7.5 `stores/ingredientsStore.ts` — Zustand state machine

Zustand makes state global without the boilerplate of Redux. Here's the full state shape:

```ts
interface IngredientsState {
  ingredients: Ingredient[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  add: (raw: string) => void;
  remove: (id: IngredientId) => void;
  clear: () => void;
}
```

**`hydrate()`** — called once at app start by `useIngredientsHydration()`. Idempotent: short-circuits if `hydrated` is already true. On success, sets `ingredients` to the loaded array and flips `hydrated: true`. On error, still flips `hydrated: true` so the UI doesn't get stuck on the blank pre-hydration state.

**`add(raw)`** — the most interesting one:

```ts
add: (raw) => {
  const display = raw.trim();
  const normalized = normalizeIngredient(display);
  if (!normalized) return;
  if (get().ingredients.some((i) => i.name === normalized)) return; // dedupe

  const ingredient: Ingredient = {
    id: makeId(),
    name: normalized,
    displayName: display.toLowerCase(),
    addedAt: Date.now(),
  };

  set((state) => ({ ingredients: [ingredient, ...state.ingredients] }));

  repo.insert(ingredient).catch((err) => {
    console.warn('[ingredients] insert failed, rolling back:', err);
    set((state) => ({ ingredients: state.ingredients.filter((i) => i.id !== ingredient.id) }));
  });
},
```

Two things worth understanding:

- **Two forms of the ingredient name.** `name` is the *normalized* form (`"tomato"` even if the user typed `"2 large tomatoes, diced"`), used for matching/dedupe. `displayName` is what the user sees in the chip — preserves the original phrasing in lowercase. Storing both means the user can put `"baby spinach"` next to `"baby kale"` and the app remembers the friendlier label.
- **Optimistic update with rollback.** The UI updates immediately (`set(...)`), then the async DB write fires. If the write fails (rare — SQLite is on the device), the entry is filtered back out. The user sees zero latency in the happy path and only sees a rollback on a real I/O failure.

**`remove(id)` / `clear()`** — same optimistic-with-rollback pattern. Both snapshot the array first, mutate the store, fire the async repo write, and restore the snapshot on failure.

**`makeId()`** generates an opaque string like `"1715990000000-x3y9k1"` (timestamp + random base-36 suffix). Good enough for client-only IDs; no need for UUIDs.

### 7.6 `services/db/client.ts` and `ingredients.repo.ts` — SQLite layer

**`client.ts`** holds a single shared connection lazily:

```ts
let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;
export function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) dbPromise = openAndMigrate();
  return dbPromise;
}
```

`openAndMigrate()` opens the DB file `fridgefit.db` and runs the schema migration block:

```sql
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS ingredients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  is_staple INTEGER NOT NULL DEFAULT 0,
  added_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ingredients_added_at
  ON ingredients(added_at DESC);
```

- **WAL** (Write-Ahead Logging) — better concurrent read/write performance than the default rollback journal. Safe to enable everywhere on iOS/Android.
- **`CREATE … IF NOT EXISTS`** — idempotent; calling `getDb()` on every app start is fine.
- **`name TEXT UNIQUE`** — the *normalized* name is the uniqueness constraint, so the user can't have two entries that normalize to the same thing.
- **Index on `added_at DESC`** — supports the `ORDER BY added_at DESC` in `getAll()`.

`resetAllData()` is a one-shot `DELETE FROM ingredients` exposed for the Settings → "Reset app data" wire-up.

**`ingredients.repo.ts`** is the typed API the rest of the app calls — `getAll()`, `insert(ingredient)`, `remove(id)`, `clear()`. Each acquires the DB via `getDb()` and runs a parameterized query. There is a `rowToIngredient` helper that maps snake_case columns to the camelCase `Ingredient` type.

`is_staple` is stored as `INTEGER` (0/1) since SQLite has no native boolean — converted to JS `boolean` in `rowToIngredient`.

### 7.7 `lib/normalize.ts` — the matching kernel

This file is the single piece of "interesting logic" today. Its job is to turn messy ingredient strings into a canonical token sequence for matching:

```
"2 large tomatoes, diced"            →  "tomato"
"finely chopped fresh garlic cloves" →  "garlic"
"1 cup cooked rice"                  →  "rice"
```

The algorithm is four steps:

1. **Lowercase and trim.**
2. **Strip punctuation and digits.** `[(),.;:!?"'`]` and `\d+([./]\d+)?` are replaced with spaces.
3. **Tokenize and filter.** Split on whitespace; drop any token in the `PREP_WORDS` set (`fresh`, `frozen`, `chopped`, `diced`, `sliced`, `minced`, `large`, `small`, …) or the `UNITS` set (`cup`, `tbsp`, `g`, `oz`, `lb`, `can`, `clove`, …).
4. **Singularize.** A tiny rule-based singularizer: words ending in `ies` → `y`, `ses`/`xes` → strip 2, generic trailing `s` → strip 1 (but not `ss`). Words under 4 characters are left alone (so `"is"` doesn't become `"i"`).

The singularizer is intentionally naive. It will misfire on irregulars (`leaves` → `leave`), but for the typical fridge vocabulary the false-negative rate is fine. M3 will introduce a more careful version with a small irregular-plural dictionary.

This logic lives in `lib/` because it's pure — no React, no Expo, no DB. It can be reused by the recipe-match algorithm (M3) without any boundary crossing.

### 7.8 `hooks/useIngredientsHydration.ts`

```ts
export function useIngredientsHydration(): boolean {
  const hydrated = useIngredientsStore((s) => s.hydrated);
  const hydrate = useIngredientsStore((s) => s.hydrate);
  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);
  return hydrated;
}
```

A one-liner of a hook. Two safeguards:

- Reads `hydrated` and `hydrate` as separate selectors, so the hook doesn't re-fire when other parts of the store change.
- The `if (!hydrated)` inside the effect is redundant *most* of the time (the store already short-circuits), but adds defense in depth against React StrictMode double-invocation in dev.

The hook returns the boolean so consumers can render conditionally if needed. In `RootLayout` the return value is ignored — hydration just needs to happen.

### 7.9 `constants/theme.ts` — the design system in 117 lines

`Colors` defines roughly 20 semantic tokens — brand sage green, accent peach, soft surfaces, text levels (`text`, `textSecondary`, `textMuted`, `textInverse`), and tone-specific colors (`success`, `warning`, `error` plus their `*Soft` variants for chip backgrounds).

Why **sage** as the brand color: it reads as food-adjacent without being literal (no apple green, no salad green). Peach as accent makes the UI feel warmer than a typical "clean clinical health app."

`Spacing` is a power-of-ish ladder: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64`. Every margin/padding in the app uses one of these constants — there are no magic-number pixel values in the screens. Consistency emerges automatically.

`Radii` covers the four-corner-radius needs: `sm: 8`, `md: 12`, `lg: 16`, `xl: 24`, `pill: 999`.

`Type` is the typography scale. Every text style is defined here — `display`, `title`, `heading`, `body`, `bodyStrong`, `small`, `smallStrong`, `caption`. The `<Text variant="...">` component (see 7.10) takes the variant key and maps to the right `TextStyle`. This means changing the body font family is a one-line edit.

`Fonts` is platform-conditional via `Platform.select` — uses iOS's `ui-rounded` system font for display/heading (gives those friendly SF Pro Rounded vibes), falls back to `system-ui` on other platforms. **No custom fonts are bundled**, which means the app starts fast and the brand still reads as "modern and friendly" via OS-native typefaces.

### 7.10 `components/ui/` — the design system primitives

Eight components in `components/ui/`, all exported via a barrel `index.ts`. Each is small and opinionated.

**`Screen`** wraps every screen with a `<SafeAreaView>` and optionally a `<ScrollView>` (`scroll` prop). Adds default horizontal padding (`Spacing.xl`) unless `padded={false}`. Sets background to `Colors.surface` so screens never show a white flash.

**`Text`** takes a `variant` prop (`display | title | heading | body | bodyStrong | small | smallStrong | caption`) and a `color` prop (any key from `Colors`), then applies the matching style. Replaces every direct use of React Native's `<Text>` so typography stays consistent.

**`Button`** has three variants (`primary | secondary | ghost`), three sizes (`sm | md | lg`), and optional left/right slots. The primary variant is sage on white with white text; secondary is outlined; ghost is text-only.

**`Card`** is a wrapper with `Colors.surfaceElevated` background, `Radii.lg`, and `Shadows.md`. Used everywhere a "content section on a slightly elevated surface" is needed.

**`Chip`** is the workhorse pill: optional left icon, optional remove × button, three tones (`default | success | warning`), and a `selected` state. The fridge tab uses chips for both starter suggestions (with `+` icons) and added ingredients (with × remove buttons).

**`Input`** is a bordered text field with optional `leftIcon` (Ionicon name) and `rightElement` (arbitrary React node — the fridge tab uses this for the conditional "submit" arrow button).

**`EmptyState`** is the most opinionated component — a large Ionicon, a title, a description, and an optional action slot (typically a `<Chip>` or `<Button>`). Designed once so every empty state in the app feels the same.

The hierarchy is intentional: **screens compose primitives, never raw React Native components.** That keeps the design language coherent and gives a single place to retheme.

### 7.11 `components/haptic-tab.tsx`

A small wrapper around the React Navigation default tab button:

```tsx
import * as Haptics from 'expo-haptics';
import { PlatformPressable } from '@react-navigation/elements';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(e) => {
        if (process.env.EXPO_OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(e);
      }}
    />
  );
}
```

The haptic is gated to iOS via `process.env.EXPO_OS` (Expo Router's per-platform env hint). Android's haptic primitives are different and intentionally skipped.

### 7.12 `app/(tabs)/discover.tsx`, `planner.tsx`, `favorites.tsx`, `settings.tsx`

Right now these are intentionally simple "empty-state" screens — placeholders for milestones M3–M7. Each reuses `<EmptyState>` with copy explaining when the feature will land. The **`discover.tsx`** screen is mildly clever: it branches on `useIngredientsStore((s) => s.ingredients.length > 0)` and shows different copy ("Recipes are coming soon" vs "Add ingredients first") depending on whether the user has ingredients yet.

The empty-state-first approach is a design choice from the README: *"Empty states are first-class screens."* Even before features are built, the screens render thoughtfully.

### 7.13 `types/` — TypeScript shapes

- **`ingredient.ts`** — `Ingredient` (`id`, `name`, `displayName`, `isStaple?`, `addedAt`) and `IngredientId` (alias for `string`).
- **`preferences.ts`** — `Preferences` (`diets`, `allergens`, optional `caloriePreference`). Reserved for M5.
- **`recipe.ts`** — recipe shape reserved for M3 (TheMealDB integration).

All app code imports types from `@/types/...` via the TypeScript path alias defined in `tsconfig.json`.

### 7.14 `constants/diets.ts` and `allergens.ts`

Pure enum-like constants for diet IDs (`vegetarian`, `vegan`, `gluten-free`, `dairy-free`, `nut-free`) and allergen IDs, each with a display label. They're imported only by `types/preferences.ts` today; the Settings screen will surface them in M5.

---

## 8. Data Flow End-to-End

### Cold start

```
1. App launches; Metro JS bundle loads.
2. RootLayout mounts.
3. useIngredientsHydration() fires its effect:
     store.hydrate() → getDb() opens & migrates SQLite
                    → ingredients.repo.getAll()
                    → store.set({ ingredients, hydrated: true })
4. (Concurrent) Stack renders (tabs); TabLayout mounts; FridgeScreen mounts.
5. FridgeScreen renders nothing in the list section until hydrated === true.
6. Once hydrated:
   - if ingredients.length === 0 → EmptyState with starter chips.
   - else → chip list + "Find recipes" CTA.
```

### Add an ingredient ("baby spinach")

```
User                    FridgeScreen           Zustand            SQLite
 |                          |                     |                   |
 |-- type "baby spinach"--->|                     |                   |
 |                          |   setText("baby     |                   |
 |                          |     spinach")       |                   |
 |                          |   re-render input   |                   |
 |                          |                     |                   |
 |-- tap arrow / Enter ---->|                     |                   |
 |                          | handleAdd()         |                   |
 |                          | text="baby spinach" |                   |
 |                          |                     |                   |
 |                          | call store.add(text)|                   |
 |                          |---------------------|                   |
 |                          |                     | normalize(text)   |
 |                          |                     | → "baby spinach"  |
 |                          |                     | dedupe check      |
 |                          |                     |                   |
 |                          |                     | id = makeId()     |
 |                          |                     | ingredient =      |
 |                          |                     |  {id,name,display,|
 |                          |                     |   addedAt}        |
 |                          |                     | set: prepend      |
 |                          |                     | to ingredients[]  |
 |                          |                     |                   |
 |                          |                     | repo.insert(ing)  |
 |                          |                     |------------------>|
 |                          |                     |                   | INSERT OR IGNORE
 |                          |                     |                   | into ingredients
 |                          |                     |<------------------| ok
 |                          | re-renders chip list|                   |
 |   sees new chip          |                     |                   |
```

If the `repo.insert` rejects, the catch block filters the new id back out of the array — the chip vanishes and a `console.warn` fires.

### Remove an ingredient

```
User taps × on chip → store.remove(id):
  1. snapshot = current array
  2. set: array.filter(i => i.id !== id) (optimistic)
  3. repo.remove(id) async
     - on success: nothing more to do
     - on failure: set ingredients: snapshot (rollback)
```

### Future flow (M3 preview)

When Discover is wired up, it will:

1. Read the fridge ingredients from `useIngredientsStore`.
2. Hit TheMealDB (anonymous, free): typical call is `GET https://www.themealdb.com/api/json/v1/1/filter.php?i=tomato`.
3. For each candidate, compute a "match score" by counting normalized fridge ingredients present in the recipe's ingredient list (with substring tolerance).
4. Rank descending; render the top N as cards in a `FlatList`.
5. Tap a card → push `/recipe/[id]` (Stack route in `app/_layout.tsx`).

The normalization function (`lib/normalize.ts`) will be the matching kernel on both sides — fridge ingredients and recipe ingredients run through the same normalizer before set comparison.

---

## 9. Plain-English Glossary

**App Router (Expo Router):** A file-based router for React Native apps. The folder structure inside `app/` becomes the navigation graph. `_layout.tsx` files configure the navigator (Stack, Tabs, Drawer); `index.tsx` is the default route inside a folder; `[param].tsx` marks a dynamic segment.

**Bottom tab navigator:** The 5-tab bar across the bottom of the screen. Powered by `@react-navigation/bottom-tabs` and configured in `app/(tabs)/_layout.tsx`.

**EAS (Expo Application Services):** Expo's hosted services for building and submitting native apps. `eas build` produces signed iOS / Android binaries in the cloud; `eas submit` uploads them to App Store Connect / Play Console.

**Expo (managed workflow):** A way to develop React Native apps without ever touching native code. You declare native dependencies in `app.json` and `package.json`, and Expo generates the iOS/Android projects at build time. The opposite is the "bare workflow" where you commit `ios/` and `android/` directories yourself.

**Expo Go:** A standalone app on the App Store / Play Store that can load your project's JavaScript bundle over Wi-Fi for instant testing — no native build required.

**Group folder (Expo Router):** A folder name wrapped in parentheses like `(tabs)/`. The folder exists in the filesystem but doesn't appear in the URL. Used to organize related screens without nesting them under a path segment.

**Haptic feedback:** A tactile vibration triggered by user input. The Fridge tab fires `Haptics.ImpactFeedbackStyle.Light` on every tab press via the custom `HapticTab` component.

**Hydration:** The process of loading persisted data (here, from SQLite) into in-memory state (the Zustand store) at app start. Until hydration completes, the screen renders neutral placeholders to avoid showing "empty" to a user who actually has data.

**Ingredient (in this app):** Anything the user might keep in their fridge or pantry. Represented by `{ id, name (normalized), displayName, isStaple?, addedAt }`.

**Local-first:** A design philosophy where the app works fully offline and all user data lives on the device. Network requests are reserved for *content* (recipe catalogs, nutrition lookups) — never for syncing user state.

**Metro:** The default React Native bundler. Watches the filesystem, transforms JSX/TypeScript, and serves the JS bundle to the device.

**Normalize (an ingredient):** Reduce a messy phrase like `"2 large tomatoes, diced"` to its canonical form `"tomato"` so that fridge entries and recipe-required ingredients can be compared without false negatives.

**Optimistic update:** Update the UI immediately as if the operation will succeed; fire the async work in the background; roll back if it fails. The Zustand store does this for every mutation, so the user sees zero perceptual latency on adds/removes.

**Repo (repository pattern):** A thin module (`services/db/ingredients.repo.ts`) that owns all SQL queries for one table. Other code never writes SQL directly — it calls `repo.insert(...)`, `repo.getAll()`, etc.

**Safe area:** The portion of the screen unobstructed by the notch, status bar, or home indicator. `react-native-safe-area-context` exposes `<SafeAreaView>` for layout. The `Screen` primitive wraps every screen in one.

**Singularize:** Convert a plural to a singular. The local implementation is rule-based: `ies → y`, `ses/xes → strip 2`, default `s → strip 1` (skip `ss` and words under 4 chars).

**Staple ingredient:** An ingredient the user always has (salt, oil, pepper). Flagged via `isStaple: true` so the recipe-match score can ignore it as a constraint. UI for marking staples is planned for a later milestone.

**TheMealDB:** A public free recipe database (no API key, no quota). Will power M3's Discover tab.

**Tab group (Expo Router):** See "Group folder".

**TypeScript path alias (`@/...`):** A `tsconfig.json` setting that maps `@/components/ui` → `./components/ui`. Keeps imports readable from anywhere in the tree.

**USDA FoodData Central:** A free US-government nutrition database. Will power M7's nutrition lookups. Free API key required.

**WAL (Write-Ahead Logging):** SQLite's journaling mode that allows concurrent reads while a writer is active. Enabled via `PRAGMA journal_mode = WAL;` in `client.ts`.

**Zustand:** A small (~1KB) state-management library for React. Stores are plain functions over a `create()` factory; consumers subscribe via `useStore(selector)` and only re-render when the selected slice changes.

---

## 10. Common Tasks

### Add a new tab

1. Create `app/(tabs)/whatever.tsx`. Export a default React component.
2. Add a new `<Tabs.Screen name="whatever" options={...} />` entry to `app/(tabs)/_layout.tsx`.
3. Pick an Ionicon for `tabBarIcon`.

The tab appears immediately in the bottom bar.

### Add a new persisted entity (M4-style)

1. Add a new type in `types/<entity>.ts`.
2. Update `services/db/client.ts` to add a `CREATE TABLE IF NOT EXISTS` in the migration block.
3. Create `services/db/<entity>.repo.ts` with `getAll`, `insert`, `remove`, etc.
4. Create `stores/<entity>Store.ts` mirroring the ingredients store: `hydrate`, `add`, `remove`, optimistic with rollback.
5. Wire a `use<Entity>Hydration` hook into `RootLayout`.

### Change the brand color

Edit `constants/theme.ts`. `Colors.brand`, `Colors.brandSoft`, `Colors.brandDeep` are the three tokens that drive the active tint, chip background, and pressed state. All UI primitives read from these tokens — no further changes needed.

### Add a new UI primitive

1. Create `components/ui/Whatever.tsx`. Stay disciplined: use `Colors`, `Spacing`, `Radii` from `constants/theme.ts` — never raw pixel or hex values.
2. Export from `components/ui/index.ts` so the barrel import keeps working.

### Tighten the normalizer

`lib/normalize.ts` is the single place to grow the dictionaries. Add irregular plurals, more prep words, or new units to the appropriate `Set`. Then write a quick `lib/normalize.test.ts` (when M3 brings tests) with example inputs and expected outputs.

### Test on a real iPhone

`npm start` → scan the QR code with the iPhone camera → Expo Go opens. Edits to any `.tsx` push live over Wi-Fi.

### Build for the App Store

```bash
npm install -g eas-cli
eas login
eas build --platform ios
# wait for cloud build
eas submit --platform ios
```

The first time, `eas build:configure` interactively sets up `eas.json` and provisions iOS credentials.

### Reset the local SQLite DB

In a dev REPL or temporary screen action, call:

```ts
import { resetAllData } from '@/services/db/client';
await resetAllData();
```

Then either reload the app or rerun `useIngredientsStore.getState().hydrate()` to refresh the store.

---

## 11. Troubleshooting

**Expo Go won't connect to the dev server.**

Most often this is a network mismatch — your phone and laptop aren't on the same Wi-Fi, or the Wi-Fi blocks peer-to-peer connections (most corporate networks do). Fix: use Expo's **tunnel** mode: `npx expo start --tunnel`. Slightly slower bundle pushes but works across any network.

**iOS Simulator never opens.**

`npm start`, then press `i`. If nothing happens, install Xcode (large download from the Mac App Store). Then on first run, accept the license: `sudo xcodebuild -license`.

**`Error: Cannot find module 'expo-sqlite'` after pulling new code.**

Run `npm install`. Expo's lockfile changes often, and a clean install is cheap.

**Hot reload makes the app crash with "X is not a function".**

Sometimes Expo's Fast Refresh chokes on a half-edited file. The fix is to shake the device (or press `r` in the dev tools terminal) to do a full reload.

**Ingredients vanish after closing the app.**

Hydration failed silently. Open the dev tools console — there should be a `[ingredients] hydrate failed:` warning. The most common cause is a schema mismatch from an older DB version; fix in `services/db/client.ts` by adding the missing column with `ALTER TABLE` in `openAndMigrate`.

**`expo-sqlite` errors with "no such table: ingredients".**

The migration block didn't run. Verify `getDb()` is actually being called somewhere — `useIngredientsHydration` should fire on app mount. If you've recently renamed the table, delete the app from the simulator/phone and reinstall to clear the old DB file.

**TypeScript complains about `@/components/...` imports.**

Check `tsconfig.json` for the path alias:

```json
"paths": { "@/*": ["./*"] }
```

If it's correct, restart TypeScript: in VS Code, "TypeScript: Restart TS server" from the command palette.

**Haptics don't fire on Android.**

By design — the `HapticTab` is gated to iOS via `EXPO_OS`. To enable Android haptics, drop the gate and accept that Android's haptic envelope is different. Expo-haptics maps `ImpactFeedbackStyle.Light` to a short vibration on Android.

**Empty state doesn't show after deleting all ingredients.**

Make sure the deletion went through both the store and the DB — a stale optimistic snapshot can briefly show the chips before the DB write rolls back. Look in the console for `[ingredients] remove failed`.

**EAS build fails because the bundle is too big.**

Expo SDK 54 builds aren't tiny but should land well under the App Store's 200MB limit. If your bundle is large, audit assets in `assets/` — large PNGs and unused fonts are the usual culprits.

**App crashes on launch (no error in Metro).**

Open the **native** logs:

- iOS: `xcrun simctl spawn booted log stream --predicate 'process == "Expo Go"'`
- Android: `npx react-native log-android`

JavaScript errors that happen before the React tree mounts are easy to miss in the Metro overlay.
