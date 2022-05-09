import React, { useContext, useEffect, useState } from 'react';

import { Container, Row, Col, Form, FormGroup, Label, Input,Button } from "reactstrap";
 

import { Store } from '../utils/Store';
import CheckoutSteps from '../components/CheckoutSteps';
import router, { useRouter } from 'next/router';
import CommonLayout from '../containers/common/common-layout';
import Cookies from 'js-cookie';
import { FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup } from '@material-ui/core';

export default function Payment() {
    const navigate = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
      cart: { shippingAddress, paymentMethod },
    } = state;
  
    const [paymentMethodName, setPaymentMethod] = useState(
      paymentMethod || 'PayPal'
    );
  
    useEffect(() => {
      if (!shippingAddress.address) {
        router.push('/ShippingAddress');
      }
    }, [shippingAddress, navigate]);
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
      localStorage.setItem('paymentMethod', paymentMethodName);
      Cookies.set('paymentMethod', paymentMethodName);
      router.push('/placeorder');
    };
    return (
      <CommonLayout>
      <div className="container small-container">
        <CheckoutSteps activeStep={2}></CheckoutSteps>
        <div className="container small-container">
          
          <h5 className="my-3">Payment Method</h5>
          <form onSubmit={submitHandler}>
       
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                 
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}
                ></FormControlLabel>
                 
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={() => router.push('/ShippingAddress')}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
        </div>
      </div>
      </CommonLayout>    
    );
  }