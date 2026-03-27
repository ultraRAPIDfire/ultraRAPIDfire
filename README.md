# BULSU COE Web Engineering Project

**Live Site:** https://ultra-rapi-dfire.vercel.app/

A web engineering project for the Bulacan State University College of Engineering, featuring an integrated CI/CD pipeline.

## Features

- Dynamic landing page with customizable sections.
- Per-department pages dynamically loaded from JSON data.
- Built-in admin editors (`/admin` and `/dept/:deptCode/admin`) with live previews and JSON export tools.

## Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Deployment:** Vercel
- **CI/CD Pipeline:** GitHub Actions & Vercel

## Architecture & Structure

- `src/`
  - `components/`: Shared React components.
  - `data/`: TypeScript-based content files for the landing page and department data structures.
  - `lib/`: Helper functions for admin pages, data loading, etc.
  - `Pages/`: Main page components for the application routes.
    - `admin/`: Admin editor pages for each department.
- `public/`
  - `data/departments/`: The JSON files that hold the live content for each department page.

## Application Routes

- `/` Landing page
- `/admin` Landing admin editor
- `/departments` Department selector
- `/dept/:deptCode` Department page
- `/dept/:deptCode/admin` Department admin editor

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode. Open http://localhost:5173 to view it in the browser. The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Lints the TypeScript/JavaScript files in the project to catch errors and enforce code style.

### `npm run test`

Runs a full check including linting, CSS linting, and a production build to ensure everything is correct before a commit.

### `npm run preview`

Serves the production build from the `dist` folder locally to preview the final app.

## Deployment

This project is configured for continuous deployment on Vercel.

- **Production URL:** https://ultra-rapi-dfire.vercel.app/

Any push to the `main` branch that passes the CI/CD checks will be automatically deployed.

## Content Management

There are two primary ways to manage content:

1.  **Admin UI Method:**
    -   **Landing Page:** Navigate to `/admin` to edit the main landing page content.
    -   **Department Pages:** Navigate to `/dept/:deptCode/admin` (e.g., `/dept/ME/admin`) to edit a specific department's content.
    -   These pages provide a live preview and allow you to download an updated `.json` file.

2.  **Direct Code Method:**
    -   **Landing Page:** Modify the `landingPageData` object in `src/data/landing.ts`.
    -   **Department Data:**
        -   For default structure and non-editable fields, modify the corresponding file in `src/data/department/`.
        -   For live content, update the JSON file in `public/data/departments/`.
