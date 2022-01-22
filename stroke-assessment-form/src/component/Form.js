import React, {useState} from 'react';
import Dropdown from './element/Dropdown';
import NumberTextfield from './element/NumberTextfield';
import PopUp from './element/PopUp';
import Footer from './element/Footer';
import Header from './element/Header';


function Form({template}) {   
    const [ prediction, setPrediction ]  = useState();
    let handleSubmit = async(event) => {
        event.preventDefault();
        let data = {};
        let questions = template.questions;
        let question = event.target;
        questions.map((q,i) => {
            data[question[i].name] = question[i].value;
        });
        // alert(JSON.stringify(data));
        // console.log(JSON.stringify(data))
        try {
            await fetch(template.api,{
                method:"POST",
                body: JSON.stringify(data)
            })
            .then((response)=>  response.json())
            .then((json)=>{
                if(json['stroke prediction']==="positive"){
                    setPrediction("Bad News, Your Result Come Positive");    
                } else if(json['stroke prediction']==="negative"){
                    setPrediction("Good News, Your Result Come Negative");    
                } else {
                    console("somthing wrong with stroke prediction")
                }
                
            });

        } catch (error) {
            console.log("error");
            // setPrediction(error);
        }
        
        
        
    };
 
    let renderTemplate = (questions) => {
        return questions.map((q,i)=>{
            let { type, name, placeholder, option, min, step } = q;
            switch(type) {
                case 0:
                    return (
                        <Dropdown 
                        id={i} 
                        name={name} 
                        placeholder={placeholder} 
                        option={option}
                        />);

                case 1:
                    return (
                        <NumberTextfield 
                        id={i} 
                        name={name} 
                        placeholder={placeholder} 
                        min={min} 
                        step={step}
                        />);
                

                default:
                    return null;
    };
        });
    };
    
    return (
        
        <div className='container bg-blue-50 lg:py-10 lg:px-20 md:py-5 md:px-10 rounded-lg shadow-lg '>
            <Header title={template.title} description={template.description} />
           
            <form onSubmit={handleSubmit}>
                <div className=' py-2 md:py-5 text-sm md:text-md lg:text-lg sm:my-1 md:my-3 lg:my-5 space-y-3'>
                    {renderTemplate(template.questions)}    
                </div>
                
                <div className='text-center'>
                    <button type="submit" class="btn btn-lg btn-primary w-full md:w-2/3 lg:w-1/3 bg-blue-500" data-bs-toggle={template.result.modal} data-bs-target="#myModal">{template.result.button}</button>
                    <PopUp title={prediction !== undefined ? template.result.title: "Error"} description={ prediction !== undefined ? prediction : "Prediction Failed" } modal={template.result.modal} />           
                </div>    
            </form>
            
             
            <br />
            <Footer />
        </div>
    )
}

export default Form;