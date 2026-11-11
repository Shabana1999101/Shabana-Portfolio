# Shabana Ajmin Portfolio

An executive portfolio for Shabana Ajmin, Technical Program Manager. The site presents leadership experience, program outcomes, capabilities, and contact information in a responsive React application.

## Requirements

- Node.js 20 or later
- npm

## Getting Started

```bash
npm install
npm run dev
```

Vite prints the local development URL after the server starts.

## Available Scripts

- `npm run dev` starts the local development server.
- `npm run build` runs the TypeScript checks and creates a production build in `dist/`.
- `npm run preview` serves the production build locally after running `npm run build`.

## Pages

- `/` Home and leadership snapshot
- `/about` Biography and leadership approach
- `/experience` Career history
- `/experience/:slug` Individual company stories
- `/leadership` Program impact and recognition
- `/skills` Searchable capabilities and tools
- `/resume` Resume overview and request link
- `/contact` Direct contact details
- `/dashboard` Curated portfolio metrics

The theme control cycles through Morning, Afternoon, and Night. The selected theme is saved in browser storage. Afternoon uses its own Home and About portraits from `IMAGES/`.

## Project Structure

- `src/App.tsx` shared layout, routes, and page components
- `src/content.ts` portfolio copy and structured career data
- `src/styles.css` responsive layout, visual themes, and motion styles
- `src/main.tsx` React application entry point
- `IMAGES/` portrait and company logo assets

## Tech Stack

React, TypeScript, Vite, React Router, Framer Motion, GSAP, and Lucide icons.
