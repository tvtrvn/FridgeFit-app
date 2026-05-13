# FridgeFit

> Turn what's already in your fridge into recipes you can actually cook tonight.

A clean, local-first iOS + Android app built with Expo, React Native, and TypeScript.

<!-- TODO: drop a 60-second demo GIF here once M3 is done -->

## What it does

- **Add what you have.** Type ingredients into your fridge — tomatoes, spinach, leftover chicken.
- **See what you can make.** Recipes are ranked by ingredient match. We show what you have, what you need to buy.
- **Filter your way.** Vegetarian, vegan, gluten-free, dairy-free, nut-free.
- **Save favorites.** One tap. Works offline.
- **Plan meals.** Drop recipes onto a calendar week.

## Why I built it

Most recipe apps assume you start with a recipe. FridgeFit flips that — start with your fridge, end with dinner. Built as my first mobile app to learn React Native end-to-end and explore what feels good as mobile UX.

## Stack

| Layer | Tech |
|---|---|
| Runtime | [Expo](https://expo.dev) SDK 54 (managed) |
| Language | TypeScript |
| Framework | React Native 0.81, React 19 |
| Routing | [Expo Router](https://expo.github.io/router/) (file-based) |
| State | [Zustand](https://zustand-demo.pmnd.rs/) |
| Local DB | [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) |
| Forms | React Hook Form + Zod |
| Recipe data | [TheMealDB](https://www.themealdb.com/) (free, no key) |
| Nutrition | [USDA FoodData Central](https://fdc.nal.usda.gov/) (free, API key) |
| Builds | EAS Build + EAS Submit |

## Quick start

```bash
git clone <this-repo>
cd FridgeFit-app
npm install
npm start
```

Then scan the QR code with the Expo Go app on your phone (iOS or Android).

Full setup walkthrough, including how to get USDA API access, is in [`docs/SETUP.md`](docs/SETUP.md).

## Project structure

```
fridgefit/
├── app/                   Expo Router routes (file = route)
│   ├── (tabs)/            Bottom tab navigation
│   │   ├── index.tsx      Fridge (home)
│   │   ├── discover.tsx   Recipe matches
│   │   ├── planner.tsx    Meal calendar
│   │   ├── favorites.tsx  Saved recipes
│   │   └── settings.tsx   Diet + allergens
│   └── recipe/[id].tsx    Recipe detail (dynamic)
├── components/
│   ├── ui/                Design system primitives
│   ├── ingredient/        Ingredient-specific UI
│   └── recipe/            Recipe-specific UI
├── hooks/                 Custom React hooks
├── lib/                   Pure logic (matching, nutrition, normalization)
├── services/
│   ├── api/               TheMealDB + USDA clients
│   └── db/                SQLite repositories
├── stores/                Zustand stores
├── types/                 TypeScript types
├── constants/             Theme, diets, allergens
├── data/seed/             Curated content
├── assets/                Icons, images, fonts
└── docs/                  PRD, setup guide, App Store prep
```

## Roadmap

- [x] **M1** — Scaffold, design system, navigation, Fridge tab wired up
- [ ] **M2** — Local persistence (SQLite) for ingredients
- [ ] **M3** — TheMealDB integration + match algorithm + Discover tab
- [ ] **M4** — Recipe detail screen
- [ ] **M5** — Favorites + diet/allergen filters
- [ ] **M6** — Onboarding, empty-state polish, motion
- [ ] **M7** — Meal planner, healthy picks, USDA nutrition
- [ ] **M8** — Privacy policy, screenshots, EAS submit to App Store

Full product spec in [`docs/PRD.md`](docs/PRD.md).

## Design principles

1. **The fridge is home base.** First tab, first impression.
2. **One primary action per screen.**
3. **Empty states are first-class screens.**
4. **Trust the user; don't over-confirm.**
5. **Friendly, not cute.** Warm tone, calm colors, no exclamation marks.

## Disclaimer

Nutrition figures are estimates, not medical advice. See [`docs/DISCLAIMER.md`](docs/DISCLAIMER.md).

## License

MIT — see `LICENSE` (added before App Store submission).
