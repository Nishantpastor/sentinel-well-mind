from pathlib import Path
from typing import Any, List, Optional

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field

MODEL_DIR = Path(__file__).resolve().parents[1] / "models"
BASE_FEATURES = [
    "consecutive_duty_days",
    "night_shifts_last_30d",
    "deployment_duration_days",
    "leave_rejected_count",
    "transfer_frequency_2y",
    "duty_hours_weekly",
    "avg_sleep_hours",
    "self_reported_fatigue_1_5",
]
DERIVED_FEATURES = ["sleep_deprivation_index", "burnout_velocity"]
MODEL_FEATURES = BASE_FEATURES + DERIVED_FEATURES + ["anomaly_score"]
RISK_LEVELS = {0: "LOW", 1: "MODERATE", 2: "HIGH", 3: "CRITICAL"}

isolation_forest = joblib.load(MODEL_DIR / "sentinelwell_isolation_forest.pkl")
lightgbm_model = joblib.load(MODEL_DIR / "sentinelwell_lightgbm.pkl")
shap_explainer = joblib.load(MODEL_DIR / "sentinelwell_shap_explainer.pkl")

app = FastAPI(
    title="SentinelWell AI Risk Prediction Engine",
    description="Explainable Personnel Stress & Welfare Risk Scoring ML API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ModelPredictionInput(BaseModel):
    model_config = ConfigDict(extra="forbid")

    consecutive_duty_days: float = Field(default=14, ge=0)
    night_shifts_last_30d: float = Field(default=8, ge=0)
    deployment_duration_days: float = Field(default=120, ge=0)
    leave_rejected_count: float = Field(default=2, ge=0)
    transfer_frequency_2y: float = Field(default=3, ge=0)
    duty_hours_weekly: float = Field(default=65, ge=0)
    avg_sleep_hours: float = Field(default=5.5, gt=0)
    self_reported_fatigue_1_5: float = Field(default=4, ge=1, le=5)


class LegacyRiskPredictionInput(BaseModel):
    dutyHours: float = Field(default=210.0, ge=0)
    nightShifts: int = Field(default=15, ge=0)
    deploymentDays: int = Field(default=120, ge=0)
    leaveDays: int = Field(default=3, ge=0)
    trainingLoad: int = Field(default=3, ge=0)
    stressScore: int = Field(default=6, ge=1, le=10)
    sleepScore: int = Field(default=3, ge=1, le=5)
    energyScore: int = Field(default=3, ge=1, le=5)
    workloadScore: int = Field(default=4, ge=1, le=5)
    previousScore: Optional[int] = Field(default=None, ge=0, le=100)


class RiskFactorItem(BaseModel):
    label: str
    value: int = Field(ge=0, le=100)


class ModelPredictionOutput(BaseModel):
    risk_level: str
    risk_score: int = Field(ge=0, le=100)
    probabilities: List[float]
    primary_trigger_indicators: List[str]


class LegacyRiskPredictionOutput(BaseModel):
    riskScore: int
    riskLevel: str
    trend: str
    factors: List[RiskFactorItem]
    explanation: str
    modelVersion: str


def build_model_features(data: ModelPredictionInput) -> pd.DataFrame:
    values = np.array([[getattr(data, name) for name in BASE_FEATURES]], dtype=float)
    derived = np.column_stack(
        [
            values[:, 0] / values[:, 6],
            values[:, 5] * values[:, 7],
        ]
    )
    isolation_input = pd.DataFrame(
        np.column_stack([values, derived]),
        columns=BASE_FEATURES + DERIVED_FEATURES,
    )
    anomaly = -np.asarray(isolation_forest.decision_function(isolation_input), dtype=float).reshape(-1, 1)
    return pd.DataFrame(
        np.column_stack([values, derived, anomaly]),
        columns=MODEL_FEATURES,
    )


def explain_prediction(features: pd.DataFrame, predicted_class: int) -> List[str]:
    shap_values = np.asarray(shap_explainer.shap_values(features))
    if shap_values.ndim == 3:
        impacts = np.abs(shap_values[0, :, predicted_class])
    elif shap_values.ndim == 2:
        impacts = np.abs(shap_values[0])
    else:
        impacts = np.abs(shap_values).reshape(-1)
    ranked = np.argsort(impacts)[::-1]
    return [MODEL_FEATURES[index] for index in ranked[:3]]


def run_prediction(data: ModelPredictionInput) -> dict[str, Any]:
    features = build_model_features(data)
    probabilities = np.asarray(lightgbm_model.predict_proba(features), dtype=float)[0]
    predicted_class = int(np.argmax(probabilities))
    score = int(round(float(np.dot(probabilities, np.array([0, 33.3333, 66.6667, 100])))))
    return {
        "risk_level": RISK_LEVELS[predicted_class],
        "risk_score": score,
        "probabilities": [round(float(value), 6) for value in probabilities],
        "primary_trigger_indicators": explain_prediction(features, predicted_class),
    }


def legacy_to_model_input(data: LegacyRiskPredictionInput) -> ModelPredictionInput:
    return ModelPredictionInput(
        consecutive_duty_days=data.deploymentDays,
        night_shifts_last_30d=data.nightShifts,
        deployment_duration_days=data.deploymentDays,
        leave_rejected_count=max(0, 15 - data.leaveDays),
        transfer_frequency_2y=0,
        duty_hours_weekly=data.dutyHours / 4.33,
        avg_sleep_hours=3 + data.sleepScore,
        self_reported_fatigue_1_5=max(1, min(5, 6 - data.energyScore)),
    )


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "sentinelwell-ml-engine", "version": "1.0.0"}


@app.post("/predict", response_model=ModelPredictionOutput)
def predict(data: ModelPredictionInput):
    return run_prediction(data)


@app.post("/predict-risk", response_model=LegacyRiskPredictionOutput)
def predict_risk(data: LegacyRiskPredictionInput):
    result = run_prediction(legacy_to_model_input(data))
    previous = data.previousScore if data.previousScore is not None else result["risk_score"]
    difference = result["risk_score"] - previous
    trend = "Increasing" if difference > 2 else "Decreasing" if difference < -2 else "Stable"
    factors = [
        RiskFactorItem(label=indicator.replace("_", " ").title(), value=round(probability * 100))
        for indicator, probability in zip(result["primary_trigger_indicators"], result["probabilities"][:3])
    ]
    return LegacyRiskPredictionOutput(
        riskScore=result["risk_score"],
        riskLevel=result["risk_level"],
        trend=trend,
        factors=factors,
        explanation=(
            f"Model analysis indicates {result['risk_level'].lower()} welfare risk "
            f"(score {result['risk_score']}) with primary indicators: "
            f"{', '.join(result['primary_trigger_indicators'])}."
        ),
        modelVersion="sentinelwell-trained-models-v1",
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
