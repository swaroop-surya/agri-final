# AgriVision — Smart Agriculture Management System

AgriVision is an enterprise-grade precision agriculture and telemetry platform designed to connect regional agricultural authorities and local farm operators. The platform provides end-to-end monitoring of microclimate conditions, multi-depth soil moisture levels, automated solenoid valve irrigation, agronomic advisory broadcasts, and field task management.

---

## 🌾 Key Highlights & Value Proposition

- **Dual-Perspective Architecture**: Seamlessly switch between a **Regional Administrator Command View** (district oversight, reservoir telemetry, farmer registry, emergency alerts) and a **Precision Farmer Operator View** (field moisture, valve control, local weather stations, scouting tasks).
- **Public Landing Page & Interactive Demos**: An informative enterprise landing page featuring live telemetry teasers, platform capabilities, testimonials, and 1-click instant demo access for both Administrator and Farmer roles.
- **Precision Irrigation Automation**: Real-time solenoid valve control with automated cutoff thresholds, run timers, and pump delivery presets (Drip, Center Pivot, Precision Pulse).
- **Enterprise Design System**: Tailored precision-agriculture palette featuring Forest Green, Fresh Sage, Warm Ivory, and restrained Harvest Gold accents with responsive mobile drawers and quick-navigation bars.

---

## 🛠️ Tech Stack & Architecture

### **Core Frontend & Runtime**
- **React 19 (`^19.0.1`)**: Component-driven architecture using functional components, modern hooks, and state lifecycles.
- **TypeScript (`^7.0.2`)**: Strict static typing with comprehensive domain models (`Farmer`, `Plot`, `AgroAlert`, `FieldTask`, `AuthUser`, `TelemetrySnapshot`).
- **Vite 8 (`^8.3.0` / `8.3.5`)**: High-performance module bundler and dev server with fast hot reloading and Rollup/Rolldown production builds.
- **Tailwind CSS v4 (`^4.3.3`) via `@tailwindcss/vite`**: Next-generation atomic CSS engine configured with custom design tokens, CSS variables, and zero-pill enterprise styling.

### **UI Components & Icons**
- **Lucide React (`^0.546.0`)**: Comprehensive iconography for agricultural sensors, valves, weather telemetry, soil metrics, and system statuses.
- **Motion (`motion` `^12.23.24`)**: Smooth transitions, modal entry animations, and responsive interactive feedback.

### **Backend & APIs**
- **Express 4 (`^4.21.2`) & tsx (`^4.21.0`)**: Node.js full-stack capabilities with dev server middleware mounting for custom `/api/*` endpoints.
- **@google/genai (`^2.4.0`)**: Modern Google GenAI TypeScript SDK integration for AI-powered agronomic insights and crop diagnostics.
- **dotenv (`^17.2.3`)**: Secure environment variable configuration.

---

## 🎨 Enterprise Design System & Color Tokens

AgriVision uses a color scheme specifically engineered for precision agriculture software:

| Token Name | Hex Code | Role / Usage |
| :--- | :--- | :--- |
| `--color-brand` | `#123D2B` | Primary enterprise surfaces, top header, landing page hero & footer |
| `--color-brand-hover` | `#0C3021` | Darkened hover state for brand navigation buttons |
| `--color-primary` | `#216847` | Action buttons, active navigation states, checkmarks |
| `--color-primary-hover` | `#18573A` | Button hover states |
| `--color-sage` | `#DDEDE1` | Subtle badges, borders, optimal moisture range chart bands |
| `--color-sage-light` | `#EFF6F0` | Alternate table rows, active tab containers, notification panels |
| `--color-background` | `#F7F8F3` | Warm ivory dashboard and page background |
| `--color-surface` | `#FFFFFF` | Metric cards, modals, tables, dialog surfaces |
| `--color-text` | `#26372E` | Deep charcoal-green body typography |
| `--color-text-muted` | `#64746A` | Subtitles, table headers, compact secondary metrics |
| `--color-border` | `#E3E9E3` | Subtle grid lines and card borders |
| `--color-harvest` | `#D5A441` | Harvest gold highlights, warning accents, yield metrics |
| `--color-info` | `#285EA8` | Water telemetry, reservoir capacity, irrigating status |
| `--color-warning` | `#8A5A00` | Agronomic warning text and low moisture alerts |
| `--color-danger` | `#B42318` | Critical alarms, valve faults, error messages |

