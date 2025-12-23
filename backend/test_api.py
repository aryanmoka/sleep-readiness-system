import requests
import json

BASE_URL = "http://localhost:8000"


def test_health_check():
    """Test the health check endpoint."""
    response = requests.get(f"{BASE_URL}/health")
    print("Health Check:")
    print(json.dumps(response.json(), indent=2))
    print("\n" + "="*50 + "\n")


def test_prediction(sleep_quality, fatigue_level, stress_level, caffeine_intake):
    """Test the prediction endpoint with given inputs."""
    payload = {
        "sleep_quality": sleep_quality,
        "fatigue_level": fatigue_level,
        "stress_level": stress_level,
        "caffeine_intake": caffeine_intake
    }

    print(f"Testing with inputs:")
    print(json.dumps(payload, indent=2))

    response = requests.post(f"{BASE_URL}/predict", json=payload)

    if response.status_code == 200:
        print("\nPrediction Result:")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"\nError: {response.status_code}")
        print(response.text)

    print("\n" + "="*50 + "\n")


if __name__ == "__main__":
    print("Testing Training Readiness API\n")
    print("="*50 + "\n")

    test_health_check()

    print("Test Case 1: Well-rested athlete (should recommend normal training)")
    test_prediction(
        sleep_quality=5,
        fatigue_level=2,
        stress_level=2,
        caffeine_intake=1
    )

    print("Test Case 2: Moderately fatigued athlete (should recommend light training)")
    test_prediction(
        sleep_quality=3,
        fatigue_level=6,
        stress_level=3,
        caffeine_intake=2
    )

    print("Test Case 3: Poorly recovered athlete (should recommend rest)")
    test_prediction(
        sleep_quality=2,
        fatigue_level=9,
        stress_level=5,
        caffeine_intake=0
    )

    print("Test Case 4: Average readiness")
    test_prediction(
        sleep_quality=3,
        fatigue_level=5,
        stress_level=3,
        caffeine_intake=1
    )
