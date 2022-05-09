import React, { Fragment, useEffect, useState, useContext } from "react";
import Layout from "../containers/common/common-layout";
import axios from "axios";
import "../public/assets/person.css";
import CourseCard from "../components/CourseCard";
import "./style.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BASE_URL } from "../constant/constants";

const PortfolioDetail7 = () => {
  const [allStreams, setAllStreams] = useState([]);

  const [expires, setExpires] = useState("");
  const [user, setUser] = useState({ firstName: "", lastName: "" });
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const [recordedStreams, setRecordedStreams] = useState([]);

  const getRecordedStreams = async () =>
    axios
      .get(
        BASE_URL+"stream/getStreamByName2/" +
          JSON.parse(localStorage.getItem("user"))["firstName"] +
          " " +
          JSON.parse(localStorage.getItem("user"))["lastName"]
      )
      .then((res) => {
        setRecordedStreams(res.data);
        console.log(res.data+"rahouu mech erorrrrrrrrrrrrr");
      })
      .catch(function (error) {
        console.log(error+"rahouu erorrrrrrrrrrrrr");
      });

  const getAllStreamsByName = async () =>{
    console.log("triggerrrrrringg")
    axios
      .get(
        BASE_URL+"stream/getAllStreamsByName/" +
          JSON.parse(localStorage.getItem("user"))["firstName"] +
          " " +
          JSON.parse(localStorage.getItem("user"))["lastName"]
      )
      .then((res) => {
        setAllStreams(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  //---------STATS--->

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly viewer count",
      },
    },
  };

  let labels = [];
  let data = {
    labels,
    datasets: [
      {
        label: "Views per day",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      /*{
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },*/
    ],
  };

  //---------STATS--->>>>>>>

  const [courses, setCourses] = useState([]);

  const getCourses = async () =>
    axios
      .get(
        BASE_URL+"user/getCoursesByUserId/" +
          JSON.parse(localStorage.getItem("user"))["_id"]
      )
      .then((res) => {
        setCourses(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  const [channeldescription, setChannelDescription] = useState({
    userid: "",
    text: "",
  });
  const [imgsrc, setImgsrc] = useState("");
  const [userData, setUserData] = useState({
    userid: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
    facebook: "",
    instagram: "",
    youtube: "",
    spotify: "",
  });

  useEffect(() => {
    if (user) {
      setImgsrc("images/users/" + user["_id"] + ".jpg");
      if (JSON.parse(localStorage.getItem("user"))["role"] != "user")
        setExpires(
          JSON.parse(localStorage.getItem("user"))["expiration"].split("T")[0]
        );
      setUserData({
        userid: user["_id"],
        firstname: user["firstName"],
        lastname: user["lastName"],
        phonenumber: user["phone"],
        facebook: user["facebook"],
        instagram: user["instagram"],
        youtube: user["youtube"],
        spotify: user["spotify"],
      });
      setChannelDescription({
        userid: user["_id"],
        text: user["channelDescription"],
      });
      getCourses();
      getRecordedStreams();
      
      
     
      if (user["_id"] != undefined) getfollowersnumber();
      getfollowed();
    }
    
  }, [user]);

  let xData = allStreams.map((e) => {
    let date = new Date(e.created_at);
    return date.toLocaleDateString("fr-FR");
  });
  let yData = allStreams.map((e) => e.totalViews);
  data.labels = xData;
  data.datasets[0].data = yData;

  useEffect(() => {
    getAllStreamsByName();
    console.log("streamzzzzzzzzz",allStreams)
  },[courses]);

  console.log("X :",xData);
  console.log("Y :",yData);

  const onInputChange = (e) => {
    const formData = new FormData();
    formData.append("username", user["_id"]);
    formData.append("photo", e.target.files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(BASE_URL+"user/uploadProfileImg", formData, config)
      .then(window.location.reload());
  };
  const imgClicked = (e) => {
    e.preventDefault();
    document.getElementById("file-input").click();
  };
  const [editabledesc, setEditabledesc] = useState(false);
  const onOffEditdesc = () => {
    setEditabledesc(!editabledesc);
  };
  const [editable, setEditable] = useState(false);
  const onOffEdit = () => {
    setEditable(!editable);
  };
  const sendUpdateRequest = () => {
    axios
      .post(BASE_URL+"user/updateProfile", userData)
      .then(() => {
        user.firstName = userData.firstname;
        user.lastName = userData.lastname;
        user.phone = userData.phonenumber;
        user.facebook = userData.facebook;
        user.instagram = userData.instagram;
        user.youtube = userData.youtube;
        user.spotify = userData.spotify;
        setEditable(!editable);
        // setUser(user)
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendChannelDescription = () => {
    axios
      .post(
        BASE_URL+"user/updateChannelDescription",
        channeldescription
      )
      .then(() => {
        user.channelDescription = channeldescription.text;

        setEditabledesc(!editabledesc);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRecord = (meetid) => {
    axios
      .get(BASE_URL+"stream/fetchSessions/" + meetid)
      .then((res) => {
        console.log(res.data)
        if (res.data.data[0])
          window.location.href = res.data.data[0].file.fileUrl;
      });
  };
  const [followers, setfollowers] = useState(0);
  const [followed, setfollowed] = useState([]);

  const getfollowersnumber = () => {
    axios
      .get(BASE_URL+"user/getfollowersnumber/" + user["_id"])
      .then((res) => {
        setfollowers(res.data.followers_number);
      })
      .catch((err) => console.log(err));
  };
  const getfollowed = () => {
    axios
      .get(BASE_URL+"user/getfollowed/" + user["_id"])
      .then((res) => {
        setfollowed(res.data.followed);
      })
      .catch((err) => console.log(err));
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  //const [fullAnim,,setFullAnim]= useState();
  const [finishAnim, setFinishAnim] = useState(false);

  if (typeof window !== "undefined") {
    var textWrapper = document.querySelector(".ml11 .letters");
    if (textWrapper){
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /([^\x00-\x80]|\w)/g,
      "<span class='letter'>$&</span>"
    );

    if (finishAnim == false) {
      
      var animation = anime
        .timeline({
          loop: true,
          autoplay: true,
        })
        .add({
          targets: ".ml11 .line",
          translateX: [
            0,
            document.querySelector(".ml11 .letters").getBoundingClientRect()
              .width + 10,
          ],
          easing: "easeOutExpo",
          duration: 1100,
          delay: 100,
        })
        .add({
          targets: ".ml11 .letter",
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1000,
          offset: "-=775",
          delay: (el, i) => 34 * (i + 1),
        })
        .add({
          targets: ".ml11",
          opacity: 0,
          duration: 1400,
          easing: "easeOutExpo",
          delay: 1000,
        });
      //setTimeout(animation.pause(), 10000);
    }
  }
  }

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  return (
    <Fragment>
      <Layout>
        
        

         {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>  */}

        <section>
          <div className="animated-bg" style={{ right: "10%" }}>
            <i></i>
            <i></i>
          </div>
          <div className="d-flex" style={{height:"1350px"}}>
            <div className="isar w-25 pl-3">
              <div className="d-block">
                <div
                  className="product-right pro_sticky_info w-100"
                  style={{ "margin-right": "50%" }}
                  data-sticky_column
                >
                  <div className="portfolio-detail">
                    <div className="d-flex w-100 justify-content-between">
                      <h3 className="detail-head">Profile detail</h3>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                        onClick={onOffEdit}
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </div>
                    <div className="mb-3">
                      <input
                        type="file"
                        id="file-input"
                        style={{
                          overflow: "hidden",
                          height: "0px",
                          width: "0px",
                        }}
                        accept="image/*"
                        onChange={onInputChange}
                      ></input>
                      <a onClick={imgClicked} className="w-100 pb-3">
                        <img
                          id="profileimg"
                          alt="add profile image"
                          className="rounded-circle w-50 mx-auto "
                          src={imgsrc}
                          style={{ display: "block" }}
                        />{" "}
                      </a>
                      <div className="text-center">followers:{followers}</div>
                    </div>
                    {editable ? (
                      <>
                        <div className="detail-container d-flex mt-3 ">
                          <div className="portfolio-left">
                            <h5 className="text-left">First Name: </h5>
                          </div>
                          <div className="portfolio-right">
                            <input
                              value={userData.firstname}
                              className="border border-dark rounded w-75"
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  firstname: e.target.value,
                                })
                              }
                            ></input>
                          </div>
                        </div>

                        <div className="detail-container d-flex ">
                          <div className="portfolio-left">
                            <h5 className="text-left">Last Name: </h5>
                          </div>
                          <div className="portfolio-right">
                            <input
                              value={userData.lastname}
                              className="border  border-dark rounded w-75"
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  lastname: e.target.value,
                                })
                              }
                            ></input>
                          </div>
                        </div>

                        <div className="detail-container d-flex ">
                          <div className="portfolio-left">
                            <h5 className="text-left">Phone: </h5>
                          </div>
                          <div className="portfolio-right">
                            <input
                              type="number"
                              value={userData.phonenumber}
                              className="border  border-dark rounded w-75"
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  phonenumber: e.target.value,
                                })
                              }
                            ></input>
                          </div>
                        </div>

                        <div className="detail-container d-flex ">
                          <div className="portfolio-left">
                            <h5 className="text-left">facebook: </h5>
                          </div>
                          <div className="portfolio-right">
                            <input
                              type="text"
                              value={userData.facebook}
                              className="border  border-dark rounded w-75"
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  facebook: e.target.value,
                                })
                              }
                            ></input>
                          </div>
                        </div>

                        <div className="detail-container d-flex ">
                          <div className="portfolio-left">
                            <h5 className="text-left">instagram: </h5>
                          </div>
                          <div className="portfolio-right">
                            <input
                              type="text"
                              value={userData.instagram}
                              className="border  border-dark rounded w-75"
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  instagram: e.target.value,
                                })
                              }
                            ></input>
                          </div>
                        </div>

                        <div className="detail-container d-flex ">
                          <div className="portfolio-left">
                            <h5 className="text-left">youtube: </h5>
                          </div>
                          <div className="portfolio-right">
                            <input
                              type="text"
                              value={userData.youtube}
                              className="border  border-dark rounded w-75"
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  youtube: e.target.value,
                                })
                              }
                            ></input>
                          </div>
                        </div>

                        <div className="detail-container d-flex ">
                          <div className="portfolio-left">
                            <h5 className="text-left">Spotify: </h5>
                          </div>
                          <div className="portfolio-right">
                            <input
                              type="text"
                              value={userData.spotify}
                              className="border  border-dark rounded w-75"
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  spotify: e.target.value,
                                })
                              }
                            ></input>
                          </div>
                        </div>
                        <div className="text-center my-3">
                          <a
                            className="btn btn-default primary-btn radius-0"
                            onClick={sendUpdateRequest}
                          >
                            update
                          </a>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="detail-container d-flex mt-3 ">
                          <div className="portfolio-left">
                            <h5 className="text-left">First Name: </h5>
                          </div>
                          <div className="portfolio-right">
                            <h5>{user["firstName"]}</h5>
                          </div>
                        </div>

                        <div className="detail-container d-flex ">
                          <div className="portfolio-left">
                            <h5 className="text-left">Last Name: </h5>
                          </div>
                          <div className="portfolio-right">
                            <h5>{user["lastName"]}</h5>
                          </div>
                        </div>

                        <div className="detail-container d-flex ">
                          <div className="portfolio-left">
                            <h5 className="text-left">Phone: </h5>
                          </div>
                          <div className="portfolio-right">
                            <h5>+216 {user["phone"]}</h5>
                          </div>
                        </div>

                        <div className="detail-container d-flex ">
                          <div className="portfolio-left">
                            <h5 className="text-left">Email: </h5>
                          </div>
                          <div className="portfolio-right">
                            <h5>{user["email"]}</h5>
                          </div>
                        </div>
                        <div className="detail-container d-flex ">
                          <div className="portfolio-left">
                            <h5 className="text-left">Role:</h5>
                          </div>
                          <div className="portfolio-right">
                            <h5>{user["role"]}</h5>
                          </div>
                        </div>

                        {user["role"] != "user" ? (
                          <div className="detail-container d-flex ">
                            <div className="portfolio-left">
                              <h5 className="text-left">expiration:</h5>
                            </div>
                            <div className="portfolio-right">
                              <h5>{expires}</h5>
                            </div>
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                  {user["role"] == "musician" ? (
                    <div className="portfolio-detail m-t-10">
                      <div className="d-flex w-100 justify-content-between">
                        <h3 className="detail-head">My Channel description</h3>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                          onClick={onOffEditdesc}
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </div>
                      {!editabledesc ? (
                        <p>{user["channelDescription"]}</p>
                      ) : (
                        <>
                          <textarea
                            className="w-100"
                            value={channeldescription.text}
                            onChange={(e) =>
                              setChannelDescription({
                                ...channeldescription,
                                text: e.target.value,
                              })
                            }
                          ></textarea>
                          <div className="text-center m-t-10">
                            <a
                              className="btn btn-default primary-btn radius-0"
                              onClick={sendChannelDescription}
                            >
                              update
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          {user["role"]=="musician"?(
            <div className="imin" style={{ width: "75%", "margin-left": "2%" }}>
              <div
                className="d-flex justify-content-between "
                style={{ width: "87%" }}
              >
                <h2 className="mb-3">my courses</h2>
                <div className="">
                  {user["role"] == "musician" ? (
                    <a href="/streams/launchStream">
                      <span style={{ color: "red" }}> Go live </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        class="bi bi-person-video3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z" />
                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z" />
                      </svg>
                    </a>
                  ) : null}
                </div>
              </div>
              
              <div
                className="d-flex"
                style={{
                  overflow: "scroll",
                  height: "40%",
                  width: "100%",
                  "flex-wrap": "wrap",
                }}
              >
                {courses.map((course) => {
                  return <CourseCard course={course} />;
                })}
              </div>

              <div style={{ height: "40%", width: "100%",marginBottom:"15%" }} >
                <div className="d-flex">
                  <div style={{ width: "40%" }} className="recordes">
                    <h2 className="mb-3">my recordings</h2>
                    <div
                      className="  mr-3  border border-2 sandou9elrecordes "
                      style={{ overflow: "scroll" }}
                    >
                      {recordedStreams.map((recordedstream) => {
                        let date = recordedstream.created_at.split("T");
                        return (
                          <div
                            className="d-flex justify-content-between"
                            style={{ cursor: "pointer" }}
                            onClick={() => getRecord(recordedstream.meetingId)}
                          >
                            <span className="h5 m-2">
                              {recordedstream.streamTitle}
                            </span>
                            <span className="m-2">{date[0]}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="followers" style={{ width: "40%" }}>
                    <h2 className="">Followed channels</h2>
                    <div
                      className="border border-1 mt-3 d-flex justify-content-between flex-wrap "
                      style={{
                        width: "97%",
                        height: "250px",
                        overflow: "scroll",
                      }}
                    >
                      {followed.map((f) => {
                        return (<a  href={"/streams/channel?id="+f._id}><div className="d-flex flex-column">
                          <img
                            src={"images/users/" + f._id + ".jpg"}
                            className="rounded-circle mx-3 mt-3"
                            style={{ width: "80px", height: "80px" }}
                          ></img><br></br>
                          <span className="text-center">{f.firstname}</span>
                          </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="stats" style={{ width: "84%",marginTop:"5%" }}>
                  <h2 className="mt-3">stats</h2>
                  <div className=" border border-2 sandou9elstats">
                    <Bar
                      options={options}
                      data={data}
                      style={{ height: "500px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ):
          <div className="imin" style={{ width: "75%", "margin-left": "2%" }}>
            
            <div
          className="d-flex justify-content-between "
          style={{ width: "87%" }}
        >
          <h2 className="mb-3">my courses</h2>
          
            </div>
            <div
                className="d-flex"
                style={{
                  overflow: "scroll",
                  height: "60%",
                  width: "100%",
                  "flex-wrap": "wrap",
                }}
              >
                {courses.map((course) => {
                  return <CourseCard course={course} />;
                })}
              </div>
              <div style={{ height: "40%", width: "100%",marginBottom:"15%" }} >
              <div className="followers" style={{ width: "40%" }}>
                    <h2 className="">Followed channels</h2>
                    <div
                      className="border border-1 mt-3 d-flex justify-content-between flex-wrap "
                      style={{
                        width: "97%",
                        height: "250px",
                        overflow: "scroll",
                      }}
                    >
                      {followed.map((f) => {
                        return (<a  href={"/streams/channel?id="+f._id}><div className="d-flex flex-column">
                          <img
                            src={"images/users/" + f._id + ".jpg"}
                            className="rounded-circle mx-3 mt-3"
                            style={{ width: "80px", height: "80px" }}
                          ></img><br></br>
                          <span className="text-center">{f.firstname}</span>
                          </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

        </div>
        
        }
          </div>
        </section>
      </Layout>
    </Fragment>
  );
};

export default PortfolioDetail7;