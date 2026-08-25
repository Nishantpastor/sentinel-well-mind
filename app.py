import json
import os
import time
from pathlib import Path
from typing import Any, Dict, List, Optional

# Disable Gradio Node.js SSR proxy to prevent port binding collisions
os.environ["GRADIO_SSR_MODE"] = "False"

import matplotlib
matplotlib.use("Agg")

try:
    import spaces
    @spaces.GPU
    def zero_gpu_initializer():
        return True
except Exception:
    pass

# Gradio 5.0.0 imports HfFolder, which newer huggingface_hub releases removed.
import huggingface_hub

if not hasattr(huggingface_hub, "HfFolder"):
    class HfFolder:
        @staticmethod
        def get_token():
            return huggingface_hub.get_token()

    huggingface_hub.HfFolder = HfFolder

import gradio as gr
import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict, Field

# Locate models directory
BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "ml-service" / "models"
if not MODEL_DIR.exists():
    MODEL_DIR = BASE_DIR / "models"

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

# Load ML models
isolation_forest = None
lightgbm_model = None
shap_explainer = None

try:
    isolation_forest = joblib.load(MODEL_DIR / "sentinelwell_isolation_forest.pkl")
    lightgbm_model = joblib.load(MODEL_DIR / "sentinelwell_lightgbm.pkl")
    shap_explainer = joblib.load(MODEL_DIR / "sentinelwell_shap_explainer.pkl")
    print("Successfully loaded trained ML models.")
except Exception as e:
    print(f"Warning: Could not load pickle models directly ({e}). Fallback heuristic will be used.")