---

## 📑 Application Structure & Pages

### 1. Public Landing Page (`LandingPage.tsx`)
- **Header Navigation**: Quick anchors to *Home*, *About*, *Features*, *Services*, *Sign In*, and *Get Started*.
- **Hero Section**: Value proposition with live telemetry preview card, operational metrics, and quick CTA buttons.
- **Live Telemetry Strip**: Real-time gauges showing regional reservoir level (74.2%), active automated valves (48/64), average root moisture (42%), and sensor health (99.4%).
- **About Us Section**: Background on regional water governance and precision sensor deployments across Districts 1–4.
- **Core Features**: 6 precision modules (Soil Moisture Profiling, Smart Actuation, Microclimate Radar, Agronomic Advisory, Harvest Tracking, Field Work Orders).
- **Services Grid**: Public-private agricultural solutions (IoT Gateway Provisioning, Soil Health Audits, Drone Spectral Analysis, Export Compliance).
- **Testimonial Cards**: Quotes and metrics from registered regional growers and cooperative managers.
- **Demo Access Launcher**: 1-click instant login buttons allowing prospective users or evaluators to test both Administrator and Farmer roles immediately without credential setup.

---

### 2. Administrator Command Dashboard (`AdminDashboard.tsx`)
Designed for district directors, water conservation authorities, and agricultural inspectors:
- **Regional KPI Banner**: Total monitored acreage (3,420 Acres), seasonal water conservation metrics (28.4%), active solenoid count (48), open agronomic alerts (3), and district soil health index (88/100).
- **Reservoir Telemetry**: West Basin and North Reservoir capacity levels with informational blue bars and pump flow metrics.
- **Farmers Registry**: Searchable, sortable table of all regional operators with acres, primary crop, sensor uptime, and health indices.
- **Farmer Detail Modal (`FarmerDetailModal.tsx`)**: Inspect individual grower plots, soil metrics, and transmit direct operational advisories via SMS/Portal.
- **Agronomic Alert Center**: Critical frost warnings, drought stress warnings, and sensor battery alerts with acknowledgment workflows.
- **Report Generator (`ExportReportModal.tsx`)**: Download full telemetry reports as CSV spreadsheets or executive PDF briefing summaries.

---

