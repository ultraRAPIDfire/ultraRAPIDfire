# AGENTS.md

This file defines strict collaboration rules for AI coding assistants in this repository.

## Core Rule

AI assistants must only edit files that belong to the assigned branch scope.
If a requested change is outside scope, the assistant must stop and say it is out of scope.

## Assignment By Branch Name

Read current branch first:

```bash
git branch --show-current
```

The branch prefix decides allowed work.

### `landing/hero`
Allowed:
- `src/Pages/LandingPage.tsx` only for the Hero section (`id="hero"`)
- `public/` assets used only by Hero

Forbidden:
- Mission/Vision, Department Grid, News, Facilities, Statistics, Contact, Footer sections
- Any department pages or data files

### `landing/mission-vision`
Allowed:
- `src/Pages/LandingPage.tsx` only for section `id="mission-vision"`
- `public/` assets used only by Mission/Vision

### `landing/department-grid`
Allowed:
- `src/Pages/LandingPage.tsx` only for section `id="department-grid"`
- `public/` assets used only by Department Grid

### `landing/news`
Allowed:
- `src/Pages/LandingPage.tsx` only for section `id="news"`
- `public/` assets used only by News

### `landing/facilities`
Allowed:
- `src/Pages/LandingPage.tsx` only for section `id="facilities"`
- `public/` assets used only by Facilities

### `landing/statistics`
Allowed:
- `src/Pages/LandingPage.tsx` only for section `id="statistics"`
- `public/` assets used only by Statistics

### `landing/contact`
Allowed:
- `src/Pages/LandingPage.tsx` only for section `id="contact"`
- `public/` assets used only by Contact

### `landing/footer`
Allowed:
- `src/Pages/LandingPage.tsx` only for footer block (`id="footer"`)
- `public/` assets used only by Footer

### `dept/<CODE>` where `<CODE>` is one of `CE CPE ECE EE IE MFE ME MEE`
Allowed:
- `src/data/department/<CODE>.ts`
- `public/departments/<CODE>/...`

Forbidden:
- Other department data files
- Shared page/layout files (for example `src/Pages/DepartmentPage.tsx`, `src/App.tsx`)
- Landing page files

## Explicit Owner Map For Landing Sections

- Hero: Gapac, Ryan Joshua
- Mission & Vision: Roxas, Aiam Airron L
- Department Grid: Pagdanganan, Arviella S
- News: Dela Cruz, Richter Vhon C
- Facilities: Jones, Colleen Iris P
- Statistics: Pascual, Alyssa S.
- Contact: Pagayunan, Lhara Mei R
- Footer: Villareal, Trisha Mae

AI assistants must not edit sections owned by others.

## Pre-Commit Scope Check (Mandatory)

Before committing, run:

```bash
git diff --name-only --cached
```

If any staged file is outside allowed scope for the current branch, unstage it and stop.
Do not commit mixed-scope changes.

## Commit Rules

- Keep commits small and single-purpose.
- One branch = one owned scope only.
- Do not refactor shared files unless a maintainer explicitly asks.
- Do not rename/move files outside owned scope.

## Conflict Minimization Rules

- Prefer editing content data files over shared UI files.
- For landing page branches, only change the assigned section block.
- Do not run formatting across whole files when only one section is assigned.

## If Scope Is Unclear

AI assistant must ask for clarification and do no edits until scope is confirmed.
