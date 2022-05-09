import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import React, { useContext } from 'react';
import NextLink from 'next/link';
import Rating from '@material-ui/lab/Rating';

import {Store} from '../utils/Store'
import { useRouter } from 'next/router';

import axios from 'axios';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
 
import Lightbox from 'react-image-lightbox-next';
import {Container,Row,Col} from 'reactstrap'
import { BASE_URL } from '../constant/constants';







function Product(props) {
  const { product } = props;
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(BASE_URL+`products/${product._id}`);
    if (data.stockQuantity < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

/* return (
    <Card>
    <NextLink href={`/product/${product.slug}`} passHref>
      <CardActionArea>
        <CardMedia
          component="img"
          image={product.image}
          title={product.name}
        ></CardMedia>
        <CardContent>
          <Typography>{product.name}</Typography>
          <Rating value={product.rating} readOnly></Rating>
        </CardContent>
      </CardActionArea>
    </NextLink>
    <CardActions>
      <Typography>${product.price}</Typography>
      <Button
        size="small"
        color="primary"
        onClick={() => addToCartHandler(product)}
      >
        Add to cart
      </Button>
    </CardActions>
  </Card>
  );*/
  return (
    <div >
      
      <div  className="blog-agency">
        <div className="blog-contain" style={{"max-height":"350px","min-height":"350px"}}>
          <center style={{ backgroundColor: "#ffffff" }}>
          <NextLink href={`/product/${product.slug}`} passHref>
            <img
              style={{
                maxHeight: "200px",
                maxWidth: "50%",
                minHeight:"200px",
                minWidth:"50%",

                flex: 1,
                flexDirection: "row",
                 
              }}
              alt=""
              className="img-fluid "
              src=
                {product.image}
              
            />
            
             </NextLink>
          </center>
          <div className="img-container">
            <div>
              <div
                className="blog-info"
                style={{
                  minHeight: "137px",
                  maxHeight: "137px",
                }}
              >
                <div className="m-b-20">
                  
                  <div className="center-text"></div>{" "}
                  <h5 className="blog-head font-600">{product.productName}</h5>
                  <h6 className="m-r-25 font-blog">${product.price}</h6>
                  
                </div>

                <Button
        size="small"
        color="primary"
        onClick={() => addToCartHandler(product)}
      >
        Add to cart
      </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};



   

export default Product;