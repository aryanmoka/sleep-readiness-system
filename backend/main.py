from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
from typing import Literal
import uvicorn

app = FastAPI(
    title="Training Readiness API",
    description="Sleep-Based Training Readiness and Recovery Recommendation System for Amateur Powerlifters",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TrainingInput(BaseModel):
    sleep_quality: float = Field(..., ge=1, le=5, description="Sleep quality rating (1-5)")
    fatigue_level: float = Field(..., ge=1, le=10, description="Fatigue level (1-10)")
    stress_level: float = Field(..., ge=1, le=5, description="Stress level (1-5)")
    caffeine_intake: float = Field(..., ge=0, le=3, description="Caffeine intake scale (0-3)")

    @field_validator('sleep_quality', 'fatigue_level', 'stress_level', 'caffeine_intake')
    @classmethod
    def validate_ranges(cls, v, info):
        field_name = info.field_name
        ranges = {
            'sleep_quality': (1, 5),
            'fatigue_level': (1, 10),
            'stress_level': (1, 5),
            'caffeine_intake': (0, 3)
        }
        min_val, max_val = ranges[field_name]
        if not min_val <= v <= max_val:
            raise ValueError(f"{field_name} must be between {min_val} and {max_val}")
        return v


class TrainingOutput(BaseModel):
    readiness_score: float = Field(..., description="Calculated training readiness score")
    recommendation: Literal["Train Normally", "Light Training", "Rest / Active Recovery"]
    recommendation_category: Literal["ready", "caution", "rest"]
    interpretation: str


def calculate_readiness_score(
    sleep_quality: float,
    fatigue_level: float,
    stress_level: float,
    caffeine_intake: float
) -> float:
    """
    Calculate training readiness score using empirically validated regression model.

    Research-backed formula:
    Readiness Score = 5.65 + (0.75 × Sleep Quality) − (0.44 × Fatigue Level)
                      − (0.17 × Stress Level) + (0.13 × Caffeine Intake)

    This model was derived from statistical analysis of the relationship between
    sleep quality, fatigue, stress, and training readiness in amateur powerlifters.
    """
    score = (
        5.65
        + (0.75 * sleep_quality)
        - (0.44 * fatigue_level)
        - (0.17 * stress_level)
        + (0.13 * caffeine_intake)
    )
    return round(score, 2)


def get_recommendation(readiness_score: float) -> tuple[str, str, str]:
    """
    Generate training recommendation based on readiness score.

    Evidence-based thresholds:
    - Score ≥ 7: Optimal readiness for normal training
    - 5 ≤ Score < 7: Moderate readiness, light training recommended
    - Score < 5: Poor readiness, rest/recovery needed

    Returns:
        tuple: (recommendation, category, interpretation)
    """
    if readiness_score >= 7:
        return (
            "Train Normally",
            "ready",
            "Your body is well-recovered and ready for a normal training session. "
            "Proceed with your planned workout intensity and volume."
        )
    elif readiness_score >= 5:
        return (
            "Light Training",
            "caution",
            "Your readiness is moderate. Consider reducing training intensity by 20-30% "
            "or focusing on technique work. Avoid personal records or high-volume sessions."
        )
    else:
        return (
            "Rest / Active Recovery",
            "rest",
            "Your body shows signs of inadequate recovery. Prioritize rest, sleep, and stress "
            "management. Consider light mobility work, stretching, or a rest day."
        )


@app.get("/")
def read_root():
    """Health check endpoint."""
    return {
        "status": "operational",
        "message": "Training Readiness API - MSc Research Project",
        "version": "1.0.0"
    }


@app.post("/predict", response_model=TrainingOutput)
def predict_readiness(input_data: TrainingInput):
    """
    Predict training readiness and generate recommendation.

    This endpoint implements the core research model, calculating a readiness score
    based on validated predictors and returning actionable training recommendations.
    """
    try:
        readiness_score = calculate_readiness_score(
            sleep_quality=input_data.sleep_quality,
            fatigue_level=input_data.fatigue_level,
            stress_level=input_data.stress_level,
            caffeine_intake=input_data.caffeine_intake
        )

        recommendation, category, interpretation = get_recommendation(readiness_score)

        return TrainingOutput(
            readiness_score=readiness_score,
            recommendation=recommendation,
            recommendation_category=category,
            interpretation=interpretation
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating readiness: {str(e)}")


@app.get("/health")
def health_check():
    """Detailed health check for monitoring."""
    return {
        "status": "healthy",
        "service": "Training Readiness API",
        "model_version": "1.0.0",
        "endpoints": ["/", "/predict", "/health"]
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