# Initialize FastAPI App
app = FastAPI(
    title="SentinelWell AI Personnel Stress & Welfare Monitoring System",
    description="Unified API & ML Engine for SentinelWell on Hugging Face",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- IN-MEMORY STATE & SEED DATA -----------------
DEMO_USERS = {
    "P-1024": {"role": "personnel", "displayName": "Personnel Demo", "serviceId": "P-1024"},
    "WO-208": {"role": "welfare", "displayName": "Welfare Officer Demo", "serviceId": "WO-208"},
    "CO-014": {"role": "commander", "displayName": "Commander Demo", "serviceId": "CO-014"},
    "AD-001": {"role": "admin", "displayName": "Administrator Demo", "serviceId": "AD-001"},
}

RAW_PERSONNEL = [
    {
        "id": "P-1024",
        "unit": "Unit A",
        "role": "Section Commander",
        "s": [4, 5, 5, 6, 7, 8],
        "sl": [4, 4, 3, 3, 2, 2],
        "w": [3, 4, 4, 5, 5, 5],
        "d": [188, 196, 210, 224, 238, 252],
        "r": [38, 44, 51, 63, 72, 82],
        "f": [92, 78, 74, 62, 55, 88],
        "indicators": ["Poor sleep", "High workload", "Frequent night shifts"],
        "lastAssessment": "2 days ago",
        "deploymentDays": 148,
        "nightShifts": 19,
        "leaveTaken": 4,
    },
    {
        "id": "P-1031",
        "unit": "Unit C",
        "role": "Constable",
        "s": [5, 6, 6, 7, 8, 8],
        "sl": [3, 3, 3, 2, 2, 2],
        "w": [4, 4, 5, 5, 5, 5],
        "d": [204, 214, 226, 240, 250, 262],
        "r": [46, 52, 60, 71, 79, 86],
        "f": [95, 84, 80, 74, 60, 90],
        "indicators": ["Prolonged deployment", "Poor sleep", "Elevated stress"],
        "lastAssessment": "1 day ago",
        "deploymentDays": 176,
        "nightShifts": 22,
        "leaveTaken": 2,
    },
    {
        "id": "P-1042",
        "unit": "Unit C",
        "role": "Head Constable",
        "s": [4, 4, 5, 6, 6, 7],
        "sl": [4, 3, 3, 3, 2, 2],
        "w": [3, 4, 4, 4, 5, 5],
        "d": [180, 190, 202, 214, 226, 236],
        "r": [34, 40, 48, 57, 66, 74],
        "f": [82, 70, 72, 58, 50, 80],
        "indicators": ["Rising fatigue", "Reduced rest cycles"],
        "lastAssessment": "3 days ago",
        "deploymentDays": 132,
        "nightShifts": 16,
        "leaveTaken": 5,
    },
    {
        "id": "P-1057",
        "unit": "Unit B",
        "role": "Rifleman",
        "s": [3, 4, 4, 5, 6, 7],
        "sl": [4, 4, 4, 3, 3, 2],
        "w": [3, 3, 4, 4, 5, 5],
        "d": [172, 182, 192, 206, 218, 230],
        "r": [30, 36, 42, 52, 61, 69],
        "f": [76, 66, 64, 52, 48, 74],
        "indicators": ["Increasing workload", "Declining sleep"],
        "lastAssessment": "4 days ago",
        "deploymentDays": 110,
        "nightShifts": 14,
        "leaveTaken": 6,
    },
    {
        "id": "P-1063",
        "unit": "Unit B",
        "role": "Signals Operator",
        "s": [4, 4, 5, 5, 6, 6],
        "sl": [4, 3, 3, 3, 3, 2],
        "w": [3, 4, 4, 4, 4, 5],
        "d": [168, 178, 186, 196, 208, 216],
        "r": [32, 37, 43, 50, 58, 64],
        "f": [70, 62, 66, 48, 44, 68],
        "indicators": ["Night-shift frequency", "Moderate fatigue"],
        "lastAssessment": "5 days ago",
        "deploymentDays": 96,
        "nightShifts": 18,
        "leaveTaken": 7,
    },
    {
        "id": "P-1078",
        "unit": "Unit C",
        "role": "Driver",
        "s": [5, 5, 6, 6, 7, 7],
        "sl": [3, 3, 2, 2, 2, 2],
        "w": [4, 4, 4, 5, 5, 5],
        "d": [196, 206, 216, 228, 240, 248],
        "r": [44, 50, 56, 64, 72, 78],
        "f": [88, 80, 84, 56, 52, 82],
        "indicators": ["Poor sleep", "Extended duty hours"],
        "lastAssessment": "2 days ago",
        "deploymentDays": 154,
        "nightShifts": 21,
        "leaveTaken": 3,
    },
    {
        "id": "P-1085",
        "unit": "Unit A",
        "role": "Constable",
        "s": [3, 3, 3, 4, 4, 4],
        "sl": [4, 4, 4, 4, 4, 4],
        "w": [3, 3, 3, 3, 3, 4],
        "d": [152, 154, 158, 160, 164, 168],
        "r": [22, 24, 26, 28, 30, 32],
        "f": [40, 32, 28, 30, 34, 38],
        "indicators": ["Stable wellness indicators"],
        "lastAssessment": "6 days ago",
        "deploymentDays": 62,
        "nightShifts": 6,
        "leaveTaken": 12,
    },
    {
        "id": "P-1090",
        "unit": "Unit A",
        "role": "Medic",
        "s": [2, 3, 3, 3, 3, 4],
        "sl": [5, 4, 4, 4, 4, 4],
        "w": [2, 3, 3, 3, 3, 3],
        "d": [144, 148, 150, 152, 156, 158],
        "r": [18, 20, 22, 24, 26, 28],
        "f": [34, 26, 24, 22, 30, 32],
        "indicators": ["Within expected range"],
        "lastAssessment": "1 week ago",
        "deploymentDays": 48,
        "nightShifts": 4,
        "leaveTaken": 14,
    },
    {
        "id": "P-1133",
        "unit": "Unit C",
        "role": "Rifleman",
        "s": [5, 6, 6, 7, 7, 8],
        "sl": [3, 3, 2, 2, 2, 1],
        "w": [4, 4, 5, 5, 5, 5],
        "d": [206, 218, 228, 242, 252, 264],
        "r": [48, 55, 63, 72, 80, 88],
        "f": [96, 88, 86, 78, 64, 92],
        "indicators": ["Prolonged deployment", "Severe sleep deficit"],
        "lastAssessment": "1 day ago",
        "deploymentDays": 188,
        "nightShifts": 24,
        "leaveTaken": 1,
    },
    {
        "id": "P-1179",
        "unit": "Unit C",
        "role": "Head Constable",
        "s": [4, 5, 5, 6, 6, 7],
        "sl": [3, 3, 3, 2, 2, 2],
        "w": [4, 4, 4, 5, 5, 5],
        "d": [192, 200, 210, 222, 232, 244],
        "r": [42, 47, 54, 62, 70, 77],
        "f": [86, 76, 78, 60, 54, 84],
        "indicators": ["High workload", "Poor sleep"],
        "lastAssessment": "2 days ago",
        "deploymentDays": 162,
        "nightShifts": 20,
        "leaveTaken": 3,
    },
]

ALERTS = [
    {
        "id": "AL-4401",
        "personnelId": "P-1024",
        "unit": "Unit A",
        "type": "High Welfare Risk",
        "severity": "CRITICAL",
        "score": 82,
        "previousScore": 54,
        "detectedChanges": [
            "Duty hours increased 14% over 30 days",
            "Sleep quality decreased from 4 to 2",
            "Night shifts increased from 9 to 19",
        ],
        "recommendation": "Confidential welfare follow-up.",
        "raisedAt": "Today, 10:42",
        "acknowledged": False,
    },
    {
        "id": "AL-4398",
        "personnelId": "P-1133",
        "unit": "Unit C",
        "type": "Increasing Fatigue Trend",
        "severity": "CRITICAL",
        "score": 88,
        "previousScore": 80,
        "detectedChanges": [
            "Sustained sleep deficit across 6 weeks",
            "Continuous deployment beyond 180 days",
        ],
        "recommendation": "Prioritise rest rotation where operationally feasible.",
        "raisedAt": "Today, 08:15",
        "acknowledged": False,
    },
]

INTERVENTIONS = [
    {
        "id": "IN-201",
        "personnelId": "P-1024",
        "band": "CRITICAL",
        "type": "Confidential welfare follow-up",
        "officer": "WO Sharma",
        "date": "18 Jun 2026",
        "status": "In Progress",
        "followUp": "25 Jun 2026",
        "restricted": True,
    }
]

# ----------------- ML PREDICTION ENGINE -----------------
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


def band_for_score(score: int) -> str:
    if score <= 30:
        return "LOW"
    if score <= 60:
        return "MODERATE"
    if score <= 80:
        return "HIGH"
    return "CRITICAL"


def run_ml_prediction(data: LegacyRiskPredictionInput):
    if lightgbm_model is not None and isolation_forest is not None and shap_explainer is not None:
        try:
            model_input_vals = [
                data.deploymentDays,
                data.nightShifts,
                data.deploymentDays,
                max(0, 15 - data.leaveDays),
                0,
                data.dutyHours / 4.33,
                3 + data.sleepScore,
                max(1, min(5, 6 - data.energyScore)),
            ]
            values = np.array([model_input_vals], dtype=float)
            derived = np.column_stack([values[:, 0] / values[:, 6], values[:, 5] * values[:, 7]])
            isolation_input = pd.DataFrame(
                np.column_stack([values, derived]), columns=BASE_FEATURES + DERIVED_FEATURES
            )
            anomaly = -np.asarray(isolation_forest.decision_function(isolation_input), dtype=float).reshape(-1, 1)
            features = pd.DataFrame(np.column_stack([values, derived, anomaly]), columns=MODEL_FEATURES)

            probs = np.asarray(lightgbm_model.predict_proba(features), dtype=float)[0]
            pred_class = int(np.argmax(probs))
            score = int(round(float(np.dot(probs, np.array([0, 33.3333, 66.6667, 100])))))

            shap_vals = np.asarray(shap_explainer.shap_values(features))
            impacts = (
                np.abs(shap_vals[0, :, pred_class])
                if shap_vals.ndim == 3
                else np.abs(shap_vals[0])
                if shap_vals.ndim == 2
                else np.abs(shap_vals).reshape(-1)
            )
            ranked = np.argsort(impacts)[::-1]
            triggers = [MODEL_FEATURES[i] for i in ranked[:3]]

            prev = data.previousScore if data.previousScore is not None else score
            diff = score - prev
            trend = "Increasing" if diff > 2 else "Decreasing" if diff < -2 else "Stable"

            return {
                "riskScore": score,
                "riskLevel": RISK_LEVELS[pred_class],
                "trend": trend,
                "factors": [
                    {"label": t.replace("_", " ").title(), "value": round(float(probs[min(i, len(probs) - 1)]) * 100)}
                    for i, t in enumerate(triggers)
                ],
                "explanation": f"Model analysis indicates {RISK_LEVELS[pred_class].lower()} welfare risk (Score {score}). Primary indicators: {', '.join(triggers)}.",
                "modelVersion": "sentinelwell-lightgbm-shap-v1",
            }
        except Exception as err:
            print("Error in ML inference, falling back to heuristic:", err)

    # Heuristic Fallback
    stress_contrib = (min(10, max(1, data.stressScore)) / 10.0) * 26.0
    sleep_contrib = ((6.0 - min(5, max(1, data.sleepScore))) / 5.0) * 22.0
    duty_contrib = (min(100.0, max(0.0, data.dutyHours - 150.0)) / 110.0) * 20.0
    night_contrib = (min(25.0, max(0.0, data.nightShifts)) / 25.0) * 15.0
    deploy_contrib = (min(200.0, max(0.0, data.deploymentDays)) / 200.0) * 10.0
    leave_contrib = (min(12.0, max(0.0, 12.0 - data.leaveDays)) / 12.0) * 7.0

    score = int(round(min(100, max(0, stress_contrib + sleep_contrib + duty_contrib + night_contrib + deploy_contrib + leave_contrib))))
    band = band_for_score(score)
    prev = data.previousScore if data.previousScore is not None else score
    diff = score - prev
    trend = "Increasing" if diff > 2 else "Decreasing" if diff < -2 else "Stable"

    return {
        "riskScore": score,
        "riskLevel": band,
        "trend": trend,
        "factors": [
            {"label": "Duty Hours", "value": round((data.dutyHours / 260.0) * 100)},
            {"label": "Night Shifts", "value": round((data.nightShifts / 25.0) * 100)},
            {"label": "Sleep Deficit", "value": round(((6 - data.sleepScore) / 5.0) * 100)},
            {"label": "Deployment Duration", "value": round((data.deploymentDays / 180.0) * 100)},
        ],
        "explanation": f"AI model indicates {band.lower()} welfare risk (Score {score}) based on duty load and sleep balance.",
        "modelVersion": "sentinelwell-heuristic-v1",
    }


# ----------------- REST API ROUTES -----------------
@app.get("/api/health")
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "SentinelWell All-in-One Space",
        "ml_model_loaded": lightgbm_model is not None,
    }


