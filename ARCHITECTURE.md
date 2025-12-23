# System Architecture Documentation

## Overview

This document provides a detailed technical architecture overview of the Training Readiness System, explaining design decisions, data flow, and component interactions.

---

## Architecture Pattern

The system follows a **Client-Server Architecture** with clear separation between:

1. **Presentation Layer** (React Frontend)
2. **API Layer** (FastAPI Backend)
3. **Business Logic** (Regression Model)

### Key Design Principles

- **Separation of Concerns**: Each layer has distinct responsibilities
- **Stateless Architecture**: No session management or database
- **Type Safety**: End-to-end type checking (TypeScript + Pydantic)
- **Single Responsibility**: Each component has one clear purpose
- **Open/Closed**: Easy to extend without modifying core logic

---

## System Components

### 1. Frontend Architecture (React + TypeScript)

#### Component Hierarchy

```
App (Root)
├── Header
├── Main Content
│   ├── Input Section
│   │   ├── InputSlider (×4)
│   │   └── Calculate Button
│   └── Results Section
│       ├── ErrorDisplay (conditional)
│       └── ReadinessDisplay (conditional)
└── Footer
```

#### State Management

**Local State (useState):**
- `inputs`: Current slider values
- `result`: API response data
- `loading`: Request in progress
- `error`: Error message if request fails

**No Global State**: Application is simple enough that prop drilling is sufficient.

#### Data Flow

```
User Interaction → State Update → Re-render → User Sees Change
                ↓
            (On Calculate Button)
                ↓
            API Request → Loading State → Response → Update Results State
```

#### Type Safety

```typescript
// Shared types between components
interface TrainingInput {
  sleep_quality: number;
  fatigue_level: number;
  stress_level: number;
  caffeine_intake: number;
}

interface TrainingOutput {
  readiness_score: number;
  recommendation: "Train Normally" | "Light Training" | "Rest / Active Recovery";
  recommendation_category: "ready" | "caution" | "rest";
  interpretation: string;
}
```

### 2. Backend Architecture (FastAPI + Python)

#### Request Flow

```
HTTP Request → CORS Middleware → FastAPI Router → Pydantic Validation
                                                  ↓
JSON Response ← Response Model ← Recommendation Logic ← Model Calculation
```

#### Core Functions

**1. Input Validation (`TrainingInput` Pydantic Model)**
```python
class TrainingInput(BaseModel):
    sleep_quality: float = Field(..., ge=1, le=5)
    fatigue_level: float = Field(..., ge=1, le=10)
    stress_level: float = Field(..., ge=1, le=5)
    caffeine_intake: float = Field(..., ge=0, le=3)
```

**2. Model Calculation**
```python
def calculate_readiness_score(...) -> float:
    # Pure function: no side effects
    # Deterministic: same inputs → same outputs
    return 5.65 + (0.75 * sleep) - (0.44 * fatigue) - ...
```

**3. Recommendation Logic**
```python
def get_recommendation(score: float) -> tuple:
    # Maps continuous score to discrete recommendation
    # Returns: (recommendation, category, interpretation)
```

**4. Response Generation (`TrainingOutput` Pydantic Model)**
```python
class TrainingOutput(BaseModel):
    readiness_score: float
    recommendation: Literal["Train Normally", "Light Training", ...]
    recommendation_category: Literal["ready", "caution", "rest"]
    interpretation: str
```

#### Error Handling

```python
try:
    # Calculate readiness
    score = calculate_readiness_score(...)
    recommendation = get_recommendation(score)
    return TrainingOutput(...)
except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))
```

### 3. API Communication Layer

#### API Service (Frontend)

```typescript
// services/api.ts
export async function predictReadiness(input: TrainingInput): Promise<TrainingOutput> {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new ApiError(...);
    }

    return await response.json();
  } catch (error) {
    // Network errors, API errors, etc.
    throw new ApiError(...);
  }
}
```

#### Error Taxonomy

1. **Network Errors**: Cannot reach backend (server not running)
2. **Validation Errors**: Invalid input values (422)
3. **Server Errors**: Backend calculation failures (500)
4. **Unknown Errors**: Unexpected issues

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ USER                                                        │
└────────────┬────────────────────────────────────────────────┘
             │
             │ 1. Adjusts sliders
             ▼
┌─────────────────────────────────────────────────────────────┐
│ React State (inputs)                                        │
│ { sleep: 4, fatigue: 3, stress: 2, caffeine: 1 }          │
└────────────┬────────────────────────────────────────────────┘
             │
             │ 2. Clicks "Calculate"
             ▼
┌─────────────────────────────────────────────────────────────┐
│ API Service (predictReadiness)                             │
│ - Sets loading state                                       │
│ - Sends POST request                                       │
└────────────┬────────────────────────────────────────────────┘
             │
             │ 3. HTTP POST /predict
             ▼
┌─────────────────────────────────────────────────────────────┐
│ FastAPI Backend                                            │
│ - Validates input (Pydantic)                               │
│ - Calculates score: 5.65 + 0.75×4 - 0.44×3 - 0.17×2 + ... │
│ - Determines recommendation: 7.32 → "Train Normally"       │
└────────────┬────────────────────────────────────────────────┘
             │
             │ 4. JSON Response
             ▼
