<<<<<<< HEAD
# Sleep-Based Training Readiness and Recovery Recommendation System

**MSc Research Project: Operationalizing Sleep Quality Analysis for Amateur Powerlifters**

A production-ready, full-stack web application that translates empirical research into a real-time decision-support system for training readiness assessment.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [System Architecture](#system-architecture)
- [Research Foundation](#research-foundation)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Frontend Components](#frontend-components)
- [Model Explanation](#model-explanation)
- [Limitations and Future Work](#limitations-and-future-work)
- [MSc Submission Notes](#msc-submission-notes)

---

## 🎯 Project Overview

This system implements a statistically validated linear regression model to assess training readiness in amateur powerlifters based on:

- **Sleep Quality** (1-5 scale)
- **Fatigue Level** (1-10 scale)
- **Stress Level** (1-5 scale)
- **Caffeine Intake** (0-3 scale)

The application provides actionable, evidence-based training recommendations to optimize performance while minimizing injury risk.

### Key Features

- Real-time readiness calculation
- Color-coded visual feedback (Green/Yellow/Red)
- Responsive design (mobile, tablet, desktop)
- RESTful API architecture
- Interpretable, research-backed recommendations
- Stateless computation (no database required)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                       │
│                     (React + Tailwind CSS)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Input Sliders │  │  Calculate   │  │  Readiness   │     │
│  │  Component   │→ │    Button    │→ │   Display    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP POST /predict
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER (FastAPI)                    │
│  ┌────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Input        │→ │   Regression    │→ │  Response   │ │
│  │  Validation    │  │     Model       │  │  Generator  │ │
│  └────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
              Research-Validated Formula:
    Readiness = 5.65 + (0.75×Sleep) - (0.44×Fatigue)
                     - (0.17×Stress) + (0.13×Caffeine)
```

### Data Flow

1. **User Input**: User adjusts sliders for sleep quality, fatigue, stress, and caffeine intake
2. **API Request**: Frontend sends POST request to `/predict` endpoint with JSON payload
3. **Model Calculation**: Backend applies validated regression formula
4. **Recommendation Logic**: Score is mapped to training recommendation
5. **Response**: JSON response with score, recommendation, and interpretation
6. **Display**: Frontend renders color-coded readiness display with actionable guidance

---

## 🔬 Research Foundation

### Empirical Model

The system is based on a linear regression model derived from analyzing the relationship between recovery metrics and training readiness in amateur powerlifters.

**Regression Equation:**
```
Readiness Score = 5.65 + (0.75 × Sleep Quality)
                       − (0.44 × Fatigue Level)
                       − (0.17 × Stress Level)
                       + (0.13 × Caffeine Intake)
```

### Coefficient Interpretation

| Predictor | Coefficient | Interpretation |
|-----------|-------------|----------------|
| **Sleep Quality** | +0.75 | Strongest positive predictor; 1-point improvement increases readiness by 0.75 |
| **Fatigue Level** | -0.44 | Strong negative predictor; higher fatigue significantly reduces readiness |
| **Stress Level** | -0.17 | Moderate negative predictor; elevated stress decreases readiness |
| **Caffeine Intake** | +0.13 | Small positive predictor; moderate caffeine may enhance readiness |

### Evidence-Based Thresholds

| Readiness Score | Recommendation | Rationale |
|-----------------|----------------|-----------|
| **≥ 7.0** | Train Normally | Optimal recovery; proceed with planned training |
| **5.0 - 6.9** | Light Training | Moderate readiness; reduce intensity by 20-30% |
| **< 5.0** | Rest / Recovery | Poor readiness; prioritize recovery to prevent overtraining |

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tooling
- **Lucide React** - Icon library

### Backend
- **FastAPI** - High-performance Python web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server
- **Python 3.8+** - Core language

### Architecture Principles
- **Stateless API**: No database, pure computation
- **REST**: Standard HTTP methods
- **CORS-enabled**: Cross-origin resource sharing
- **Type-safe**: End-to-end type safety

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+
- **pip** (Python package manager)

### Installation

#### 1. Clone/Extract Project

```bash
cd training-readiness-system
```

#### 2. Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### 3. Frontend Setup

```bash
# From project root
npm install

# Create environment file (optional)
cp .env.example .env
```

### Running the Application

#### Terminal 1: Start Backend (Port 8000)

```bash
cd backend
python main.py
```

Expected output:
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
```

#### Terminal 2: Start Frontend (Port 5173)

```bash
npm run dev
```

Expected output:
```
  VITE ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

#### Access Application

Open browser to: **http://localhost:5173**

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000
```

### Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```json
{
  "status": "operational",
  "message": "Training Readiness API - MSc Research Project",
  "version": "1.0.0"
}
```

#### 2. Detailed Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "Training Readiness API",
  "model_version": "1.0.0",
  "endpoints": ["/", "/predict", "/health"]
}
```

#### 3. Predict Readiness
```http
POST /predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "sleep_quality": 4.0,
  "fatigue_level": 3.0,
  "stress_level": 2.0,
  "caffeine_intake": 1.0
}
```

**Validation Rules:**
- `sleep_quality`: 1.0 - 5.0
- `fatigue_level`: 1.0 - 10.0
- `stress_level`: 1.0 - 5.0
- `caffeine_intake`: 0.0 - 3.0

**Response (200 OK):**
```json
{
  "readiness_score": 7.32,
  "recommendation": "Train Normally",
  "recommendation_category": "ready",
  "interpretation": "Your body is well-recovered and ready for a normal training session. Proceed with your planned workout intensity and volume."
}
```

**Error Response (422 Validation Error):**
```json
{
  "detail": [
    {
      "loc": ["body", "sleep_quality"],
      "msg": "ensure this value is greater than or equal to 1",
      "type": "value_error.number.not_ge"
    }
  ]
}
```

### Testing the API

Use the provided test script:

```bash
cd backend
pip install requests  # if not already installed
python test_api.py
```

---

## 🎨 Frontend Components

### Component Architecture

```
src/
├── components/
│   ├── Header.tsx              # Application header with branding
│   ├── Footer.tsx              # Footer with research information
│   ├── InputSlider.tsx         # Reusable slider component
│   ├── ReadinessDisplay.tsx    # Results display with color coding
│   └── ErrorDisplay.tsx        # Error message component
├── config/
│   └── inputConfig.ts          # Slider configurations
├── services/
│   └── api.ts                  # API client and error handling
├── types/
│   └── index.ts                # TypeScript type definitions
├── App.tsx                     # Main application component
└── main.tsx                    # Application entry point
```

### Key Components

#### InputSlider
- Renders customizable range input
- Displays current value with unit
- Provides contextual descriptions
- Supports touch and mouse interaction

#### ReadinessDisplay
- Shows numerical readiness score
- Animated progress bar
- Color-coded recommendation card
- Detailed interpretation text

#### Error Handling
- Network error detection
- API error display
- User-friendly messages
- Dismissible notifications

### Responsive Design

- **Mobile** (< 640px): Single column, stacked layout
- **Tablet** (640px - 1024px): Optimized spacing
- **Desktop** (> 1024px): Two-column grid layout

---

## 🧮 Model Explanation

### Regression Formula Implementation

```python
def calculate_readiness_score(
    sleep_quality: float,
    fatigue_level: float,
    stress_level: float,
    caffeine_intake: float
) -> float:
    score = (
        5.65                          # Intercept
        + (0.75 * sleep_quality)      # Positive: better sleep → higher readiness
        - (0.44 * fatigue_level)      # Negative: more fatigue → lower readiness
        - (0.17 * stress_level)       # Negative: more stress → lower readiness
        + (0.13 * caffeine_intake)    # Positive: moderate caffeine → slight boost
    )
    return round(score, 2)
```

### Recommendation Logic

```python
def get_recommendation(readiness_score: float) -> str:
    if readiness_score >= 7:
        return "Train Normally"
    elif readiness_score >= 5:
        return "Light Training"
    else:
        return "Rest / Active Recovery"
```

### Example Calculations

#### Well-Rested Athlete
```
Input:  Sleep=5, Fatigue=2, Stress=2, Caffeine=1
Score:  5.65 + (0.75×5) - (0.44×2) - (0.17×2) + (0.13×1)
      = 5.65 + 3.75 - 0.88 - 0.34 + 0.13
      = 8.31
Result: "Train Normally" ✅
```

#### Fatigued Athlete
```
Input:  Sleep=3, Fatigue=8, Stress=4, Caffeine=2
Score:  5.65 + (0.75×3) - (0.44×8) - (0.17×4) + (0.13×2)
      = 5.65 + 2.25 - 3.52 - 0.68 + 0.26
      = 3.96
Result: "Rest / Active Recovery" ⚠️
```

---

## ⚠️ Limitations and Future Work

### Current Limitations

1. **Model Scope**: Validated for amateur powerlifters only; may not generalize to other populations
2. **Input Subjectivity**: Relies on self-reported metrics which may vary in accuracy
3. **Static Thresholds**: Fixed cutoffs don't account for individual variability
4. **Limited Context**: Doesn't consider training history, injuries, or periodization phase
5. **No Persistence**: Stateless design means no historical tracking or trend analysis

### Future Extensions

#### Near-Term Enhancements
- **Historical Tracking**: Add database to store readiness over time
- **Trend Visualization**: Charts showing readiness patterns
- **Personalized Thresholds**: Machine learning to adapt recommendations per user
- **Mobile Application**: Native iOS/Android apps

#### Advanced Features
- **Wearable Integration**: Import sleep data from fitness trackers
- **Training Load Monitoring**: Consider recent training volume/intensity
- **Injury Risk Prediction**: Additional predictors for injury likelihood
- **Periodization Support**: Adjust recommendations based on training phase
- **Multi-User Management**: Coach dashboards for team monitoring

#### Research Extensions
- **Model Refinement**: Larger sample sizes, additional predictors
- **External Validation**: Test model on different populations
- **Longitudinal Studies**: Track outcomes over extended periods
- **A/B Testing**: Compare recommendation adherence and outcomes

---

## 🎓 MSc Submission Notes

### Project Suitability

This application demonstrates:

1. **Research Translation**: Converting empirical findings into practical software
2. **Full-Stack Development**: End-to-end system design and implementation
3. **Industry Standards**: Production-ready code, documentation, testing
4. **Evidence-Based Design**: All features grounded in research methodology
5. **User-Centered Approach**: Intuitive interface for non-technical users

### Viva Defense Talking Points

#### Technical Excellence
- Clean architecture with clear separation of concerns
- Type-safe development with TypeScript and Pydantic
- Comprehensive error handling and validation
- Responsive design following modern best practices

#### Research Integration
- Direct implementation of validated regression model
- Evidence-based threshold selection
- Interpretable recommendations linked to research findings
- Clear documentation of model assumptions and limitations

#### Practical Impact
- Addresses real need in amateur powerlifting community
- Immediate usability without complex setup
- Actionable recommendations to reduce injury risk
- Foundation for future research and development

### Reproducibility

All code is self-contained and reproducible:
- No external dependencies beyond specified packages
- Deterministic model (no randomness)
- Clear installation and execution instructions
- Example test cases provided

---

## 📸 Expected UI Screenshots

### Desktop View
- **Left Panel**: Input sliders for all four metrics with descriptions
- **Right Panel**: Large readiness score, progress bar, and recommendation card
- **Header**: Application title with dumbbell icon
- **Footer**: Research attribution and formula display

### Mobile View
- **Stacked Layout**: Input section above results section
- **Touch-Optimized**: Large slider thumbs and buttons
- **Scrollable**: Full content accessible via vertical scroll

### Color States
- **Green**: Readiness ≥ 7 (ready to train)
- **Yellow**: Readiness 5-7 (caution, light training)
- **Red**: Readiness < 5 (rest recommended)

---

## 📝 License

This project is submitted as part of an MSc research project. For academic and educational use.

---

## 👤 Contact

For questions regarding this implementation or the underlying research, please contact the project author through your academic institution.

---

## 🙏 Acknowledgments

- Research participants who contributed data for model validation
- Academic supervisors for guidance and feedback
- Open-source community for excellent tools and libraries

---

**Built with academic rigor and industry standards for MSc evaluation and practical deployment.**
=======
# sleep-readiness-system
Full-stack decision-support system developed as part of an MSc research project investigating the influence of sleep quality on training readiness and recovery in amateur powerlifters.
>>>>>>> 80c703ff8e360b419acc1a1d18ad97f87b270aeb
