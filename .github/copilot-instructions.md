# AI agent guide for this repo

Project: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4, UI via Radix + class-variance-authority, optional Drizzle ORM + Postgres, Mapbox GL for maps.

## Architecture and structure
- App Router (RSC) under `src/app/**`. Interactive components/pages use "use client" (see `src/app/map/page.tsx`).
- UI system lives in `src/components/ui/*` with cva variants and Tailwind classes; use `cn` from `src/lib/utils.ts` to merge className.
- Theming: `ThemeProvider` from `next-themes` is mounted in `src/app/layout.tsx`; prefer theme-aware styles via CSS variables in `src/app/globals.css`.
- Data layer: Drizzle ORM schema in `src/db/schema.ts` with three tables: `users` (FK org_id), `organizations`, and `posts` (FK user_id). Lat/long are currently integers.
- DB client wiring in `src/db/index.ts` (drizzle over `postgres` using `DATABASE_URL`). Note: as committed, `db` is created but not exported—export it before consumption.
- Mapping: Mapbox GL v3 used in `src/app/map/page.tsx`, reading `NEXT_PUBLIC_MAPBOX_API_KEY` and browser geolocation to center and place a `Marker`.

## Developer workflows
- Dev server: `pnpm dev` (Next + Turbopack). Build: `pnpm build`. Start: `pnpm start`. Lint: `pnpm lint`.
- Tailwind v4 is configured via `@import "tailwindcss"` in `globals.css`; design tokens defined as CSS variables in the same file.
- Drizzle Kit is configured in `drizzle.config.ts` using `DATABASE_URL` and schema at `src/db/schema.ts`. No scripts are defined; invoke via `npx drizzle-kit` when needed (e.g., `drizzle-kit generate`), with `DATABASE_URL` set.

## Conventions and patterns
- Path alias: `@/*` -> `./src/*` (see `tsconfig.json`). Prefer absolute imports (e.g., `@/components/ui/button`).
- UI components expose variant props via cva; compose like:
  - Example: `Button` in `src/components/ui/button.tsx` with variants `variant` (default|destructive|outline|secondary|ghost|link) and `size` (default|sm|lg|icon|icon-sm|icon-lg).
- Keep RSC vs client clear: pages/components that touch browser-only APIs (e.g., `navigator.geolocation`, `mapbox-gl`) must start with `"use client"`.
- Environment access: client code must use NEXT_PUBLIC_ prefix (e.g., `NEXT_PUBLIC_MAPBOX_API_KEY`); server-only secrets (e.g., `DATABASE_URL`) stay unprefixed.
- Styling: use Tailwind classes and theme tokens; dark mode uses `@custom-variant dark (&:is(.dark *));` and variables defined in `globals.css`.

## Integration points and examples
- Mapbox GL example: see `src/app/map/page.tsx` for geolocation + marker setup; error handling branches on `PERMISSION_DENIED`, etc. The map disables rotation and sets zoom bounds (12–16).
- DB schema example: `posts` references `users.user_id` (cascade on delete) and stores `longitude`/`latitude` as integers—be consistent when reading/writing (e.g., store microdegrees or change schema if you need floats).
- Theme example: `ThemeProvider` in `layout.tsx` sets `attribute="class"` and `defaultTheme="system"`—prefer class-based theme toggling in UI.

## Environment variables
- Required: `DATABASE_URL` (server, Postgres). Optional/Client: `NEXT_PUBLIC_MAPBOX_API_KEY` (Mapbox).
- Load via `.env` (dotenv is installed); Next will expose only NEXT_PUBLIC_* to the client.

## Tips for common tasks
- Adding a client page/component: add `"use client"` and prefer hooks; import UI primitives from `@/components/ui/*` and merge classes with `cn()`.
- Using the DB: export `db` from `src/db/index.ts` and import it in server components, route handlers, or actions. Keep schema changes in `src/db/schema.ts` and update migrations via Drizzle Kit.
- Map features: reuse `MapBox` pattern from `src/app/map/page.tsx`; set `mapboxgl.accessToken` from env, handle location errors, and clean up the map instance on unmount.

If anything above is unclear (e.g., how you want DB exports handled, or migration workflow details), tell me and I’ll refine these instructions.
