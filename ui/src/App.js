import React, { Component } from 'react';
import { Radio, RadioGroup, FormLabel, FormControl, FormControlLabel, Typography, Grid, Slider, Container, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as tf from '@tensorflow/tfjs';

/*
categorical data use radio button
continues data use slider
*/


const {innerWidth: screenWidth, innerHeight: screenHeight} = window;
const userAnswer = {};




const myStyle = makeStyles({
  backgroundLayout :{
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  },
  question:{
    msTextAutospace:"ideograph-alpha"
  },
  answer:{
    marginLeft: 50,
    color: "primary",
    marginRight: 50,

  }
});

 
async function predictStroke(userInput) {
  const model = await tf.loadLayersModel('stroke_prediction_model\\model.json');
  return model.predict(userInput);
};
 
function RadioQuestion({id, question, answers}) {
    
    const [value, setValue] = React.useState(answers[0]);
    userAnswer[id] = answers.indexOf(value);
    
    const handleChange = (event) => {
      setValue(event.target.value);
      userAnswer[id] = answers.indexOf(event.target.value); 
    };
    const classes = myStyle();
    return (
      <FormControl className={classes.question}>
        <FormLabel>{question}</FormLabel>
        <br />
        
        <RadioGroup className={classes.answer} m={2} row name={id} value={value} onChange={handleChange}>{
          answers.map(element => <FormControlLabel name={id} value={element} control={<Radio />} label={element} />)
        }
        </RadioGroup>
        <br />
      </FormControl>
    );
  }

function SliderQuestion({id, question, range}){
  const classes = myStyle();
  const [value, setValue] = React.useState(Math.round((range[0]+range[1])/4));
  userAnswer[id] = value;

  const updateRange =(event)=>{
    setValue(event.target.value);
    userAnswer[id] = event.target.value;
  };
  return (
    <FormControl>
      <FormLabel >{question}</FormLabel>
      <br />
      <br />
      <br />
      <Slider className={classes.answer} defaultValue={value} onChange={updateRange} name={id} min={range[0]} max={range[1]} valueLabelDisplay="on"/>
      <br />
    </FormControl>
  );
}
class App extends Component {

    
    render(){
      const handleSubmit = (event) => {
        event.preventDefault();
        const userData = Object.values(userAnswer);
        console.log(predictStroke(userData));
      };
        return ( 
            
            <Grid 
              className={myStyle.backgroundLayout}
              container 
              direction="column" 
              justify="center" 
              alignItems="stretch"
              style={{
                  paddingLeft: 0.1*screenWidth,
                  paddingRight: 0.1*screenWidth,
                  paddingTop: 0.1*screenHeight,
                  paddingBottom: 0.1*screenHeight,
                  border: 1
              }}>
                <Container className="content">
                    <Grid 
                      item 
                      style={{color:{backgroundColor:'primary'}, 
                      padding:0}}
                      direction="column"
                      justify="center">
                      
                      <Typography align="center" variant='h3'>Stroke Prediction System</Typography>
                      <br />
                      <Typography align="center" variant='h6'>
                      This system is predict whether you have stroke or not according to your answer.
                      </Typography>
                      <br />
                      <br />
                    </Grid>
                    <Grid
                       container
                        direction="column"
                        justify="center"
                      >
                      {/* add questions  */}
                      <RadioQuestion id="gender" question="1. Gender:" answers={["Male","Female","Other"]}/>
                      <SliderQuestion id="age" question="2. Age:" range={[0,100]}/>
                      <RadioQuestion id="hypertension" question="3. Hypertension:" answers={["No", "Yes"]}/>
                      <RadioQuestion id="heart_disease" question="4. Hear Disease:" answers={["No", "Yes"]}/>
                      <RadioQuestion id="ever_married" question="5. Married:" answers={["No", "Yes"]}/>
                      <RadioQuestion id="work_type" question="6. Type of Work:" answers={["Never_worked", "children", "Govt_job", "Private", "Self-employed" ]}/>
                      <RadioQuestion id="Residence_type" question="7. Residence:" answers={["Rural","Urban"]}/>
                      <SliderQuestion id="avg_glucose_level" question="8. Average glucose level in blood (mg/dL):" range={[0,300]} />
                      <SliderQuestion id="bmi" question="9. Body Mass Index (Kg/m^2):" range={[0,50]}/>
                      <RadioQuestion id="smoking_status" question="10. Smoking status:" answers={["Never smoked", "Formerly smoked", "Smokes", "Unknown"]}/>
                      {/* Submit Button */}
                      <Button type="submit" fullWidth size="large" variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                      
                      
                      
                      
                    </Grid>
                </Container>
                
            </Grid>
            
            
        );
    } 
}

export default App;