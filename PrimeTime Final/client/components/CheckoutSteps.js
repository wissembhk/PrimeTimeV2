import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';

import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

export default function CheckoutSteps({ activeStep = 0 }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}