import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../../utils/Store';
 

 
 
import {Container,Row,Col} from 'reactstrap'
import CommonLayout from "../../containers/common/common-layout"

 
import Rating from '@material-ui/lab/Rating';
import { useRouter } from 'next/router';

import Axios, * as others from "axios";

import axios from "axios"







import {
    Grid,
    Link,
    List,
    ListItem,
    Typography,
    Card,
    Button,
    Badge,
    CardContent,
    CardMedia,
     
    
    


    TextField,
    CircularProgress,
  } from '@material-ui/core'
  import { ListGroupItem, ListGroup } from "reactstrap";
import { BASE_URL } from '../../constant/constants';

function ProductScreen(props) {
   
    const router = useRouter();
    const { slug } = router.query
    const [product,setproduct] = useState({});
    
   
    if (!product) {
    return <div>Product Not Found</div>;
  }


 
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
    
/*  const addToCartHandler = () => {
    const existItem =cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
        Axios.get(BASE_URL+`products/${product._id}`).then((response) => {
            setprod(response.data);
          console.log(response.data);
        });
        if (prod.stockQuantity <= quantity) {
          window.alert('Sorry. Product is out of stock');
          return;
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity },
          });
        
         
        router.push('/cart');
      };*/
      const addToCartHandler = async () => {
        const existItem =cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(BASE_URL+`products/${product._id}`);
        if (data.stockQuantity <= quantity) {
          window.alert('Sorry. Product is out of stock');
          return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        router.push('/cart');

      };
      
   
      const getProduct = () => {
        Axios.get(BASE_URL+`products/slug/${slug}`).then((response) => {
            setproduct(response.data);
         
        });
      };
      useEffect(() => {
        getProduct();
        
        });
  //  const { product } = props;
   
   
    
    return (
        <CommonLayout pathList={['blog', 'blog details', 'Gallery Layout']} pathTitle="BLOG WITH gallery-layout">
        <section className="agency blog-sec blog-sidebar single_blog_item">
            <Container>
                <Row>
        <Grid container margin={5} spacing={6}>
        <Grid item md={3} xs={12}>
        <CardMedia
          component="img"
          image={product.image}
          title={product.name}
        ></CardMedia>
       
        </Grid>
        <Grid item md={2} xs={10}>
         
            <ListGroup>
            <ListItem>
              {product.productName}
            </ListItem>
           
             
            
           
          <Typography>Rating :{product.rating} </Typography>
                  
        
            
              <Link href="#reviews">
                <Typography>({product.numReviews} reviews)</Typography>
              </Link>
           
            <ListItem>
              <Typography> Description: {product.description}</Typography>
            </ListItem>
            </ListGroup>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price:</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    
                    {product.stockQuantity > 0 ? (
                        <Badge bg="green">In Stock</Badge>
                      ) : (
                        <Badge bg="red">Unavailable</Badge>
                      )}
                    
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
              <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
                 
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      </Row>
            </Container>
        </section>
    </CommonLayout>
    )}
    export default ProductScreen;