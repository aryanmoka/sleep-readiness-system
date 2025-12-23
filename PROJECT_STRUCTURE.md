# Project Structure

Complete file organization for the Training Readiness System.

---

## Directory Tree

```
training-readiness-system/
│
├── backend/                          # Python FastAPI Backend
│   ├── main.py                       # Core API application and model logic
│   ├── requirements.txt              # Python dependencies
│   ├── test_api.py                   # API testing script
│   ├── .gitignore                    # Backend-specific gitignore
│   └── README.md                     # Backend documentation
│
├── src/                              # React Frontend Source
│   ├── components/                   # React Components
│   │   ├── Header.tsx               # Application header
│   │   ├── Footer.tsx               # Application footer
│   │   ├── InputSlider.tsx          # Reusable slider component
│   │   ├── ReadinessDisplay.tsx     # Results display component
│   │   └── ErrorDisplay.tsx         # Error message component
│   │
│   ├── config/                       # Configuration Files
│   │   └── inputConfig.ts           # Slider configurations
│   │
│   ├── services/                     # API Services
│   │   └── api.ts                   # API client and error handling
│   │
│   ├── types/                        # TypeScript Types
│   │   └── index.ts                 # Type definitions
│   │
│   ├── App.tsx                       # Main application component
│   ├── main.tsx                      # Application entry point
│   ├── index.css                     # Global styles + Tailwind
│   └── vite-env.d.ts                # Vite type definitions
│
├── dist/                             # Production build output (generated)
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].css
│   │   └── index-[hash].js
│   └── ...
│
├── node_modules/                     # NPM dependencies (generated)
│
├── public/                           # Static assets
│   └── vite.svg
│
├── .env.example                      # Environment variable template
├── .gitignore                        # Git ignore rules
├── eslint.config.js                  # ESLint configuration
├── index.html                        # HTML entry point
├── package.json                      # NPM dependencies and scripts
├── package-lock.json                 # NPM lock file
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript project config
├── tsconfig.app.json                 # TypeScript app config
├── tsconfig.node.json                # TypeScript node config
├── vite.config.ts                    # Vite build configuration
│
├── README.md                         # Main project documentation
├── ARCHITECTURE.md                   # System architecture details
├── SCREENSHOTS.md                    # UI visual design guide
└── PROJECT_STRUCTURE.md             # This file
```

---

## File Descriptions

### Backend Files

#### `backend/main.py` (293 lines)
- FastAPI application setup
- CORS middleware configuration
- Input validation with Pydantic models
- Readiness calculation function (regression formula)
- Recommendation logic (threshold-based)
- API endpoints: `/`, `/health`, `/predict`
- Comprehensive docstrings and type hints

#### `backend/requirements.txt`
- fastapi: Web framework
- uvicorn: ASGI server
- pydantic: Data validation
- python-multipart: Form data support

#### `backend/test_api.py`
- Integration tests for API
- Four test scenarios:
  1. Well-rested athlete
  2. Moderately fatigued
  3. Poorly recovered
  4. Average readiness
- HTTP request examples using `requests` library

#### `backend/README.md`
- Quick start guide
- API endpoint documentation
- Model formula reference
- Testing instructions
- Deployment considerations

---

### Frontend Files

#### `src/App.tsx` (138 lines)
- Main application component
- State management for inputs, results, loading, error
- Event handlers for user interactions
- Layout composition
- API integration

#### `src/components/Header.tsx`
- Application branding
- Title and subtitle
- Dumbbell icon
- Responsive layout

#### `src/components/Footer.tsx`
- Research attribution
- Model formula display
- Academic context

#### `src/components/InputSlider.tsx`
- Reusable slider component
- Label, value display, description
- Range input with custom styling
- Props interface for configuration

#### `src/components/ReadinessDisplay.tsx`
- Score visualization (large number)
- Progress bar with animation
- Color-coded recommendation card
- Interpretation text
- Dynamic styling based on category

#### `src/components/ErrorDisplay.tsx`
- Error message display
- Dismissible notification
- Red color scheme
- Icon + message layout

#### `src/config/inputConfig.ts`
- Centralized slider configurations
- Min/max/step values
- Labels and descriptions
- Type-safe configuration array

#### `src/services/api.ts`
- API client functions
- `predictReadiness()`: POST to /predict
- `checkApiHealth()`: Health check
- Custom `ApiError` class
- Error handling and network detection

#### `src/types/index.ts`
- TypeScript interfaces:
  - `TrainingInput`: Input data structure
  - `TrainingOutput`: API response structure
  - `InputConfig`: Slider configuration type

#### `src/index.css`
- Tailwind CSS imports
- Custom animations (fadeIn)
- Slider thumb styling (Chrome/Firefox)
- Hover effects

---

### Configuration Files

#### `package.json`
- Project metadata
- Dependencies: React, TypeScript, Tailwind, Lucide React
- Scripts: dev, build, lint, preview, typecheck
- Dev dependencies: Vite, ESLint, etc.

#### `vite.config.ts`
- Vite configuration
- React plugin
- Optimization settings (exclude lucide-react)

#### `tailwind.config.js`
- Tailwind CSS configuration
- Content paths for purging
- Theme extensions (none needed)

#### `tsconfig.json`
- TypeScript project references
- Links to app and node configs

#### `tsconfig.app.json`
- TypeScript compiler options for app
- ES2020 target
- Strict mode enabled
- React JSX support

#### `eslint.config.js`
- ESLint configuration
- React hooks plugin
- TypeScript ESLint integration

---

### Documentation Files