### 3. Farmer Operator Dashboard (`FarmerDashboard.tsx`)
Built for farm operators and agronomic field managers:
- **Plot Selector**: Toggle between field zones (Plot #14 North Valley, Plot #08 South Slope, East Basin Corn, etc.).
- **Multi-Depth Moisture Telemetry**: Visual indicators displaying moisture across:
  - Surface Layer (0–15 cm)
  - Root Zone (15–40 cm) with optimal bounds highlight
  - Subsoil Layer (40–75 cm)
- **Solenoid Valve Actuation**: Toggle irrigation on/off in real-time or trigger timed irrigation runs via the precision modal.
- **Irrigation Modal (`IrrigationModal.tsx`)**: Select irrigation run times (15, 30, 45, 60 minutes), automated cutoff thresholds (e.g. 45%), and flow delivery presets (Standard Drip, High-Volume Pivot, Precision Pulse).
- **Weather & Microclimate Station**: On-field telemetry for ambient temperature, humidity, Vapor Pressure Deficit (VPD), rainfall chance, wind speed, and evapotranspiration rate.
- **Task Management (`NewTaskModal.tsx`)**: Create, prioritize, and check off field directives (fertilization, scouting, herbicide application, equipment inspection).
- **Crop Disease Scanner**: Simulation module for photographic leaf diagnostics and nutrient deficiency detection.

---

### 4. Authentication & Operator Registration (`AuthModal.tsx` & `UserProfileMenu.tsx`)
- **Sign In Flow**: Supports standard credential authentication with "Remember workstation" support.
- **Quick 1-Click Demo Profiles**:
  - `Eleanor Vance` — Regional Operations Director (`admin`)
  - `Marcus Henderson` — Henderson Crest Farm Operator (`farmer`)
- **New Operator Registration**:
  - Automatically provisions new farm accounts with name, farm name, region district, and crop selection.
  - Dynamically registers newly created farms directly into the live admin registry and opens the farmer dashboard.
- **Workstation Profile Menu**: Shows active profile initials, quick perspective switching between Admin and Farmer views, and instant sign-out.

---

## 📂 Project Directory Layout

```
├── public/                       # Static public assets and reference screenshots
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx      # Regional director dashboard & registry
│   │   ├── auth/
│   │   │   ├── AuthModal.tsx           # Sign-in, registration & 1-click demos
│   │   │   └── UserProfileMenu.tsx     # Profile popover & view switcher
│   │   ├── common/
│   │   │   ├── MetricCard.tsx          # Reusable KPI card with status badges
│   │   │   └── TelemetryLineChart.tsx  # Dynamic SVG telemetry line chart
│   │   ├── farmer/
│   │   │   └── FarmerDashboard.tsx     # Field telemetry, valves & tasks
│   │   ├── landing/
│   │   │   └── LandingPage.tsx         # Public website & interactive demos
│   │   ├── layout/
│   │   │   ├── Header.tsx              # Top bar, notifications & season filter
│   │   │   └── Sidebar.tsx             # Enterprise forest-green navigation
│   │   └── modals/
│   │       ├── ExportReportModal.tsx   # CSV and PDF report exporter
│   │       ├── FarmerDetailModal.tsx   # Farmer profile & advisory dispatcher
│   │       ├── IrrigationModal.tsx     # Solenoid valve run & cutoff scheduler
│   │       └── NewTaskModal.tsx        # Agronomic field task creation
│   ├── data/
│   │   └── mockAgricultureData.ts      # Telemetry feeds, plots, farmers & alerts
│   ├── types/
│   │   └── agriculture.ts              # TypeScript interfaces and type definitions
│   ├── App.tsx                         # Main app routing, state container & toasts
│   ├── index.css                       # Design tokens, @theme definitions & Inter font
│   └── main.tsx                        # React DOM root entry
├── .env.example                        # Template for environment variables
├── index.html                          # Entry HTML with meta & open graph tags
├── metadata.json                       # Applet configuration & permissions
├── package.json                        # Dependencies, scripts & engine requirements
├── tsconfig.json                       # Strict TypeScript compiler options
└── vite.config.ts                      # Vite build plugins & configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version `18.x`, `20.x`, or `22.x` (compatible with Vite 8).
- **npm**: Version `9.x` or higher.

### Installation

1. **Clone or open the repository**:
   ```bash
   cd applet
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` if using Gemini API or server proxy features:
   ```bash
   cp .env.example .env
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:3000`.

5. **Build for Production**:
   ```bash
   npm run build
   ```
   Generates optimized, minified bundles into the `dist/` directory.

---

## 🔒 Security & Data Integrity

- **Client-Side Safety**: No API keys or sensitive credentials are hardcoded or exposed in client bundles.
- **Telemetry Boundaries**: State updates (valve activations, moisture shifts, task scheduling) are encapsulated within memory with realistic feedback loops.
- **Accessible Contrast**: All text, status pills, and interactive buttons comply with WCAG AA readability standards against both light ivory backgrounds and dark forest-green header surfaces.

---

## 📄 License
Licensed under the Apache License, Version 2.0.
