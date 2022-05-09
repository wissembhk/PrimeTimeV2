
import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Axios, * as others from "axios";
import NextLink from 'next/link';
import { BASE_URL } from '../../../constant/constants';



const PopularPosts = ({}) => {



    
    const [newproduct, setnewproduct] = useState([]);

    const getnewProducts = () => {
     Axios.get(BASE_URL+"products?new=true").then((response) => {
        setnewproduct(response.data);
       console.log(response.data);
       
     });
   };
   useEffect(() => {
    getnewProducts();
     },[]);

    return (
        <div>
            <h5 className="blog-title">New Product</h5>
            <div className="sidebar-container">
                <div className="post-container d-flex">
                {
                                    newproduct.map((product) => (
                    <div className="w-35 m-r-25">
                        <NextLink href={`/product/${product.slug}`} passHref>
                        <img 
                        style={{
                            maxHeight: "100px",
                            maxWidth: "100px",
                            minHeight:"100px",
                            minWidth:"100px",
                        }}
                        alt="" className="img-fluid" src={product.image}/>
                        </NextLink>
                        <div className="badge">{product.productName}</div>
                    </div>
                   ) )}  
                </div>
                 
                 
                  
            </div>
        </div>
    );
};

export default PopularPosts;
