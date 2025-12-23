# Quick Start Guide

Get the Training Readiness System running in 5 minutes.

---

## Prerequisites

Install these first:
- **Node.js** 18+ ([download](https://nodejs.org/))
- **Python** 3.8+ ([download](https://www.python.org/))

---

## Setup (One-Time)

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

---

## Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python main.py
```

✅ Backend running at: **http://localhost:8000**

### Start Frontend (Terminal 2)

```bash
npm run dev
```

✅ Frontend running at: **http://localhost:5173**

### Open Application

Visit: **http://localhost:5173** in your browser

---

## Using the Application

1. **Adjust Sliders**
   - Sleep Quality (1-5)
   - Fatigue Level (1-10)
   - Stress Level (1-5)
   - Caffeine Intake (0-3)

2. **Click "Calculate Readiness"**

3. **View Results**
   - Readiness score (0-10)
   - Training recommendation
   - Color-coded guidance

---

## Testing the Backend API

With backend running:

```bash
cd backend
python test_api.py
```

---

## Troubleshooting

### Frontend won't start
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Backend won't start
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

### "Cannot connect to API" error
- Ensure backend is running on port 8000
- Check backend terminal for errors
- Verify: http://localhost:8000/health in browser

### Port already in use
```bash
# Change backend port in main.py (last line):
uvicorn.run(app, host="0.0.0.0", port=8001)  # Use different port

# Update frontend .env:
VITE_API_URL=http://localhost:8001
```

---

## Production Build

### Build Frontend

```bash
npm run build
```

Output: `dist/` directory

### Serve Production Build

```bash
npm run preview
```

---

## API Endpoints

Test directly in browser or with curl:

### Health Check
```bash
curl http://localhost:8000/health
```

### Calculate Readiness
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "sleep_quality": 4.0,
    "fatigue_level": 3.0,
    "stress_level": 2.0,
    "caffeine_intake": 1.0
  }'
```

---

## Next Steps

- Read [README.md](README.md) for full documentation
- Review [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
- Check [SCREENSHOTS.md](SCREENSHOTS.md) for UI design guide
- See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for code organization

---

## Key Commands Reference

| Task | Command |
|------|---------|
| Install frontend deps | `npm install` |
| Install backend deps | `pip install -r requirements.txt` |
| Start backend | `cd backend && python main.py` |
| Start frontend | `npm run dev` |
| Build for production | `npm run build` |
| Run linter | `npm run lint` |
| Type check | `npm run typecheck` |
| Test API | `cd backend && python test_api.py` |

---

## Common Development Tasks

### Change regression formula
**File**: `backend/main.py`
**Function**: `calculate_readiness_score()`

### Modify recommendation thresholds
**File**: `backend/main.py`
**Function**: `get_recommendation()`

### Update slider ranges
**File**: `src/config/inputConfig.ts`

### Change colors/styling
**Files**: Component files + `src/index.css`

---

## Getting Help

1. **API not responding**: Check `backend/main.py` terminal for errors
2. **UI issues**: Check browser console (F12)
3. **Type errors**: Run `npm run typecheck`
4. **Build fails**: Delete `dist/` and `node_modules/`, reinstall

---

**You're ready to go! Open http://localhost:5173 and start using the Training Readiness System.**
