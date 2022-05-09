import React, { useContext, useEffect, useState } from "react";

import "./styleParticipants.css";
import"./feed2.css"
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  TabContent,
  TabPane,
  FormGroup,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  Form,
} from "reactstrap";
import CommonLayout from "../../containers/common/common-layout";

import { useRouter } from "next/router";

import Axios, * as others from "axios";

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
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { ListGroupItem, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";

import { BASE_URL } from "../../constant/constants";
import PopupCoursesTeachers from "./popup-add-teachers-to-courses";

function CoursesDetails(props) {
  const router = useRouter();
  const { id } = router.query;
  const [courses, setCourses] = useState({});
  const [coursesTeachers, setCoursesTeachers] = useState([]);
  const [coursesStudents, setCoursesStudents] = useState([]);
  const [usersss, setUsersss] = useState({});
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("");
  const [postcontent, setPostcontent] = useState("");
  const [newTeacher_id, setNewTeacher_id] = useState("");
  const [coursesList, setCoursesList] = useState([]);
  const [coursesRemoveTeacher, setCoursesRemoveTeacher] = useState([]);
  const [modal, setModal] = useState();
  const [activeTab, setActiveTab] = useState("1");
  const [postsList, setPostsList] = useState([]);
  const [session, setsession] = useState();
  const [name, setName] = useState("");
  /*const listItems = coursesTeachers.map((number) =>
  <li>{number}</li>
  );*/

  


  const toggle = () => {
    setModal(!modal);
  };

  if (!courses) {
    return <div>course Not Found</div>;
  }


  const onInputChange = (e) => {
    const formData = new FormData();
    formData.append("username",JSON.parse(localStorage.getItem("user"))._id);
    formData.append("photo", document.getElementById("image").files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios
      .post(BASE_URL+"courses/uploadPDF", formData, config)
  };

  const addpost = () => {
    if(postcontent!='')
    {
      const d = new Date();
      console.log("time "+d.getTime()+d.getHours()+d.getSeconds())
      Axios.post(BASE_URL+`courses/addpost`, {
        
        content: postcontent,
        pdf:"/images/files/"+JSON.parse(localStorage.getItem("user"))._id+d.getHours()+d.getMinutes()+".pdf",
        poster:JSON.parse(localStorage.getItem("user"))._id,
        course:id
      }).then(async (res) => {
        getCoursePosts()
      });
      onInputChange();
    }
   
  };

  const deleteteacher = (index) => {
      Axios.put(BASE_URL+`courses/removeteacherfromcourse/${id}`, {
        teacher_id: newTeacher_id,
      }).then( (res) => {
        console.log(index);
      });
   
  };

  const getCourse = () => {
    Axios.get(BASE_URL+`courses/${id}`).then(async (res) => {
      setCourses(res.data);
    });
  };

  const removeTeacher = (index) => {
    if(index){
      Axios.put(BASE_URL+`courses/removeteacherfromcourse/${id}`, {
      teacher_id: ''+index
    }).then((res) => {
        console.log(res.data);
    });
    }
    
  };

  const removeStudent = (index) => {
    if(index){
      Axios.put(BASE_URL+`courses/removestudentfromcourse/`, {
        course_id:id,
        student_id: ''+index
    }).then((res) => {
        console.log(res.data);
    });
    }
    
  };

  const getCoursesStudents = async () => {
    Axios.get(
      BASE_URL+`courses/retreivecoursestudents/${id}`
    ).then((res) => {
      if (res.data.teachers) {
        setCoursesStudents(res.data.students);
        // console.log(res.data.students);
      }
    });
  };

  const getCoursesTeachers = async () => {
    Axios.get(
      BASE_URL+`courses/retreivecourseteachers/${id}`
    ).then((res) => {
      if (res.data.teachers) {
        setCoursesTeachers(res.data.teachers);
        // console.log(res.data.teachers);
      }
    });
  };
  const updateCourses = (id) => {
    Axios.put(BASE_URL+`courses/${id}`, {
      name: newName,
      type: newType,

      _id: id,
    }).then((response) => {
      setCoursesList(
        coursesList.map((val) => {
          return val._id === id
            ? { _id: val._id, name: newName, user: newUser, type: newType }
            : val;
        })
      );
    });
  };
  
  
  
  const getCoursePosts = async () => {
    Axios.get(
      BASE_URL+`courses/getpostsbycourse/${id}`
    ).then((res) => {
      if(res.data){
        setPostsList(res.data)
        console.log(postsList)
      }
    });
  };

  let itemstest = []
  useEffect(() => {
    /* setCourses(coursesListe)


        getCoursesTeachers() */
    updateCourses(id);
    
    if (id) {
      getCourse();
      getCoursesTeachers();
      getCoursesStudents();
      getCoursePosts()
      
      
      /*
      setTimeout(() => {
        
        if(posts.length>0)
        {
          itemstest=posts
          setPostsList(posts)
          console.log(itemstest)
        }
       
      }, 1500);*/
      
    }
    
    
  }, [id]);
  let foundteacher = 0
  let source=""
  let sourcestudent=""
  let source2=""

  let loginimage
  if (typeof window !== 'undefined') {
    console.log(JSON.parse(localStorage.getItem("user"))._id)
    if(JSON.parse(localStorage.getItem("user")).hasImage==true)
    loginimage=<img src={"http://localhost:3000/images/users/"+JSON.parse(localStorage.getItem("user"))._id+".jpg"} ></img>

    else
    loginimage =<img src="https://bootdey.com/img/Content/avatar/avatar6.png"></img>
  }
  
  {postsList.sort((a,b) => b.createdAt > a.createdAt).map((item, index) => {

    if (typeof window !== 'undefined') 
    {
      if(localStorage.getItem("user"))
      {
        
        foundteacher = coursesTeachers.find(element => element._id == JSON.parse(localStorage.getItem("user"))._id);
        console.log(foundteacher)
          
        
      }
      
    }
    <li>
    <div class="timeline-time">
      <span class="date">{item.time}</span>
      <span class="time">{item.date}</span>
    </div>
    <div class="timeline-icon">
      <a href="javascript:;">&nbsp;</a>
    </div>
    <div class="timeline-body" style={{boxShadow :'rgb(215 215 215) 10px 5px 5px'}}>
      <div class="timeline-header">
          <span class="userimage">
            {
              (item.poster.hasImage==true)
              ?
              <img
              src={"http://localhost:3000/images/users/"+item.poster._id+".jpg"}
              alt=""
              ></img>
              
          
              :
              loginimage =<img src="https://bootdey.com/img/Content/avatar/avatar6.png"></img>
            }
          </span>
          <span class="username"><a href="javascript:;">{item.poster.firstname + item.poster.lastname}</a> <small></small></span>
          <span class="pull-right text-muted">18 Views</span>
      </div>
      <div class="timeline-content">
          <p>
            {item.content}
          </p>
          <p>
          <a href="http://localhost:3000/images/files" >{item.pdf}example</a>.
          </p>
      </div>
      <div class="timeline-likes">
          <div class="stats-right">
            <span class="stats-text">259 Shares</span>
            <span class="stats-text">21 Comments</span>
          </div>
          <div class="stats">
            <span class="fa-stack fa-fw stats-icon">
            <i class="fa fa-circle fa-stack-2x text-danger"></i>
            <i class="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
            </span>
            <span class="fa-stack fa-fw stats-icon">
            <i class="fa fa-circle fa-stack-2x text-primary"></i>
            <i class="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
            </span>
            <span class="stats-total">4.3k</span>
          </div>
      </div>
      <div class="timeline-footer">
          <a href="javascript:;" class="m-r-15 text-inverse-lighter"><i class="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
          <a href="javascript:;" class="m-r-15 text-inverse-lighter"><i class="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a> 
          <a href="javascript:;" class="m-r-15 text-inverse-lighter"><i class="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
      </div>
      <div class="timeline-comment-box">
          <div class="user">{loginimage}</div>
          <div class="input">
            <form action="">
                <div class="input-group">
                  <input type="text" class="form-control rounded-corner" placeholder="Write a comment..."></input>
                  <span class="input-group-btn p-l-10">
                  <button class="btn btn-primary f-s-12 rounded-corner" type="button" style={{
                marginTop: "10%",
              }}>Comment</button>
                  </span>
                </div>
            </form>
          </div>
      </div>
    </div>
  </li>

})}

   
  
  
  
  return (
    <CommonLayout
      pathList={["blog", "blog details", "Gallery Layout"]}
      pathTitle={"Course/"+courses.name}
    >
      <section className="agency blog-sec blog-sidebar single_blog_item">
        
      
        <Container style={{marginTop: '-5%'}}>
          <ModalBody>
         <center><h1 style={{marginTop: '2%'}}>{courses.name} </h1></center> 
          
            <div className="modal-body login-modal" style={{marginTop: '5%'}}>
              <Nav
                tabs
                className="nav nav-pills mb-5"
                style={{
                  backgroundImage: `url(
                    "https://png.pngtree.com/background/20210709/original/pngtree-starting-school-summer-vacation-student-training-course-picture-image_921426.jpg")`,
                }}
              >
                <NavItem style={{ marginLeft: "30%" }}>
                  <NavLink
                    className={activeTab == "1" ? "active" : ""}
                    onClick={() => setActiveTab("1")}
                  >
                    Feed
                  </NavLink>
                </NavItem>
                <NavItem >
                  <NavLink
                    className={activeTab == "2" ? "active" : ""}
                    onClick={() => setActiveTab("2")}
                  >
                   
                    Participants
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab == "3" ? "active" : ""}
                    onClick={() => setActiveTab("3")}
                  >
                  Courses Details
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent className="tab-content" activeTab={activeTab}>
              <TabPane
                  tabId="1"
                  aria-labelledby="pills-home-tab"
                  className=""
                  role="tabpanel"
                >
                  {/* <!-- courses details --> */}
                  
                     <ul class="timeline" >
                       <div class="timeline-comment-box" style={{width: '60%',marginLeft: '23%'}}>
                          <div class="user">{loginimage}</div>
                          <div class="input">
                            <form action="">
                                <div class="input-group">
                                  <input type="file" accept="application/pdf" name="image" id="image" placeholder="add PDF"/>
                                  <input type="text" class="form-control rounded-corner" placeholder="Create your Post..." onChange={(event) => {
                              setPostcontent(event.target.value);
                            }}></input>
                                  <span class="input-group-btn p-l-10">
                                  <button class="btn btn-primary f-s-12 rounded-corner" type="button" style={{margin:'18% 0% 0% 14%'}} onClick={addpost}>Post</button>
                                  </span>
                                </div>
                            </form>
                          </div>
                        </div>
                     
                      {postsList.sort((a,b) => b.createdAt > a.createdAt).map((item, index) => {

                              if (typeof window !== 'undefined') 
                              {
                                if(localStorage.getItem("user"))
                                {
                                  
                                  foundteacher = coursesTeachers.find(element => element._id == JSON.parse(localStorage.getItem("user"))._id);
                                  console.log(foundteacher)
                                    
                                  
                                }
                                
                              }
                        

                        return (
                          <li>
                          <div class="timeline-time">
                            <span class="date">{item.time}</span>
                            <span class="time">{item.date}</span>
                          </div>
                          <div class="timeline-icon">
                            <a href="javascript:;">&nbsp;</a>
                          </div>
                          <div class="timeline-body" style={{boxShadow :'rgb(215 215 215) 10px 5px 5px'}}>
                            <div class="timeline-header">
                                <span class="userimage">
                                  {
                                    (item.poster.hasImage==true)
                                    ?
                                    <img
                                    src={"http://localhost:3000/images/users/"+item.poster._id+".jpg"}
                                    alt=""
                                    ></img>
                                    
                                
                                    :
                                    loginimage =<img src="https://bootdey.com/img/Content/avatar/avatar6.png"></img>
                                  }
                                </span>
                                <span class="username"><a href="javascript:;">{item.poster.firstname + item.poster.lastname}</a> <small></small></span>
                                <span class="pull-right text-muted">18 Views</span>
                            </div>
                            <div class="timeline-content">
                                <p>
                                  {item.content}
                                </p>
                                <p>
                                {
                              
                                    <div>

                                    <a href={"http://localhost:3000"+item.pdf} > tap to see the joined pdf</a>


                                    </div>
                                    
                              
                                }
                                </p>
                            </div>
                            <div class="timeline-likes">
                                <div class="stats-right">
                                  <span class="stats-text">259 Shares</span>
                                  <span class="stats-text">21 Comments</span>
                                </div>
                                <div class="stats">
                                  <span class="fa-stack fa-fw stats-icon">
                                  <i class="fa fa-circle fa-stack-2x text-danger"></i>
                                  <i class="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
                                  </span>
                                  <span class="fa-stack fa-fw stats-icon">
                                  <i class="fa fa-circle fa-stack-2x text-primary"></i>
                                  <i class="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                                  </span>
                                  <span class="stats-total">4.3k</span>
                                </div>
                            </div>
                            <div class="timeline-footer">
                                <a href="javascript:;" class="m-r-15 text-inverse-lighter"><i class="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
                                <a href="javascript:;" class="m-r-15 text-inverse-lighter"><i class="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a> 
                                <a href="javascript:;" class="m-r-15 text-inverse-lighter"><i class="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
                            </div>
                            <div class="timeline-comment-box">
                                <div class="user">{loginimage}</div>
                                <div class="input">
                                  <form action="">
                                      <div class="input-group">
                                        <input type="text" class="form-control rounded-corner" placeholder="Write a comment..."></input>
                                        <span class="input-group-btn p-l-10">
                                        <button class="btn btn-primary f-s-12 rounded-corner" type="button" style={{
                                      marginTop: "10%",
                                    }}>Comment</button>
                                        </span>
                                      </div>
                                  </form>
                                </div>
                            </div>
                          </div>
                          </li>)
                    
                      })}

                     </ul>
                  {/* <!-- end courses form --> */}{" "}
                </TabPane>
                <TabPane
                  tabId="2"
                  aria-labelledby="pills-home-tab"
                  className=""
                  role="tabpanel"
                >
                  {/* <!-- courses details --> */}
                  <center>
                    <div class="container">
                      <div class="col-md-12">
                        <div class="m-portlet m-portlet--full-height ">
                          <div class="m-portlet__head">
                            <div class="m-portlet__head-caption">
                              <div class="m-portlet__head-title">
                                <h3 class="m-portlet__head-text">Teachers</h3>
                                <div style={{marginLeft: '130%',width: '100%'}} >
                                {coursesTeachers.map((item, index) => {

                                      if (typeof window !== 'undefined') 
                                      {
                                        if(localStorage.getItem("user"))
                                        {
                                          
                                          foundteacher = coursesTeachers.find(element => element._id == JSON.parse(localStorage.getItem("user"))._id);
                                          console.log(foundteacher)
                                            
                                          
                                        }
                                        
                                      }

                                })}

                                {
                                  (foundteacher!=null )
                                  ?
                                 <PopupCoursesTeachers/>
                                 : null

                                }
                                
                                </div>
                                
                              </div>
                            </div>
                          </div>
                          <div class="m-portlet__body">
                            <div class="tab-content">
                              <div
                                class="tab-pane active"
                                id="m_widget4_tab1_content"
                              >
                                <div class="m-widget4 m-widget4--progress">
                                  <div
                                    style={{
                                      display: "inline-block",
                                      marginLeft: "6%",
                                      marginBottom: "5%",
                                    }}
                                  >
                                   
                                  </div>
                                  {coursesTeachers.map((item, index) => {
                                    
                                    if (typeof window !== 'undefined') 
                                    {
                                      if(localStorage.getItem("user"))
                                      {
                                        
                                        foundteacher = coursesTeachers.find(element => element._id == JSON.parse(localStorage.getItem("user"))._id);
                                        console.log(foundteacher)
                                        if(foundteacher!=null && coursesTeachers.length>1)
                                          source=<button
                                          type="button"
                                          class="btn btn-outline-danger"
                                          style={{
                                            marginLeft: "41px",
                                            marginTop: "1px",
                                          }}
                                        >
                                          <i
                                            class="fa fa-trash"
                                            onClick={e => removeTeacher(item._id)}
                                          ></i>
                                        </button>


                                        
                                      }
                                      
                                    }
                                    return (
                                      
                                      <div class="m-widget4__item">
                                        <div class="m-widget4__img m-widget4__img--pic">
                                        {
                                            (item.hasImage==true)
                                            ?
                                            <img
                                            src={"http://localhost:3000/images/users/"+item._id+".jpg"}
                                            alt=""
                                           ></img>
                                            
                                        
                                            :
                                            loginimage =<img src="https://bootdey.com/img/Content/avatar/avatar6.png"></img>
                                          }
                                        </div>
                                        <div class="m-widget4__info">
                                          <span class="m-widget4__title">
                                            {item.firstname +' '+ item.lastname}
                                          </span>
                                        </div>
                                        <div class="m-widget4__ext">
                                          {source}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div
                                class="tab-pane"
                                id="m_widget4_tab2_content"
                              ></div>
                              <div
                                class="tab-pane"
                                id="m_widget4_tab3_content"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="col-md-12">
                        <div class="m-portlet m-portlet--full-height ">
                          <div class="m-portlet__head">
                            <div class="m-portlet__head-caption">
                              <div class="m-portlet__head-title">
                                <h3 class="m-portlet__head-text">Students</h3>
                              </div>
                            </div>
                          </div>
                          <div class="m-portlet__body">
                            <div class="tab-content">
                              <div
                                class="tab-pane active"
                                id="m_widget4_tab1_content"
                              >
                                <div class="m-widget4 m-widget4--progress">
                                  {coursesStudents.map((item, index) => {
                                    if(foundteacher!=null)
                                    sourcestudent=<button
                                    type="button"
                                    class="btn btn-outline-danger"
                                    style={{
                                      marginLeft: "41px",
                                      marginTop: "1px",
                                    }}
                                  >
                                    <i
                                      class="fa fa-trash"
                                      onClick={e => removeStudent(item._id)}
                                    ></i>
                                  </button>
                                    return (
                                      <div class="m-widget4__item">
                                        <div class="m-widget4__img m-widget4__img--pic">
                                          {
                                            (item.hasImage==true)
                                            ?
                                            <img
                                            src={"http://localhost:3000/images/users/"+item._id+".jpg"}
                                            alt=""
                                           ></img>
                                            
                                        
                                            :
                                            loginimage =<img src="https://bootdey.com/img/Content/avatar/avatar6.png"></img>
                                          }
                                          
                                        </div>
                                        <div class="m-widget4__info">
                                          <span class="m-widget4__title">
                                            {item.firstname}
                                          </span>
                                        </div>
                                        <div class="m-widget4__ext">
                                          {sourcestudent}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div
                                class="tab-pane"
                                id="m_widget4_tab2_content"
                              ></div>
                              <div
                                class="tab-pane"
                                id="m_widget4_tab3_content"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </center>
                  
                  {/* <!-- end courses form --> */}{" "}
                </TabPane>
                <TabPane
                  tabId="3"
                  aria-labelledby="pills-profile-tab"
                  className=""
                  role="tabpanel"
                >
                  {/* <!-- participants form --> */}
                  <Form>
                    <center>
                      <div className="form-row">
                        <FormGroup className="col-md-12">
                          <Label>Name : {courses.name}</Label>
                          
                          {
                          (foundteacher)
                          ?
                          <Input
                            style={{ width: "30%" }}
                            className="form-control"
                            placeholder="Name"
                            onChange={(event) => {
                              setNewName(event.target.value);
                            }}
                          />
                        : null

                        }
                        </FormGroup>
                        <FormGroup className="col-md-12">
                          <Label>Type : {courses.type}</Label>
                          {
                          (foundteacher)
                          ?
                          <Input
                          style={{ width: "30%" }}
                          className="form-control"
                          placeholder="Type"
                          onChange={(event) => {
                            setNewType(event.target.value);
                          }}
                        />
                        : null

                        }
                          
                        </FormGroup>
                      </div>
                      {
                        (foundteacher)
                        ?
                          
                          <button
                          className="btn primary-btn btn-default text-uppercase"
                          onClick={() => {
                            updateCourses(id);
                          }}
                          >
                            Update Courses  
                          </button>
                      : null

                      }
                      
                    </center>
                  </Form>
                  {/* <!-- end participants form --> */}{" "}
                </TabPane>
              </TabContent>
            </div>
          </ModalBody>
        </Container>
      </section>
    </CommonLayout>
  );
}

/* CoursesDetails.getInitialProps = async (ctx) => { const res = await Axios.get(BASE_URL+`courses/${
        ctx.query.id
    }`).then(async () => {
        console.log('test')
    })
    const resTeachers = await Axios.get(BASE_URL+`courses/retreivecourseteachers/${
        ctx.query.id
    }`).then(() => {
        console.log('test')

    })

    return {ctx: ctx}


} */

export default CoursesDetails;
