import React, { useState, useEffect } from "react";
import Axios, * as others from "axios";
import { Container, Row } from "reactstrap";
import NextLink from "next/link";
import { Label, Input, Button } from "reactstrap";
// import Custom Components


import CommonLayout from "../../containers/common/common-layout";
import CardWrapper from "../../containers/blog/card/grid-wrapper";
import PopupCourses from "./popup-add-courses";
import StripeContainerCourses from "../../components/StripeContainerCouses";
import { BASE_URL } from "../../constant/constants";
function NoSidebar() {
  const [coursesList, setCoursesList] = useState([]);
  const [session, setsession] = useState();
  const [search, setSearch] = useState('');
  const [showItem, setShowItem] = useState(false);
  const getCourses = () => {
    Axios.get(BASE_URL+"courses").then((response) => {
      if(search.length==0)
      setCoursesList(response.data);
    });
  };

  const deleteCourses = (id) => {
    Axios.delete(BASE_URL+`courses/${id}`).then((response) => {
      setCoursesList(
        coursesList.filter((val) => {
          return val._id !== id;
        })
      );
    });
  };

  const searchCourses = () => {
    Axios.get(BASE_URL+`courses/searchcourse/`+search).then((response) => {
      if(search.length>0)
      setCoursesList(response.data);
      console.log(search.length)
    });
  };
  useEffect(() => {
    if(search.length==0)
    getCourses();
    setsession(JSON.parse(localStorage.getItem("user")))
    console.log(session)
  },[getCourses()]);

  let deletecourse

 
  
  
  
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
                display: "inline-block",
                marginLeft: "16%",
                marginBottom: "5%",
              }}
            >
              {
                (typeof window !== 'undefined') 
                ?  (localStorage.getItem("user"))
                  ?  (JSON.parse(localStorage.getItem("user")).role=="musician")
                    ?
                    <PopupCourses />
                    : null


                  : null


                : null
              }
             
            </div>

            <div
              style={{
                width: "19%",
                marginLeft: "36%",
                display: "inline-block",
                padding: "1%",
              }}
            >
              {" "}
              <Input type="text" name="Search" onChange={(event) => {
                              setSearch(event.target.value);
                              console.log(search.length)
                            }}/>
            </div>
            <div style={{ display: "inline-block" }}>
              <Button className="btn btn-default primary-btn radius-0" onClick={searchCourses()}>
                <i class="fa fa-search"></i>
              </Button>
            </div>
          </div>

          
          <Container className="no-side">
            <Row>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
              <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
              <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
              <div class="box">
                  <div class="container">
                    <div class="row">
                    {coursesList.map((val, index) => {
                      let foundteacher = 0
                      let foundstudent = 0
                    let source="#"
                    if (typeof window !== 'undefined') 
                    {
                      if(localStorage.getItem("user"))
                      {
                        foundteacher = val.teachers.find(element => element == JSON.parse(localStorage.getItem("user"))._id);
                        foundstudent = val.students.find(element => element == JSON.parse(localStorage.getItem("user"))._id);
                        if(foundteacher!=null || foundstudent != null)
                          source="/courses/"+val._id
                      }
                      
                    }
                    return (
                      <>
                      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            
                            <div class="box-part text-center" style={{width:'400px'}}>


                              <NextLink href={source} passHref>
                                  <div class="p-2"
                                  >
                                    <CardWrapper 
                                      key={`grid-no-sidebar-${index}`}
                                      name={val.name}
                                      type={val.type}
                                      user={val.user}
                                      price={val.price}
                                      image={"http://localhost:3000/images/users/"+val.teachers[0]+".jpg"}
                                    />
                                  </div>
                                </NextLink>
                                <div class="d-flex align-items-center"> 
                                {
                                  

                                  localStorage.getItem("user")
                                  ?
                                    (JSON.parse(localStorage.getItem("user"))._id==val.teachers[0])
                                    ?
                                    <div style={{
                                      marginLeft: "35%",
                                      marginRight: "10%",
                                      marginTop: "-3%"
                                    }}>
                                    
                                      <button type="button" 
                                        onClick={() => {
                                          deleteCourses(val._id);
                                        }} class="btn btn-danger">   <i className="fa fa-trash"></i> Delete Course</button>
                                    </div>
                                    : null

                                  : null
                                }
                                {
                                
                                


                                  localStorage.getItem("user")
                                  ?
                                    (JSON.parse(localStorage.getItem("user"))._id!=val.teachers[0])
                                    ?
                                    
                                      showItem ? (
                                        <StripeContainerCourses x={val.price} idstudent={val._id} idcourse={JSON.parse(localStorage.getItem("user"))._id} />
                                        
                                      ) : (
                                        
                                        (foundteacher==null && foundstudent == null)
                                        ?  
                                          <div style={{
                                            marginLeft: "35%",
                                            marginRight: "10%",
                                            marginTop: "-3%"
                                          }}>
                                           
                                           <button class="btn  btn-primary float-right"  onClick={() => setShowItem(true)}>  <i className="fa fa-shopping-cart">   </i>    Buy now {val.price}$  </button>
                                             </div>
                                        : null
                                      )
                                    : null

                                  : null
                                }
                                
                                </div>
                                                  
                                    </div>
                                  </div>


                        <div>

                        

                      </div>
                      </>
                    );
                  })}
                      
                  
                  </div>		
                  </div>
              </div>
              
            </Row>
          </Container>
        </section>{" "}
      </CommonLayout>
    </>
  );
}

export default NoSidebar;
