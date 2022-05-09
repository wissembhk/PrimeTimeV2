import React, { useContext, useEffect, useReducer, useState } from 'react';
import dynamic from 'next/dynamic';

import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Axios  from "axios";
import Cookies  from 'js-cookie';

import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from '@material-ui/core';

import { useRouter } from 'next/router';

import CommonLayout from '../containers/common/common-layout';
import { CardBody, CardText, CardTitle, Col, ListGroup, Row } from 'reactstrap';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrder() {

  const router = useRouter();
  const [order, setOrder] = useState({ _id:''});
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems, shippingAddress, paymentMethod },
    userInfo
  } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  
 
  
  


  const placeOrderHandler =   () => {
  
    

     Axios.post(
        'http://localhost:5000/orders',
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
          user:userInfo._id,
        
        }).then( res => {
          setOrder(res.data);
          console.log("success");
          console.log(res.data.order._id);
          router.push(`/order/${res.data.order._id}`);
         
         });
        
      //console.log(data);
      Cookies.remove('cartItems');
     
      }
    
  
/* const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        'http://localhost:5000/orders',
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
          user:userInfo._id
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      
      //localStorage.removeItem('cartItems');
      router.push(`/order/${userInfo.token}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      
    }
  };*/






  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, []);

  return (
    <CommonLayout>
      <div className="container small-container"></div>
      <CheckoutSteps activeStep={3}></CheckoutSteps>
      <div className="container small-container"></div>
      
      <h5 className="my-2 mx-3">Preview Order</h5>
      <Row>
        <Col md={7}>
          <Card className="mb-3 mx-3">
            <CardBody>
              <CardTitle>Shipping</CardTitle>
              <CardText>
                <strong>Name:</strong> {shippingAddress.fullName} <br />
                <strong>Address: </strong> {shippingAddress.address},
                {shippingAddress.city}, {shippingAddress.postalCode},
                {shippingAddress.country}
              </CardText>
              <NextLink href="/ShippingAddress" passHref>Edit</NextLink>
            </CardBody>
          </Card>
          <Card className="mb-3 mx-3">
            <CardBody>
              <CardTitle>Payment</CardTitle>
              <CardText>
                <strong>Method:</strong> {paymentMethod}
              </CardText>
              
            </CardBody>
          </Card>
          <Card className="mb-3 mx-3">
            <CardBody>
              <CardTitle>Items</CardTitle>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListItem key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListItem>
                ))}
              </ListGroup>
              <NextLink href="/cart" passHref>Edit</NextLink>
            </CardBody>
          </Card>
          </Col>
          <Col  md={4}>
          <Card>
            <CardBody>
              <CardTitle>Order Summary</CardTitle>
              <ListGroup variant="flush">
                <ListItem>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListItem>
                <ListItem>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListItem>
                <ListItem>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListItem>
                <ListItem>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListItem>
                <ListItem>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    

    </CommonLayout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });