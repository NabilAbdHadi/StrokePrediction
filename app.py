from os import name
from fastapi import FastAPI, Request
import fastapi
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
import uvicorn, pickle
from dataclasses import dataclass
import pandas as pd

app = FastAPI()
#templates = Jinja2Templates(directory="E:\\Personal Project\\Stroke Prediction\\user-form")
#app.mount("/static", StaticFiles(directory="static"), name="static")
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@dataclass
class PatientDetails:
    gender: str
    age: int 
    hypertension: int 
    heart_disease: int 
    ever_married: str 
    work_type: str 
    Residence_type: str 
    avg_glucose_level: float 
    bmi: float 
    smoking_status: str


@app.get("/")
def index():
    return "Stroke Prediction Model"

"""
@app.get("/home", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/result", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("result.html", {"request": request})"""

@app.post("/predict")
async def predict(patient_details: PatientDetails):
    """
    example:
    {
        "gender": "Male",
        "age": 67,
        "hypertension": 0,
        "heart_disease": 1,
        "ever_married": "Yes",
        "work_type": "Private",
        "Residence_type": "Urban",
        "avg_glucose_level": 228.69,
        "bmi": 36.6,
        "smoking_status": "formerly smoked"
    }   
    
    {"gender": "Male", "age": 67, "hypertension": 0, "heart_disease": 1, "ever_married": "Yes", "work_type": "Private", "Residence_type": "Urban", "avg_glucose_level": 228.69, "bmi": 36.6, "smoking_status": "formerly smoked" }
    """
    try:
        model_file = open("E:\Personal Project\Stroke Prediction\Machine_Learning_developement\model.pkl", 'rb')
        ml_model = pickle.load(model_file)
        data = pd.DataFrame([patient_details])
        prediction = ml_model.predict(data)
        return {"predication": "You have Stroke" if prediction == 1 else "You dont have Stroke"}
    except:
        return {"predication": "Please enter correct input"}

@app.post("/test")
async def test(name):
    return f"hello {name}"




    