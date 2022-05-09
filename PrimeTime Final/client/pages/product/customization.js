import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";

// import Custom Components
import CommonLayout from "../../containers/common/common-layout";
import "./text.css"
const ListNoSidebar = () => {
  useEffect(() => {
    document.body.style.setProperty("--primary", "#10266b");
    document.body.style.setProperty("--secondary", "#464545");
    document.body.style.setProperty("--light", "#1F357D");
    document.body.style.setProperty("--dark", "#04185B");
    if(localStorage.getItem("user")){
      document.getElementById("violon").src =
      "http://localhost:3002?id=" +
      JSON.parse(localStorage.getItem("user"))._id;
    }else{
      document.getElementById("Login")
    }
    
    //  document.getElementById("violon").src ="http://localhost:3001?id="+JSON.parse(localStorage.getItem("user"))._id;
  });
  return (
    <>
      <CommonLayout
        pathList={["blog", "blog list view", "no sidebar"]}
        pathTitle="BLOG WITH NO-SIDEBAR"
      >
        <section className="agency blog blog-sec blog-list blog-no-sidebar">
          <Container>
            <div id="pagetodownload">
            {
                (typeof window !== 'undefined') 
                ?  localStorage.getItem("user")
                  ?
                  <iframe id="violon" height="720" width="1400"></iframe>
                  : <h1 id="welcome" className="letters">Please Login For A Customization</h1>


                :  null
              }
              
            
            </div>
            
          </Container>
        </section>
      </CommonLayout>
    </>
  );
};

export default ListNoSidebar;
