import pickle
import pandas as pd
from dataclasses import dataclass
from pydantic import BaseModel

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

formDetails = {
        'gender': 'Male', 
        'age': '25', 
        'hypertension': '0', 
        'heart_disease': '0', 
        'ever_married': 'No', 
        'work_type': 'Private', 
        'Residence_type': 'Urban', 
        'avg_glucose_level': '125', 
        'bmi': '36', 
        'smoking_status': 'never smoked'
    }
print(formDetails['avg_glucose_level'])
data = PatientDetails(gender=str(formDetails['gender']), age=int(formDetails['age']), hypertension=int(formDetails['hypertension']), heart_disease=int(formDetails['heart_disease']), ever_married=str(formDetails['ever_married']), work_type=str(formDetails['work_type']), Residence_type=str(formDetails['Residence_type']), avg_glucose_level=float(formDetails['avg_glucose_level']), bmi=float(formDetails['bmi']), smoking_status=str(formDetails['smoking_status']))

with open("Machine_Learning_developement\\model.pkl", 'rb') as file:
    best_model = pickle.load(file)

# print(type(PatientDetails))
data0 = PatientDetails(gender='Male',age=67,hypertension=0,heart_disease=1,ever_married='Yes',work_type='Private',Residence_type='Urban',avg_glucose_level=228.69,bmi=36.6,smoking_status='formerly smoked')
#data1 = PatientDetails('Female',57,1,0,'Yes','Private','Rural',129.54,60.9,'smokes')
# print(type(data0))
data = pd.DataFrame([data])
print("stroke"  if best_model.predict(data) == 1 else "normal")