# 🛡 SafeRoute — Smart Road Safety & Risk Prediction

A production-grade React frontend for an AI-powered road safety and accident risk prediction platform.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

App runs at **http://localhost:3000**

---

## 📁 Project Structure

```
src/
├── App.jsx                          # Root component — routing setup
├── index.js                         # React entry point
├── index.css                        # Global CSS variables & base styles
│
├── context/
│   └── AuthContext.jsx              # Global auth state (user login/logout)
│
├── components/
│   ├── Navbar/
│   │   ├── Navbar.jsx               # Responsive navigation bar
│   │   └── Navbar.module.css
│   └── UI/
│       ├── index.jsx                # Shared UI: Button, Card, Badge, Alert, Input…
│       ├── UI.module.css            # Shared UI styles
│       ├── Icon.jsx                 # Centralised SVG icon library
│       └── GridBackground.jsx      # Animated grid overlay
│
└── pages/
    ├── Home/
    │   ├── HomePage.jsx             # Landing page — hero, stats, awareness
    │   ├── HomePage.module.css
    │   └── components/
    │       ├── HeroSection.jsx      # Hero headline + CTA buttons
    │       ├── HeroSection.module.css
    │       ├── HomeComponents.jsx   # AwarenessTips, LiveTicker, CTABanner
    │       ├── HomeComponents.module.css
    │       └── index.js             # Barrel exports
    │
    ├── Emergency/
    │   ├── EmergencyPage.jsx        # SOS alert & emergency contacts
    │   ├── EmergencyPage.module.css
    │   └── components/
    │       ├── EmergencyComponents.jsx    # EmergencyNumbers, SOSForm, MessagePreview, CausesPrecautions
    │       ├── EmergencyComponents.module.css
    │       └── index.js
    │
    ├── Hospitals/
    │   ├── HospitalsPage.jsx        # Nearby hospital locator with map
    │   ├── HospitalsPage.module.css
    │   └── components/
    │       ├── HospitalComponents.jsx     # Filters, HospitalList, HospitalMap, FirstResponseGuide
    │       ├── HospitalComponents.module.css
    │       └── index.js
    │
    ├── MLPredict/
    │   ├── MLPage.jsx               # AI risk prediction (plug in your ML model here)
    │   ├── MLPage.module.css
    │   └── components/
    │       ├── MLComponents.jsx     # PredictionForm, PredictionResult
    │       ├── MLComponents.module.css
    │       └── index.js
    │
    ├── Dashboard/
    │   ├── DashboardPage.jsx        # Analytics dashboard with charts
    │   ├── DashboardPage.module.css
    │   └── components/
    │       ├── DashboardComponents.jsx   # KPIRow, BarChart, CausesChart, HotspotsTable, TableauEmbed
    │       ├── DashboardComponents.module.css
    │       └── index.js
    │
    └── Login/
        ├── LoginPage.jsx            # Sign In / Register page
        └── LoginPage.module.css
```

---

## 📄 Pages

| Route        | Page            | Description                                              |
|--------------|-----------------|----------------------------------------------------------|
| `/`          | Home            | Awareness hub — hero, stats, safety tips, CTA            |
| `/emergency` | Emergency SOS   | Emergency contacts, SOS message generator                |
| `/hospitals` | Hospitals       | Nearest hospitals with bed availability & map            |
| `/predict`   | AI Prediction   | ML model form — plug your endpoint here                  |
| `/dashboard` | Analytics       | Charts, KPIs, hotspots table, Tableau embed area         |
| `/login`     | Login / Register| Auth page with form validation                           |

---

## 🤖 Connecting Your ML Model

Open `src/pages/MLPredict/MLPage.jsx` and replace the `setTimeout` block inside `handlePredict()` with your API call:

```js
// Example: Flask / FastAPI endpoint
const res = await fetch('http://localhost:5000/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
const data = await res.json();
setResult({
  score: data.risk_score,
  level: data.risk_level,   // 'HIGH' | 'MEDIUM' | 'LOW'
  factors: data.factors,
  confidence: data.confidence,
});
```

---

## 🗺 Tableau Dashboard

Open `src/pages/Dashboard/components/DashboardComponents.jsx` → `TableauEmbed` component and replace the placeholder with:

```jsx
<tableau-viz
  id="tableauViz"
  src="https://public.tableau.com/views/YOUR_VIZ/Sheet1"
  toolbar="bottom"
  hide-tabs
/>
```

---

## 🗺 Google Maps Integration

In `HospitalComponents.jsx` → `HospitalMap`, replace the SVG placeholder with the `@react-google-maps/api` package:

```bash
npm install @react-google-maps/api
```

---

## 🎨 Design System

All design tokens live in `src/index.css` as CSS variables (`--accent`, `--bg`, `--font-head`, etc.).  
All component styles use **CSS Modules** (`*.module.css`) — fully scoped, no conflicts.

---

## 📦 Dependencies

| Package            | Purpose                    |
|--------------------|----------------------------|
| react              | UI library                 |
| react-dom          | DOM rendering              |
| react-router-dom   | Client-side routing        |
| react-scripts      | CRA build toolchain        |