┌─────────────────────────────────────────────────────────────┐
│ API Service                                                │
│ - Parses response                                          │
│ - Updates result state                                     │
│ - Clears loading state                                     │
└────────────┬────────────────────────────────────────────────┘
             │
             │ 5. Re-render
             ▼
┌─────────────────────────────────────────────────────────────┐
│ ReadinessDisplay Component                                 │
│ - Shows score: 7.32                                        │
│ - Shows recommendation: "Train Normally"                   │
│ - Applies green styling (ready category)                   │
│ - Displays interpretation text                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

### Why FastAPI?

1. **Performance**: ASGI-based, async support
2. **Validation**: Automatic with Pydantic
3. **Documentation**: Auto-generated OpenAPI docs
4. **Type Safety**: Python type hints
5. **Developer Experience**: Excellent error messages

### Why React?

1. **Component Reusability**: InputSlider used 4 times
2. **State Management**: Simple useState for this scope
3. **Ecosystem**: Large community, excellent tooling
4. **Performance**: Virtual DOM for efficient updates

### Why No Database?

1. **Simplicity**: Reduces deployment complexity
2. **Stateless**: Each request is independent
3. **Performance**: No I/O bottleneck
4. **Research Scope**: Focus on model, not persistence
5. **Easy Extension**: Can add database later without changing API contract

### Why TypeScript?

1. **Type Safety**: Catch errors at compile time
2. **Autocomplete**: Better developer experience
3. **Refactoring**: Safer code changes
4. **Documentation**: Types serve as inline docs

---

## Security Considerations

### Input Validation

**Frontend**: Client-side validation for UX
```typescript
min={1} max={5} step={0.5}
```

**Backend**: Server-side validation for security
```python
Field(..., ge=1, le=5)  # Reject invalid inputs
```

### CORS Configuration

```python
allow_origins=["*"]  # Development: Allow all
# Production: Restrict to specific domains
# allow_origins=["https://yourdomain.com"]
```

### No Authentication Required

- Public tool for research demonstration
- No sensitive data collected
- No user accounts or personal information

---

## Performance Characteristics

### Response Times

- **Model Calculation**: < 1ms (pure math)
- **API Overhead**: < 10ms (validation, serialization)
- **Network Latency**: Depends on deployment
- **Total**: Typically < 100ms for local development

### Scalability

**Current Capacity**: Single server can handle:
- ~1000 requests/second (calculation is trivial)
- Bottleneck would be network/serialization, not computation

**Horizontal Scaling**: Stateless design means:
- Add more backend instances behind load balancer
- No session management or state synchronization needed

---

## Testing Strategy

### Backend Testing

```python
# test_api.py provides integration tests
# Test cases:
1. Well-rested athlete → "Train Normally"
2. Moderately fatigued → "Light Training"
3. Poorly recovered → "Rest"
4. Edge cases (min/max values)
```

### Frontend Testing (Recommended)

```typescript
// Unit tests for components
- InputSlider: renders correctly, calls onChange
- ReadinessDisplay: shows correct colors per category
- API service: handles errors correctly

// Integration tests
- Full user flow: input → calculate → display
- Error scenarios: network failure, invalid response
```

---

## Deployment Architecture

### Development

```
Localhost:5173 (Frontend) → Localhost:8000 (Backend)
```

### Production (Recommended)

```
┌──────────────┐
│  Cloudflare  │  (CDN + DDoS protection)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Nginx       │  (Reverse proxy + SSL)
└──────┬───────┘
       │
       ├─────→ Static Frontend (React build)
       │
       └─────→ Backend API (Uvicorn workers)
```

### Environment Configuration

**Frontend (.env):**
```
VITE_API_URL=https://api.yourdomain.com
```

**Backend:**
```python
# Configure via environment variables or config file
HOST = os.getenv("API_HOST", "0.0.0.0")
PORT = int(os.getenv("API_PORT", 8000))
```

---

## Monitoring and Observability

### Health Checks

```python
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Training Readiness API",
        "model_version": "1.0.0"
    }
```

### Logging (Recommended Addition)

```python
import logging

logger = logging.getLogger(__name__)

@app.post("/predict")
def predict_readiness(input_data: TrainingInput):
    logger.info(f"Prediction request: {input_data}")
    result = calculate_readiness_score(...)
    logger.info(f"Prediction result: {result}")
    return result
```

### Metrics (Future)

- Request count
- Response time distribution
- Error rate
- Readiness score distribution

---

## Future Architecture Enhancements

### Phase 1: Add Persistence

```
Frontend → API → Model
              ↓
           Database (PostgreSQL)
           - User accounts
           - Historical readiness data
           - Training logs
```

### Phase 2: Add Authentication

```
Frontend → Auth Service (OAuth2) → API → Model
```

### Phase 3: Real-time Features

```
Frontend ← WebSocket ← API ← Model
         ↑                      ↓
    Wearable API          Live Monitoring
```

---

## Conclusion

The architecture is designed for:

1. **Clarity**: Easy to understand and maintain
2. **Extensibility**: Simple to add features
3. **Performance**: Fast and scalable
4. **Reliability**: Robust error handling
5. **Research**: Focus on model validation

This foundation supports both academic demonstration and potential production deployment.
