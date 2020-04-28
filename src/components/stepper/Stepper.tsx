import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Radio, RadioGroup, FormControlLabel, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      padding: theme.spacing(1),
      
    },
  }),
);

function getSteps() {
  return ['Choose subject', 'Choose Salutation', 'Make body', 'Sign off'];
}




export default function HorizontalLabelPositionBelowStepper() {
  const [value, setValue] = React.useState('Regarding');
  const [textBox, setTextBox] = React.useState("");
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextBox("");
    setValue((event.target as HTMLInputElement).value);
  };

  const handleNext = () => {
    alert(value+" "+textBox);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleReset} variant="contained" color="primary">Send Email</Button>
          </div>
        ) : (
            <div>

              {
                activeStep === 0 &&
                <div className="left">
                  <RadioGroup aria-label="subject" name="subject" value={value} onChange={handleChange}>
                    <FormControlLabel value="Regarding" control={<Radio />} label={<FormControlLabel control={<Typography className={classes.instructions}> Regaring </Typography>} label={<TextField id='r1' placeholder='Information about...' variant='standard' autoComplete="off" onChange={(e)=>setTextBox(e.target.value)} disabled={value!=="Regarding" ?true :false} />} />} />
                    <FormControlLabel value="Inquiry about" control={<Radio />} label={<FormControlLabel control={<Typography className={classes.instructions}> Inquiry about </Typography>} label={<TextField id='r1' placeholder='the subject' variant='standard' autoComplete="off" onChange={(e)=>setTextBox(e.target.value)} disabled={value!=="Inquiry about" ?true :false} />} />} />
                    <FormControlLabel value="Need clearification about" control={<Radio />} label={<FormControlLabel control={<Typography className={classes.instructions}> Need clearification about </Typography>} label={<TextField id='r1' placeholder='the subject' autoComplete="off" onChange={(e)=>setTextBox(e.target.value)} variant='standard' disabled={value!=="Need clearification about" ?true :false} />} />} />
                    <FormControlLabel value="Reminder for" control={<Radio />} label={<FormControlLabel control={<Typography className={classes.instructions}> Reminder for </Typography>} label={<TextField id='r1' placeholder='the subject' variant='standard' autoComplete="off" onChange={(e)=>setTextBox(e.target.value)} disabled={value!=="Reminder for" ?true :false} />} />} />
                    <FormControlLabel value="Update on" control={<Radio />} label={<FormControlLabel control={<Typography className={classes.instructions}> Update on </Typography>} label={<TextField id='r1' placeholder='the metter' variant='standard' autoComplete="off" onChange={(e)=>setTextBox(e.target.value)} disabled={value!=="Update on" ?true :false} />} />} />
                    <FormControlLabel value="Invitation for" control={<Radio />} label={<FormControlLabel control={<Typography className={classes.instructions}> Invitation for </Typography>} label={<TextField id='r1' placeholder='the subject' variant='standard' autoComplete="off" onChange={(e)=>setTextBox(e.target.value)} disabled={value!=="Invitation for" ?true :false} />} />} />
                    <FormControlLabel value="Congratulations !" control={<Radio />} label={<FormControlLabel control={<Typography className={classes.instructions}> Congratulations ! </Typography>} label={<TextField id='r1' placeholder='the subject' variant='standard' autoComplete="off" onChange={(e)=>setTextBox(e.target.value)}disabled={value!=="Congratulations !" ?true :false} />} />} />
                    <FormControlLabel value="Apologies for" control={<Radio />} label={<FormControlLabel control={<Typography className={classes.instructions}> Apologies for </Typography>} label={<TextField id='r1' placeholder='the subject' variant='standard' autoComplete="off" onChange={(e)=>setTextBox(e.target.value)} disabled={value!=="Apologies for" ?true :false} />} />} />
                    <FormControlLabel value="10" control={<Radio />} label={<TextField id="r4"  onChange={(e)=>setTextBox(e.target.value)} placeholder="Write your own " autoComplete="off" variant="standard" disabled={value!=="10" ?true :false} />} />
                  </RadioGroup>
                </div>
              }
              <div className="right">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
              </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
