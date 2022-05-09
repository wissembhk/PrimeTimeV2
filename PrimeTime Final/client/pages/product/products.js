import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Masonry from "react-masonry-css";
import CommonLayout from "../../containers/common/common-layout";
import PopularPosts from "../../containers/blog/posts"
import Axios, * as others from "axios";
import Product from "../../components/Product";
import { Label, Input, Button } from "reactstrap";
import PopupCourses from "./addProduct";

  import ListLeftSidebar from "./recommendation";
  import { BASE_URL } from "../../constant/constants";
import { Store } from "../../utils/Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function MasonaryLeftSidebar() {
  const [productsList, setproductsList] = useState([]);
 const {state,dispatch} = useContext(Store);
  const { userInfo } = state;


  const [search, setSearch] = useState('');

  const getProducts = () => {
    Axios.get(BASE_URL+"products").then((response) => {
      if(search.length==0)
      setproductsList(response.data);
      // console.log(response.data);
    });
  };
  useEffect(() => {
    if(search.length==0)
    getProducts();
    else
    getProducts();
  });

  const searchProducts = () => {
    Axios.get(BASE_URL+`products/searchproduct/`+search).then((response) => {
      if(search.length>0)
      setproductsList(response.data);
      console.log(search.length)
    });
  };
  return (
    <CommonLayout pathList={["instruments", "books"]} pathTitle="SHOP">
      <section className="agency blog blog-sec blog-sidebar">
        <Container>
          <Row>
            <Col lg="9" className="order-lg-2">
              <div>
                <div
                  style={{
                   maxWidth: "35%",
                   maxHeight:"25%",
                   
                    
                    display: "inline-block",
                    padding: "5%",
                  }}
                >
                  {"Search:"}
                  <Input type="text" name="Search" onChange={(event) => {
                              setSearch(event.target.value);
                              console.log(search.length)
                            }}/>
                </div>
                <div style={{ display: "inline-block" }}>
                  <Button className="btn btn-default primary-btn radius-0" onClick={searchProducts()}>
                    <i class="fa fa-search"></i>
                  </Button>
                </div>
                <Masonry
                  breakpointCols={2}
                  className="my-masonry-grid masonry-with-dec row"
                  columnClassName="col-md-6 col-12"
                >
                  {productsList.map((product) => (
                    <Col
                      key={product.slug}
                      sm={10}
                      md={10}
                      lg={10}
                      className="mb-1"
                      
                    >
                      <Product product={product} ></Product>
                    </Col>
                  ))}
                </Masonry>
              </div>
            </Col>
            <Col lg="3">
              <div className="blog-side">
                <PopularPosts />
                <ListLeftSidebar />
                {userInfo ? 
        
        <i>
        <PopupCourses/>
      </i>
        :
       <div>
            
       </div> 
        }
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
}

export default MasonaryLeftSidebar;
