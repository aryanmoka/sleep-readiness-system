# Training Readiness API - Backend

FastAPI-based REST API for calculating training readiness scores based on empirically validated regression model.

---

## Quick Start

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Server

```bash
python main.py
```

Server starts on: `http://localhost:8000`

### Test API

```bash
python test_api.py
```

---

## API Endpoints

### POST /predict

Calculate training readiness score.

**Request:**
```json
{
  "sleep_quality": 4.0,
  "fatigue_level": 3.0,
  "stress_level": 2.0,
  "caffeine_intake": 1.0
}
```

**Response:**
```json
{
  "readiness_score": 7.32,
  "recommendation": "Train Normally",
  "recommendation_category": "ready",
  "interpretation": "Your body is well-recovered..."
}
```

---

## Model Documentation

### Regression Formula

```python
Readiness = 5.65 + (0.75 × Sleep) - (0.44 × Fatigue)
                 - (0.17 × Stress) + (0.13 × Caffeine)
```

### Recommendation Thresholds

- **≥ 7.0**: Train Normally
- **5.0-6.9**: Light Training
- **< 5.0**: Rest / Active Recovery

---

## Development

### File Structure

```
backend/
├── main.py              # FastAPI application and model logic
├── requirements.txt     # Python dependencies
├── test_api.py         # API test script
└── README.md           # This file
```

### Code Quality

- Type hints throughout
- Pydantic validation
- Comprehensive docstrings
- Error handling

### Testing

Run test script with various scenarios:

```bash
python test_api.py
```

Tests cover:
1. Well-rested athlete (high readiness)
2. Moderately fatigued (medium readiness)
3. Poorly recovered (low readiness)
4. Average readiness

---

## Deployment

### Production Considerations

1. **Environment Variables**: Configure host/port via environment
2. **CORS**: Update allowed origins for production domain
3. **Rate Limiting**: Add rate limiting middleware
4. **Monitoring**: Integrate logging and health checks
5. **HTTPS**: Deploy behind reverse proxy with SSL

### Example Production Command

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## API Documentation

FastAPI provides automatic interactive documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

---

## License

Part of MSc research project - Academic use.