@app.post("/api/auth/login")
async def login(req: Request):
    body = await req.json()
    service_id = body.get("serviceId", "P-1024")
    user = DEMO_USERS.get(service_id, DEMO_USERS["P-1024"])
    return {
        "success": True,
        "data": {
            "accessToken": f"mock_jwt_token_{user['serviceId']}_{int(time.time())}",
            "user": user,
        },
    }


@app.get("/api/personnel")
def list_personnel():
    results = []
    for p in RAW_PERSONNEL:
        score = p["r"][-1]
        prev = p["r"][-2]
        delta = score - prev
        trend = "Increasing" if delta > 2 else "Decreasing" if delta < -2 else "Stable"
        results.append({
            "id": p["id"],
            "unit": p["unit"],
            "role": p["role"],
            "riskScore": score,
            "previousScore": prev,
            "band": band_for_score(score),
            "trend": trend,
            "indicators": p["indicators"],
            "lastAssessment": p["lastAssessment"],
            "deploymentDays": p["deploymentDays"],
            "nightShifts": p["nightShifts"],
            "leaveTaken": p["leaveTaken"],
            "dutyHistory": p["d"],
            "stressHistory": p["s"],
            "sleepHistory": p["sl"],
            "workloadHistory": p["w"],
            "riskHistory": p["r"],
        })
    return {"success": True, "data": results}