#### `README.md` (700+ lines)
- **Comprehensive project documentation**
- Table of contents
- Project overview and features
- System architecture diagram
- Research foundation and model explanation
- Technology stack
- Complete installation and setup guide
- API documentation with examples
- Frontend component descriptions
- Responsive design details
- Model formula and calculations
- Limitations and future work
- MSc submission notes and viva defense talking points
- Contact and acknowledgments

#### `ARCHITECTURE.md` (500+ lines)
- **Detailed technical architecture**
- Architecture patterns and principles
- Frontend architecture (components, state, types)
- Backend architecture (request flow, functions, validation)
- API communication layer
- Complete data flow diagram
- Design decisions with rationale
- Security considerations
- Performance characteristics and scalability
- Testing strategy
- Deployment architecture
- Monitoring and observability
- Future enhancements (3 phases)

#### `SCREENSHOTS.md` (400+ lines)
- **Visual design specification**
- Color palette definition
- Desktop, tablet, mobile layouts
- Component-by-component visual descriptions
- Slider, button, card styling details
- State variations (ready/caution/rest)
- Error and loading states
- Animations and interactions
- Accessibility features
- User journey walkthrough
- Design philosophy
- Screenshot checklist for documentation

#### `PROJECT_STRUCTURE.md` (This file)
- Complete directory tree
- File-by-file descriptions
- Line counts and purposes
- Quick reference guide

---

## File Statistics

### Backend
- **Total Files**: 5
- **Total Lines**: ~400
- **Languages**: Python, Markdown

### Frontend
- **Total Files**: 21 (excluding node_modules)
- **Source Files**: 12 TypeScript/TSX files
- **Total Lines**: ~1,200+
- **Languages**: TypeScript, CSS, HTML, JavaScript

### Documentation
- **Total Files**: 4
- **Total Lines**: ~2,000+
- **Languages**: Markdown

---

## Key File Relationships

### Data Flow
```
User Interaction
    ↓
App.tsx (state management)
    ↓
services/api.ts (HTTP request)
    ↓
backend/main.py (calculation)
    ↓
services/api.ts (response)
    ↓
App.tsx (state update)
    ↓
ReadinessDisplay.tsx (render)
```

### Type Flow
```
types/index.ts (definitions)
    ↓
├─→ components/*.tsx (props)
├─→ services/api.ts (request/response)
├─→ config/inputConfig.ts (configuration)
└─→ App.tsx (state)
```

### Style Flow
```
tailwind.config.js (configuration)
    ↓
postcss.config.js (processing)
    ↓
index.css (global + custom)
    ↓
components/*.tsx (Tailwind classes)
    ↓
Vite build (optimization)
    ↓
dist/assets/*.css (production)
```

---

## Entry Points

### Development
1. **Frontend**: `src/main.tsx` → renders `App.tsx`
2. **Backend**: `backend/main.py` → starts FastAPI server

### Production
1. **Frontend**: `dist/index.html` → loads bundled JS/CSS
2. **Backend**: `backend/main.py` → production ASGI server

---

## Code Organization Principles

### Frontend
- **Components**: UI building blocks (single responsibility)
- **Services**: External communication (API calls)
- **Config**: Application configuration (reusable data)
- **Types**: Type definitions (shared interfaces)

### Backend
- **Monolithic**: Single file for simplicity (appropriate for scope)
- **Functional**: Pure functions for calculations
- **Declarative**: Pydantic models for validation
- **RESTful**: Standard HTTP methods

---

## Build Artifacts

### Development
- **Frontend**: Memory-only (Vite dev server)
- **Backend**: .pyc bytecode files in `__pycache__/`

### Production
- **Frontend**: `dist/` directory
  - Minified HTML
  - Bundled CSS (with hash)
  - Bundled JS (with hash)
  - Optimized for caching
- **Backend**: No build needed (Python interpreted)

---

## Version Control

### Tracked Files
- All source code
- Configuration files
- Documentation
- Package manifests

### Ignored Files (`.gitignore`)
- `node_modules/`
- `dist/`
- `.env`
- `__pycache__/`
- `*.pyc`
- Various IDE/OS files

---

## Dependency Graph

### Frontend Dependencies
```
React (UI framework)
├── react-dom (DOM rendering)
└── TypeScript (type system)

Tailwind CSS (styling)
├── autoprefixer (CSS compatibility)
└── postcss (CSS processing)

Vite (build tool)
└── @vitejs/plugin-react (React support)

Lucide React (icons)
```

### Backend Dependencies
```
FastAPI (web framework)
├── Pydantic (validation)
└── Uvicorn (server)
```

---

## Quick Navigation Guide

### "I want to..."

**Modify the UI layout**
→ `src/App.tsx`

**Change slider appearance**
→ `src/index.css` (thumb styling)
→ `src/components/InputSlider.tsx` (structure)

**Adjust input ranges**
→ `src/config/inputConfig.ts`

**Change recommendation thresholds**
→ `backend/main.py` (`get_recommendation` function)

**Modify regression formula**
→ `backend/main.py` (`calculate_readiness_score` function)

**Add new API endpoint**
→ `backend/main.py` (add route with `@app.get/post`)

**Change colors**
→ `tailwind.config.js` (extend theme)
→ Component files (Tailwind classes)

**Add new component**
→ Create in `src/components/`
→ Import in `src/App.tsx`

**Update documentation**
→ `README.md` (main docs)
→ `ARCHITECTURE.md` (technical details)
→ `SCREENSHOTS.md` (visual design)

---

## Summary

This project follows a clean, modular architecture with clear separation between frontend, backend, and documentation. Each file has a single, well-defined purpose, making the codebase easy to navigate, understand, and extend.

Total project size: ~3,600+ lines of code and documentation, organized into 30+ files across a logical directory structure suitable for both academic evaluation and potential production deployment.
