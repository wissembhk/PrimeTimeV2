import React, { useContext, useEffect, useState } from 'react';

import { Container, Row, Col, Form, FormGroup, Label, Input,Button } from "reactstrap";
 

import { Store } from '../utils/Store';
import CheckoutSteps from '../components/CheckoutSteps';
import { useRouter } from 'next/router';
import CommonLayout from '../containers/common/common-layout';
import Cookies from 'js-cookie';

const ShippingAddress = () => { 
  const navigate = useRouter();
  const { state, dispatch} = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate.push('/cart');
    }
  }, [localStorage.getItem("user"), navigate]);
  const [country, setCountry] = useState(shippingAddress.country || '');
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    Cookies.set(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate.push('/Payment');
  };
   
  return (
    <CommonLayout>
      {localStorage.getItem("user")? (
                  
                  <div className="container small-container">
                    <CheckoutSteps activeStep={1}></CheckoutSteps>
                    <h5 className="my-3">Shipping Address</h5>
                    <Form onSubmit={submitHandler}>
                      <FormGroup className="mb-3" controlId="fullName">
                        <Label>Full Name</Label>
                        <Input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </FormGroup>
                      <FormGroup className="mb-3" controlId="address">
                        <Label>Address</Label>
                        <Input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </FormGroup>
                      <FormGroup className="mb-3" controlId="city">
                        <Label>City</Label>
                        <Input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </FormGroup>
                      <FormGroup className="mb-3" controlId="postalCode">
                        <Label>Postal Code</Label>
                        <Input
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          required
                        />
                      </FormGroup>
                      <FormGroup className="mb-3" controlId="country">
                        <Label>Country</Label>
                        <Input
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                        />
                      </FormGroup>
                      <div className="mb-3">
                        <Button variant="primary" type="submit">
                          Continue
                        </Button>
                      </div>
                    </Form>
                  </div>
                ) : (
                  <div className="container small-container">
                    Go to Login 
                   </div>
                )}

      

  </CommonLayout>    
       
  );
}
export default ShippingAddress;






