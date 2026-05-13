# FridgeFit — Setup Guide

A first-mobile-app-friendly walkthrough. If a step feels obvious to you, skim it.

## 1. Install the tooling

You need three things on your computer.

### Node.js (the JavaScript runtime)

```bash
node --version
```

If this prints something like `v20.x.x`, you're good. If not:

- Mac: install with [nvm](https://github.com/nvm-sh/nvm) (`brew install nvm` then `nvm install 20`).
- Windows: download from [nodejs.org](https://nodejs.org).

### Git

```bash
git --version
```

Comes pre-installed on Mac. On Windows: [git-scm.com](https://git-scm.com/).

### Expo Go (on your phone)

Install **Expo Go** from the App Store (iOS) or Play Store (Android). This lets you run FridgeFit on your phone without ever opening Xcode or Android Studio.

## 2. Get the code

```bash
git clone <repo-url> FridgeFit-app
cd FridgeFit-app
npm install
```

`npm install` will take 1–3 minutes the first time. It's installing about 600 small packages.

## 3. Run the app

```bash
npm start
```

A QR code appears in your terminal.

- **iOS:** open the Camera app, point it at the QR code, tap the banner.
- **Android:** open Expo Go and scan the QR code from inside the app.

The first launch takes 15–30 seconds while the JavaScript bundle compiles. Subsequent launches are near-instant.

### Tips while developing

- **Save a file → it reloads automatically.** Fast Refresh keeps your screen state when possible.
- **Shake the phone** (or press `m` in the terminal) for the dev menu.
- **Press `r`** in the terminal to force a full reload.
- **Press `i`** to open iOS Simulator (Mac only, requires Xcode), **`a`** for Android Emulator, **`w`** for the web preview.

## 4. Make your first edit

Open `app/(tabs)/index.tsx` in your editor. Change the headline from `Your Fridge` to something else, save the file. Your phone updates within a second.

## 5. Folder map

| Folder | What lives there |
|---|---|
| `app/` | Screens. Each file is a route. |
| `components/ui/` | Reusable buttons, cards, inputs. |
| `constants/theme.ts` | All colors, spacing, type sizes. |
| `lib/` | Pure functions (matching, normalization). No React. |
| `services/api/` | Outside-world API clients. |
| `services/db/` | SQLite repositories. |
| `stores/` | Zustand stores (in-memory state). |
| `types/` | Shared TypeScript types. |

## 6. Environment variables (later)

When we add USDA nutrition (M7), you'll need a free API key from [api.data.gov](https://api.data.gov/signup/).

Copy `.env.example` to `.env.local` and fill in:

```
EXPO_PUBLIC_USDA_API_KEY=your_key_here
```

Anything prefixed `EXPO_PUBLIC_` is exposed to the app at build time. Don't put secrets here — there's no truly private env var in a mobile app.

## 7. Type checking

```bash
npx tsc --noEmit
```

This is the same check that runs in CI. Fix any red squiggles before pushing.

## 8. Resetting if something breaks

```bash
rm -rf node_modules .expo
npm install
npm start --reset-cache
```

This nukes the cache and the node_modules folder. Almost any weird build error goes away after this.

## 9. Common issues

**"Unable to resolve module @/..."** — restart Metro with `npm start --reset-cache`. The TS path alias is fine; Metro's cache went stale.

**Expo Go shows a red error screen** — read the message at the top. Tap "Reload" once you've fixed the issue.

**iPhone won't connect** — phone and laptop must be on the same Wi-Fi. Corporate Wi-Fi often blocks this; use a personal hotspot or `npx expo start --tunnel`.

**TypeScript complains in a brand-new file** — make sure the path is inside `app/`, `components/`, etc., and that the file is `.ts` or `.tsx`.

## What's next

See `docs/PRD.md` for the full spec and `README.md` for the milestone roadmap. The current build is **M1 (scaffold)** — the Fridge tab is interactive, the other tabs are placeholders with polished empty states.
