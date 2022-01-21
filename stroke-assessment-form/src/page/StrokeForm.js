import React from 'react';
import FormDetails from './StrokeForm.json';
import Form from '../component/Form';
class StrokeForm extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            title: "Prediction Result",
            description: "untested",
            btnName: "Predict"
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        let data = {};
        let questions = FormDetails.questions;
        let question = event.target;
        questions.map((q,i) => {
            data[question[i].name] = question[i].value;
        });
        // alert(JSON.stringify(data));
        try {
            fetch("http://127.0.0.1:5000/predict_ml",{
                method:"POST",
                body: JSON.stringify(data)
            })
            .then((response)=> response.json())
            .then((result)=>{
                console.log(result["stroke prediction"]);
                this.setState({description: result["stroke prediction"]});
                console.log(this.state.description)
            });
        } catch (error) {
            alert(error)
        }
        
        
        
    };

    render(){
        
        return(
            <div className='bg-blue-400 sm:p-0 md:p-5 lg:p-10'>
                <Form template={FormDetails} />
            </div>
        );
    }
}

export default StrokeForm;