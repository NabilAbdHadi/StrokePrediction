
import pickle
from flask import Flask, render_template, request
from dataclasses import dataclass
import pandas as pd


app = Flask(__name__)


    
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

#################################################

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["GET", "POST"])
def predict():
    details = request.form.to_dict()
    return render_template("index.html", details=details)

@app.route("/predict_ml", methods=["GET", "POST"])
def predict_ML():
    """
    {
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
    """
    try:
        formDetails = request.form.to_dict()
        model_file = open("E:\Personal Project\Stroke Prediction\Machine_Learning_developement\model.pkl", 'rb')
        ml_model = pickle.load(model_file)
        # data = PatientDetails(
        #     gender=str(formDetails['gender']), 
        #     age=int(formDetails['age']), 
        #     hypertension=int(formDetails['hypertension']), 
        #     heart_disease=int(formDetails['heart_disease']), 
        #     ever_married=str(formDetails['ever_married']), 
        #     work_type=str(formDetails['work_type']), 
        #     Residence_type=str(formDetails['Residence_type']), 
        #     avg_glucose_level=float(formDetails['avg_glucose_level']), 
        #     bmi=float(formDetails['bmi']), 
        #     smoking_status=str(formDetails['smoking_status']))
        
        patient_detail = PatientDetails(gender=str(formDetails['gender']), age=int(formDetails['age']), hypertension=int(formDetails['hypertension']), heart_disease=int(formDetails['heart_disease']), ever_married=str(formDetails['ever_married']), work_type=str(formDetails['work_type']), Residence_type=str(formDetails['Residence_type']), avg_glucose_level=float(formDetails['avg_glucose_level']), bmi=float(formDetails['bmi']), smoking_status=str(formDetails['smoking_status']))
        data = pd.DataFrame([patient_detail])
        
        
        prediction = ml_model.predict(data)
        
        print(prediction)
        isStroke = "You might have stroke." if prediction == 1 else "You healthy."
        return render_template("index.html", prediction=isStroke)
    except:
        return render_template("index.html", prediction="Please enter correct input")

if __name__ == '__main__':
    app.run(debug=True, port=5000)