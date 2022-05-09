import React, { useState, useEffect } from "react";
import Axios, * as others from "axios";
import { Container, Row } from "reactstrap";
import NextLink from "next/link";
import { Label, Input, Button } from "reactstrap";
// import Custom Components

import CommonLayout from "../containers/common/common-layout";
import { BASE_URL } from "../constant/constants";


function NoSidebar() {
  const [coursesList, setCoursesList] = useState([]);
  const [session, setsession] = useState();
  const [query, setQuery] = useState("")
  const [video, setVideo] = useState("")

  /*const getLyrics = () => {
    Axios.get("http://localhost:5000/courses/searchlyrics").then((response) => {
      search:query
      console.log(response.data);
      setQuery(response.data);
      console.log(query);
    });
  };*/
  const getLyrics = () => {
  Axios.get(BASE_URL+`courses/searchlyrics/${query}`).then((response) => {
      console.log(response.data);
      setQuery(response.data);
      setVideo(response.data);
      
    });
  };
  useEffect(() => {
    setsession(JSON.parse(localStorage.getItem("user")))
  },[]);
  let frame;
  if (video) {
    
    frame = <center><iframe width="1200" height="700"  src={video}></iframe></center>;
  } 
  else {
    frame = <div style={{margin: '10% 20% 15% 30%'}}><h1 >Please search a song</h1></div>
  }
  return (
    <>
      <CommonLayout
      style='background:url("/assets/images/inner-page/breadcrumbe.jpg")'
        pathList={["blog", "blog grid view", "no sidebar"]}
        pathTitle="Courses"
      >
        <section className="agency blog blog-sec">
          <div>

            <div
              style={{
                width: "19%",
                margin: '1% 1% 1% 37%',
                display: "inline-block",
                padding: "1%",
              }}
            >
              
              <Input type="text" name="Search"  placeholder="Enter your song" onChange={event => setQuery(event.target.value)} />
            </div>
            <div style={{ display: "inline-block",margin: '1% 1% 1% 1%' }}>
              <Button className="btn btn-default primary-btn radius-0" onClick={getLyrics}>
                <i class="fa fa-search"></i>
              </Button>
            </div>
          </div>

          {useEffect}
          <Container >
   
              <div >
                {frame}
              </div>
  
          </Container>
        </section>{" "}
      </CommonLayout>
    </>
  );
}

export default NoSidebar;
