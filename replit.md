# Blackjack Simulator

## Overview

A browser-based blackjack game simulator featuring a customizable avatar that responds emotionally to gameplay outcomes. Players start with $100,000 and experience dynamic visual feedback through their avatar's mood, clothing, and accessories that change based on their balance. The application combines classic casino gameplay mechanics with character-driven engagement through a retro gaming aesthetic inspired by The Simpsons' visual style.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React 18 with TypeScript for type-safe component development
- Wouter for lightweight client-side routing
- Vite as the build tool and development server with HMR support

**State Management**
- Local component state using React hooks (useState, useEffect)
- TanStack Query (React Query) for server state management with custom queryClient configuration
- No global state management library - state is managed at component level and passed via props

**UI Component Library**
- Shadcn UI component system with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Custom CSS variables for theming (light/dark mode support)
- Component-based architecture with reusable UI primitives in `client/src/components/ui/`

**Design System**
- Casino-themed color palette with dark mode primary (green felt table aesthetic)
- Custom fonts: Inter (UI), Orbitron (digital displays), Comic Neue (avatar names)
- Retro gaming aesthetic merged with Vegas casino visual language
- Avatar customization system with mood states (ecstatic, happy, content, frown, worried, distressed, devastated) and dynamic clothing based on balance
- Progressive visual enhancements for both winning streaks and losing streaks

**Game Logic**
- Client-side game state management for blackjack mechanics
- Card deck implementation with shuffle, deal, and scoring logic
- Game state machine: betting → playing → dealer-turn → game-over
- Balance-driven avatar appearance system with 10 distinct tiers from rock bottom (<$10K) to living the dream ($250K+)

**Avatar Balance Tiers**

*Winning Tiers (Progressive Enhancements):*
- **$250,001+**: Ecstatic mood, tuxedo, celebrating girls in background + luxury car + palm trees + gold jewelry + floating money animation. Status: "Living the dream!"
- **$200,000-$250,000**: Ecstatic mood, tuxedo, luxury red convertible car + palm trees + gold jewelry + floating money animation. Status: "Cruising in style!"
- **$150,000-$199,999**: Happy mood, blue suit, gold jewelry (chains, rings, watch) + floating money animation. Status: "Bling bling!"
- **$100,001-$149,999**: Content mood, casual green clothing, animated floating dollar bills in background. Status: "Money talks!"
- **$100,000 (baseline)**: Content mood, casual green clothing, no special effects. Status: "Doing alright"

*Losing Tiers (Progressive Downgrades):*
- **$80,000-$99,999**: Frown mood, casual green clothing (original), no animations. Status: "Not feeling great..."
- **$50,000-$79,999**: Worried mood, gray holey t-shirt with visible tears, animated blue sweat drops falling from forehead. Status: "Sweating bullets!"
- **$10,000-$49,999**: Distressed mood, brown homeless-style worn clothes with patches and tears, yellow "DOWN BAD" cardboard sign held to left. Status: "Down bad..."
- **Below $10,000**: Devastated mood, dark gray trash bag outfit with wrinkles, gray garbage bags scattered in background, animated black flies buzzing around. Status: "Rock bottom..."

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript with ES modules throughout
- Custom middleware for request logging with duration tracking
- Session management ready (connect-pg-simple imported but not configured)

**Development vs Production**
- Vite middleware integration in development mode for HMR
- Separate build process for production (vite build + esbuild for server)
- Custom error overlay in development via Replit plugins
- Static file serving in production from dist/public

**Storage Interface**
- Abstract IStorage interface defined in server/storage.ts
- MemStorage class implementing in-memory storage (current implementation)
- Designed for easy migration to persistent database storage
- No routes currently registered - skeleton structure in place

### External Dependencies

**Database**
- Drizzle ORM configured for PostgreSQL via @neondatabase/serverless
- Schema defined in shared/schema.ts using Zod for validation
- Database migrations configured to output to ./migrations directory
- Currently using MemStorage - database integration prepared but not active

**UI Framework & Components**
- Radix UI primitives for accessible, unstyled component foundations
- Shadcn UI configuration in components.json (New York style variant)
- Tailwind CSS with PostCSS for utility-first styling
- Google Fonts: Inter, Orbitron, Comic Neue loaded via CDN

**Form Handling & Validation**
- React Hook Form with @hookform/resolvers for form state management
- Zod schemas for runtime validation (shared between client and server)
- Type-safe validation using drizzle-zod integration

**Development Tools**
- Replit-specific plugins: runtime error modal, cartographer, dev banner
- TypeScript with strict mode enabled
- Path aliases configured: @/ for client/src, @shared/ for shared, @assets/ for attached_assets

**Build & Bundling**
- Vite for frontend bundling with React plugin
- esbuild for server-side bundling in production
- Source map support via @jridgewell/trace-mapping
- Incremental TypeScript compilation with tsBuildInfo caching

**Notable Architectural Decisions**
- Monorepo structure with client, server, and shared code
- Type sharing between frontend and backend via shared/schema.ts
- Component examples located in client/src/components/examples/ for documentation
- Design guidelines documented in design_guidelines.md for consistent visual language
- No authentication system currently implemented (session infrastructure ready)
- Game state entirely client-side - no server persistence of game progress