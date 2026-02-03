# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

- **Start dev server**: `npm run dev` (opens at http://localhost:3000)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint**: `npm run lint`

## Tech Stack

- **Next.js 16** with App Router
- **React 19** with TypeScript (strict mode enabled)
- **Tailwind CSS 4** with PostCSS
- **ESLint** with Next.js config

## Project Structure

This is an App Router-based Next.js project:
- `/app` - App Router directory with file-based routing
  - `layout.tsx` - Root layout with Geist fonts
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles with Tailwind directives
- Path alias `@/*` maps to project root

## TypeScript Configuration

- Target: ES2017
- Strict mode enabled
- JSX: react-jsx (Next.js handles React imports automatically)
