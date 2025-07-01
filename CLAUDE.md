# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 kanban application built with:
- **Framework**: Next.js 15 with App Router and Turbopack for fast development
- **Styling**: Tailwind CSS v4 with custom design tokens and dark mode support
- **UI Components**: Configured for shadcn/ui with "new-york" style preset
- **Drag & Drop**: @dnd-kit/sortable for kanban board interactions
- **Icons**: Lucide React icon library
- **Language**: TypeScript with strict mode enabled

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture & Structure

### File Organization
- `app/` - Next.js App Router pages and layouts
- `lib/utils.ts` - Shared utility functions (includes cn() for className merging)
- `components/` - Reusable UI components (shadcn/ui components go in `components/ui/`)
- `public/` - Static assets

### Key Configurations
- **Path Aliases**: `@/` maps to project root, with specific aliases for components, utils, ui, lib, and hooks
- **Styling**: Uses Tailwind v4 with custom CSS variables for theming in `app/globals.css`
- **Component Library**: shadcn/ui configured with Lucide icons and CSS variables for theming

### Design System
- Custom color palette using OKLCH color space
- Dark mode support with CSS custom properties
- Consistent border radius and spacing scale
- Built-in chart colors and sidebar theming

### TypeScript Configuration
- Path mapping configured for `@/*` imports
- Strict mode enabled with Next.js plugin integration
- Includes all necessary type definitions for React 19 and Next.js 15

## Development Notes

- Use the `cn()` utility from `@/lib/utils` for conditional className merging
- Follow shadcn/ui patterns for component development
- Leverage Next.js App Router conventions for routing and layouts
- Use Turbopack for fast development iteration