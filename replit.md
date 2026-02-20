# ZipherLend

## Overview
Privacy-first credit scoring and lending application built on the Aleo blockchain. The frontend is a Next.js application with Tailwind CSS styling.

## Project Architecture
- **Framework**: Next.js 15 (React 18) with App Router
- **Styling**: Tailwind CSS 4 with PostCSS
- **Language**: TypeScript
- **Pages**:
  - `/` - Landing page with wallet connection (Leo Wallet) and app launch
  - `/dashboard` - Dashboard with credit score computation and loan request forms

## Recent Changes
- 2026-02-20: Downgraded from Next.js 16 to Next.js 15 for Replit compatibility
- 2026-02-20: Configured dev server to bind to 0.0.0.0:5000
- 2026-02-20: Added `allowedDevOrigins: ["*"]` for Replit proxy support
- 2026-02-20: Upgraded to Node.js 22

## Development
- Run `npm run dev` to start the development server on port 5000
- The app uses the Next.js App Router (app/ directory)

## User Preferences
- No specific preferences documented yet