@app.get("/api/personnel/{personnel_id}")
def get_personnel(personnel_id: str):
    p = next((x for x in RAW_PERSONNEL if x["id"] == personnel_id), RAW_PERSONNEL[0])
    score = p["r"][-1]
    return {
        "success": True,
        "data": {
            "id": p["id"],
            "unit": p["unit"],
            "role": p["role"],
            "riskScore": score,
            "band": band_for_score(score),
            "trend": "Increasing" if p["r"][-1] > p["r"][-2] else "Stable",
            "indicators": p["indicators"],
            "lastAssessment": p["lastAssessment"],
            "deploymentDays": p["deploymentDays"],
            "nightShifts": p["nightShifts"],
            "leaveTaken": p["leaveTaken"],
            "riskHistory": p["r"],
            "dutyHistory": p["d"],
            "stressHistory": p["s"],
            "sleepHistory": p["sl"],
            "factors": [
                {"label": "Duty Hours", "value": p["f"][0]},
                {"label": "Night Shifts", "value": p["f"][1]},
                {"label": "Sleep Quality", "value": p["f"][2]},
                {"label": "Deployment Days", "value": p["f"][3]},
                {"label": "Leave Deficit", "value": p["f"][4]},
                {"label": "Workload Load", "value": p["f"][5]},
            ],
        },
    }


