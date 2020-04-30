import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Radio, RadioGroup, FormControlLabel, TextField, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { MailContext, IEmail } from '../../context/MailContext';


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
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Choose subject', 'Choose Salutation', 'Make body', 'Sign off'];
}


export default function HorizontalLabelPositionBelowStepper() {
  const [value, setValue] = React.useState('Regarding');
  const [salutation, setSalutation] = React.useState('Hi');
  const [textBox, setTextBox] = React.useState("");
  const [textBox2, setTextBox2] = React.useState("");
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [body, setBody] = React.useState("");
  const [signOf, setSignOf] = React.useState("Thankyou");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");


  const Mail: IEmail = React.useContext(MailContext)!;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextBox("");
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSalutationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextBox2("");
    setSalutation((event.target as HTMLInputElement).value);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (value !== "10")
        Mail.setMail({
          ...Mail.mail,
          subject: value + " " + textBox
        });
      else
        Mail.setMail({
          ...Mail.mail,
          subject: textBox
        });
      if (textBox.length > 0)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      else
        alert("Fill the Subject");
    }
    else if (activeStep === 1) {
      if (salutation !== "10")
        Mail.setMail({
          ...Mail.mail,
          salutation: salutation + " " + textBox2 + ","
        });
      else
        Mail.setMail({
          ...Mail.mail,
          salutation: textBox2 + ","
        });
      if (textBox2.length > 0 || salutation === "Greetings")
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      else
        alert("Fill the Salutation Properly");
    }
    else if (activeStep === 2) {
      if (body.length > 0) {
        Mail.setMail({
          ...Mail.mail,
          body: body
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
      else
        alert("Fill the body properly");
    }
    else if (activeStep === 3) {
      if (name.length > 0) {
        Mail.setMail({
          ...Mail.mail,
          ending: signOf + "\n" + name
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setEmail("Subject : " + Mail.mail.subject + "\n\n" + Mail.mail.salutation + "\n\n" + Mail.mail.body + "\n\n" + signOf + "\n" + name);
      }
      else
        alert("Don't Forget to write your Name !");
    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const copy = () => {
    var textField = document.createElement('textarea')
    textField.innerText = email
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    // navigator.clipboard.writeText(email);
    alert('Mail Copied !!');
  }



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
          <>
          <div className="left">
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={email}
                multiline
                rows={20}
                labelWidth={60}
              />
            </FormControl>
          </div>
          <div className="right">
          <Button onClick={handleReset}>Reset</Button>
          <Button className={classes.margin} variant="contained" onClick={copy} color="primary">Copy Email</Button>
          </div>
          </>
        ) : (
            <div>

              {
                activeStep === 0 &&
                <div className="left">
                  <RadioGroup aria-label="subject" name="subject" value={value} onChange={handleChange}>

                    <FormControlLabel value="Regarding" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Regaring </Typography>}
                      label={<TextField id='r1' placeholder='Information about...'
                        variant='standard' autoComplete="off"
                        onChange={(e) => setTextBox(e.target.value)} disabled={value !== "Regarding" ? true : false}
                        value={value === "Regarding" ? textBox : ""} />} />}
                    />

                    <FormControlLabel value="Inquiry about" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Inquiry about </Typography>}
                      label={<TextField id='r1' placeholder='the subject'
                        variant='standard' autoComplete="off"
                        onChange={(e) => setTextBox(e.target.value)} value={value === "Inquiry about" ? textBox : ""}
                        disabled={value !== "Inquiry about" ? true : false} />} />}
                    />

                    <FormControlLabel value="Need clearification about" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Need clearification about </Typography>}
                      label={<TextField id='r1' placeholder='the subject' autoComplete="off"
                        onChange={(e) => setTextBox(e.target.value)} value={value === "Need clearification about" ? textBox : ""}
                        variant='standard'
                        disabled={value !== "Need clearification about" ? true : false} />} />}
                    />

                    <FormControlLabel value="Reminder for" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Reminder for </Typography>}
                      label={<TextField id='r1' placeholder='the subject' variant='standard' autoComplete="off"
                        onChange={(e) => setTextBox(e.target.value)} value={value === "Reminder for" ? textBox : ""}
                        disabled={value !== "Reminder for" ? true : false} />} />}
                    />

                    <FormControlLabel value="Update on" control={<Radio />}
                      label={<FormControlLabel control={<Typography className={classes.instructions}> Update on </Typography>}
                        label={<TextField id='r1' placeholder='the metter' variant='standard' autoComplete="off" onChange={(e) =>
                          setTextBox(e.target.value)} value={value === "Update on" ? textBox : ""} disabled={value !== "Update on" ? true : false} />} />}
                    />

                    <FormControlLabel value="Invitation for" control={<Radio />}
                      label={<FormControlLabel control={<Typography className={classes.instructions}> Invitation for </Typography>}
                        label={<TextField id='r1' placeholder='the subject' variant='standard' autoComplete="off"
                          onChange={(e) => setTextBox(e.target.value)} value={value === "Invitation for" ? textBox : ""}
                          disabled={value !== "Invitation for" ? true : false} />} />}
                    />

                    <FormControlLabel value="Congratulations !"
                      control={<Radio />} label={<FormControlLabel control={<Typography className={classes.instructions}> Congratulations ! </Typography>}
                        label={<TextField id='r1' placeholder='the subject' variant='standard' autoComplete="off" onChange={(e) => setTextBox(e.target.value)}
                          value={value === "Congratulations !" ? textBox : ""}
                          disabled={value !== "Congratulations !" ? true : false} />} />}
                    />

                    <FormControlLabel value="Apologies for"
                      control={<Radio />} label={<FormControlLabel control={<Typography className={classes.instructions}> Apologies for </Typography>}
                        label={<TextField id='r1' placeholder='the subject' variant='standard' autoComplete="off" onChange={(e) => setTextBox(e.target.value)}
                          value={value === "Apologies for" ? textBox : ""} disabled={value !== "Apologies for" ? true : false} />} />}
                    />

                    <FormControlLabel value="10" control={<Radio />}
                      label={<TextField id="r4" onChange={(e) => setTextBox(e.target.value)} placeholder="Write your own "
                        autoComplete="off" variant="standard" value={value === "10  " ? textBox : ""}
                        disabled={value !== "10" ? true : false} />}
                    />
                  </RadioGroup>
                </div>

              }
              {
                activeStep === 1 &&
                <div className="left">
                  <RadioGroup aria-label="body" name="body" value={salutation} onChange={handleSalutationChange}>

                    <FormControlLabel value="Hi" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Hi </Typography>}
                      label={<TextField id='r1' placeholder='John'
                        variant='standard' autoComplete="off"
                        onChange={(e) => setTextBox2(e.target.value)} disabled={salutation !== "Hi" ? true : false}
                        value={salutation === "Hi" ? textBox2 : ""} />} />}
                    />

                    <FormControlLabel value="Dear" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Dear </Typography>}
                      label={<TextField id='r1' placeholder='Maria'
                        variant='standard' autoComplete="off"
                        onChange={(e) => setTextBox2(e.target.value)} value={salutation === "Dear" ? textBox2 : ""}
                        disabled={salutation !== "Dear" ? true : false} />} />}
                    />

                    <FormControlLabel value="Respected" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Respected </Typography>}
                      label={<TextField id='r1' placeholder='Authoroties'
                        variant='standard' autoComplete="off"
                        onChange={(e) => setTextBox2(e.target.value)} value={salutation === "Respected" ? textBox2 : ""}
                        disabled={salutation !== "Respected" ? true : false} />} />}
                    />

                    <FormControlLabel value="Hello" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Hello </Typography>}
                      label={<TextField id='r1' placeholder='John'
                        variant='standard' autoComplete="off"
                        onChange={(e) => setTextBox2(e.target.value)} disabled={salutation !== "Hello" ? true : false}
                        value={salutation === "Hello" ? textBox2 : ""} />} />}
                    />

                    <FormControlLabel value="Greetings" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Greetings, </Typography>}
                      label="" />}
                    />

                    <FormControlLabel value="10" control={<Radio />}
                      label={<TextField id="r4" onChange={(e) => setTextBox2(e.target.value)} placeholder="Write your own "
                        autoComplete="off" variant="standard" value={value === "10  " ? textBox2 : ""}
                        disabled={salutation !== "10" ? true : false} />}
                    />
                  </RadioGroup>
                </div>
              }
              {
                activeStep === 2 &&
                <div className="left">
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Body</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      multiline
                      rows={20}
                      labelWidth={60}
                    />
                  </FormControl>
                </div>
              }
              {
                activeStep === 3 &&
                <div className="left">
                  <RadioGroup aria-label="body" name="body" value={signOf} onChange={(e) => setSignOf(e.target.value)}>
                    <FormControlLabel value="Thankyou" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Thankyou, </Typography>}
                      label="" />}
                    />

                    <FormControlLabel value="Yours Faithfully" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Yours Faithfully, </Typography>}
                      label="" />}
                    />

                    <FormControlLabel value="Yours Truely" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Yours Truely, </Typography>}
                      label="" />}
                    />

                    <FormControlLabel value="Best" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Best, </Typography>}
                      label="" />}
                    />

                    <FormControlLabel value="Best Wishes" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Best Wishes, </Typography>}
                      label="" />}
                    />

                    <FormControlLabel value="Respectfully" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Respectfully, </Typography>}
                      label="" />}
                    />

                    <FormControlLabel value="Regards" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Regards, </Typography>}
                      label="" />}
                    />

                    <FormControlLabel value="Take Care" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Take Care, </Typography>}
                      label="" />}
                    />

                    <FormControlLabel value="Thankyou in Advance" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Thankyou in Advance, </Typography>}
                      label="" />}
                    />

                    <FormControlLabel value="Cheers" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Cheers, </Typography>}
                      label="" />}
                    />

                    <FormControlLabel value="Good Luck" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Good Luck, </Typography>}
                      label="" />}
                    />

                    <FormControlLabel value="Have a great Day" control={<Radio />} label={<FormControlLabel
                      control={<Typography className={classes.instructions}> Have a great Day, </Typography>}
                      label="" />}
                    />
                    <TextField
                      id="outlined-multiline-static"
                      label="Your Name"
                      multiline
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      rows={2}
                      variant="outlined"
                    />
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
