import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Client from "./Client";
import Debt from "./Debt";
import Review from "./Review";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
  },
}));

const steps = [
  "Cadastro de Cliente",
  "Cadastro de Débitos",
  "Revisar Cadastro",
];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <Client />;
    case 1:
      return <Debt />;
    case 2:
      return <Review />;
    default:
      throw new Error("Passo desconhecido.");
  }
};

const Steps = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" align="center">
        Cadastro
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        spacing={2}
      >
        <Grid item>
          {activeStep !== 0 && <Button onClick={handleBack}>Voltar</Button>}
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Confirmar" : "Próximo"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export { Steps as default };
