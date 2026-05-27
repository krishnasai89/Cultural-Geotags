# 🌌 GEOTAG.ARCHIVE // Spatial Artifact Ledger

A high-performance, minimalist digital platform designed to map, document, and catalog regional Indian cultural artifacts, heritage textiles, and global weaving methodologies. Built with a terminal-style aesthetic, fluid masonry layouts, and hardware-accelerated motion choreography.

---

## ⚡ Tech Stack Core

- **Framework:** Next.js 16.2.6 (App Router Framework)
- **Compiler Engine:** Turbopack Pipeline Execution
- **State Architecture:** React Context API Ledger Core
- **Animation System:** GSAP 3.x + ScrollTrigger Plugin
- **3D Telemetry Canvas:** Three.js Modular Particle Wave
- **Styling Engine:** Tailwind CSS (Fluid utility layers)

---

## 🛠️ Key Architectural Implementations

### 1. Unified State & Secure Authentication

A robust `AppContext` wrapper handles client-side caching (`localStorage`) tracking across browser hydration loops.

- **Atomic Cart Logic:** Automatically handles item quantification increments over simple duplicate object pushes, eliminating React layout tracking identity clashing (`Encountered two children with the same key`).
- **RBAC Security Shield:** Embedded role-based access controls (`hasPermission`) shielding protected layout terminals based on authentication token properties.

### 2. Micro-Friction UI Elements

- **Matrix Teleloader:** Speed-runs a system cold boot telemetry text log array to establish theme immersion before pulling up the layout canvas veil using a synchronized GSAP timeline.
- **Dense Masonry Mosaic Matrix:** An asymmetric home layout rendering engine mapping variables (`normal`, `tall`, `wide`) smoothly across rows with `grid-flow-row-dense` rules to completely prevent white space fractures.
- **Multi-Tier Real-Time Filters:** A high-precision client-side search indexing console mapping input queries across item designations, categories, regions, and specific geographical tag variables concurrently.

---

## 📁 Directory Structural Matrix

```text
├── src/
│   ├── app/
│   │   ├── layout.js          # Main layout provider wrapper injection path
│   │   ├── page.js            # Home masonry view grid controller
│   │   ├── auth/              # Unified sign-in/registration module view
│   │   └── item/[id]/         # Dynamic product ledger provenance routing
│   ├── components/
│   │   ├── ArtifactCard.jsx   # Grid card container with hover-max-height reveals
│   │   ├── CartDrawer.jsx     # GSAP sliding side-panel overview console
│   │   ├── CommerceConsole.jsx# Increment quantity modifiers & transaction flags
│   │   ├── Navbar.jsx         # Absolute application client router links
│   │   ├── Preloader.jsx      # Telemetry terminal boot sequence loader
│   │   ├── SearchMatrix.jsx   # Multi-tier real-time search input panels
│   │   └── ThreeBackground.jsx# Three.js particle array timeline waves
│   ├── context/
│   │   └── AppContext.jsx     # Global data provider engine and authentication state
│   └── data/
│       └── items.js           # Sanitized schema array tracking 51 heritage items
```