@app.post("/api/risk/predict")
@app.post("/api/predict-risk")
@app.post("/predict-risk")
def predict_endpoint(data: LegacyRiskPredictionInput):
    res = run_ml_prediction(data)
    return {"success": True, "data": res}


@app.get("/api/alerts")
def get_alerts():
    return {"success": True, "data": ALERTS}


@app.get("/api/interventions")
def get_interventions():
    return {"success": True, "data": INTERVENTIONS}


@app.get("/api/analytics/units")
def get_unit_analytics():
    return {
        "success": True,
        "data": [
            {"unit": "Unit A", "personnelCount": 320, "averageRisk": 31, "band": "LOW", "trend": "Stable"},
            {"unit": "Unit B", "personnelCount": 340, "averageRisk": 54, "band": "MODERATE", "trend": "Increasing"},
            {"unit": "Unit C", "personnelCount": 295, "averageRisk": 71, "band": "HIGH", "trend": "Increasing"},
            {"unit": "Unit D", "personnelCount": 295, "averageRisk": 27, "band": "LOW", "trend": "Stable"},
        ],
    }


@app.post("/api/wellness/assessment")
async def record_wellness(req: Request):
    body = await req.json()
    return {"success": True, "data": {"message": "Wellness self-assessment recorded successfully", "id": "W-991"}}


@app.get("/api/privacy/consent")
def get_privacy_consent():
    return {
        "success": True,
        "data": {
            "wellnessData": True,
            "optionalData": True,
            "analyticsParticipation": True,
            "biometricData": False,
        },
    }


# ----------------- GRADIO DEMO TAB (OPTIONAL UI / HF EMBED) -----------------
def gradio_predict(duty_hours, night_shifts, deployment_days, leave_days, stress_score, sleep_score):
    inp = LegacyRiskPredictionInput(
        dutyHours=duty_hours,
        nightShifts=night_shifts,
        deploymentDays=deployment_days,
        leaveDays=leave_days,
        stressScore=stress_score,
        sleepScore=sleep_score,
    )
    res = run_ml_prediction(inp)
    return (
        f"{res['riskLevel']} ({res['riskScore']}/100)",
        res["trend"],
        res["explanation"],
        {f["label"]: f["value"] / 100.0 for f in res["factors"]},
    )


demo = gr.Interface(
    fn=gradio_predict,
    inputs=[
        gr.Slider(100, 300, value=210, label="Monthly Duty Hours"),
        gr.Slider(0, 30, value=15, step=1, label="Night Shifts (30d)"),
        gr.Slider(0, 365, value=120, step=1, label="Deployment Duration (Days)"),
        gr.Slider(0, 30, value=3, step=1, label="Leave Days Taken"),
        gr.Slider(1, 10, value=6, step=1, label="Self-Reported Stress (1-10)"),
        gr.Slider(1, 5, value=3, step=1, label="Sleep Quality (1-5)"),
    ],
    outputs=[
        gr.Label(label="Risk Assessment Band & Score"),
        gr.Textbox(label="Risk Velocity Trend"),
        gr.Textbox(label="Explainable AI Summary"),
        gr.Label(label="Factor Influences"),
    ],
    title="🛡️ SentinelWell AI - Personnel Welfare Risk Predictor",
    description="Explainable machine learning risk scoring powered by LightGBM & SHAP.",
)

# Mount all FastAPI REST API routes directly into Gradio's internal FastAPI app
app = gr.mount_gradio_app(app, demo, path="/gradio")

if __name__ == "__main__":
    demo.launch(ssr_mode=False)
