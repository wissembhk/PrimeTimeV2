import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios';
import { BASE_URL } from '../../../../constant/constants';


const Video = () => {
    const [modal, setModal] = useState();
    const [featuredStreamer, setFeaturedStreamer] = useState();
    let count=0;
    const getfeaturedStreamer = async () =>
    axios
      .get(
        BASE_URL+"stream/getFeaturedStreamer"
      )
      .then((res) => {
        setFeaturedStreamer(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
     
      useEffect(() => {  
          
        getfeaturedStreamer()        
                          
        },[]);

        useEffect(() => {  
          if (featuredStreamer)
            setImgsrc("images/streams/"+featuredStreamer.streamer.streamerName.split(" ")[0]+"_"+featuredStreamer.streamer.streamerName.split(" ")[1]+"_"+featuredStreamer.streamer.streamTitle+".jpg")
              
            },[featuredStreamer]);


       
     // console.log("featured streamer name :",featuredStreamer["streamerName"]);
    const toggle = () => {
        setModal(!modal)
    }
    const [imgsrcc,setImgsrc]=useState("/assets/images/music/singer.png")


        
    return (
        <section className="music bg-video format  " style={{backgroundColor:"black",paddingTop:"10%"}}>
            <Container>
                <Row>
                    <Col md="6">
                        <img alt="" className="img-fluid p-2 mr-5" src={imgsrcc} />
                    </Col>
                    <Col md="6">
                        <div className="center-text">
                            <div>
                                <div className="format-small-text">
                                    <h6 className="gradient-text hash-video">#video</h6>
                                </div>
                                <div className="format-head-text">
                                    {featuredStreamer ? (<h3 className="about-font-header">{featuredStreamer.streamer.streamerName}</h3>):null}
                                    
                                </div>
                                <div className="format-sub-text">
                                    <div className="sub-heading">
                                        <h6 className="sub-small-text">Live now!</h6>
                                    </div>
                                    <p className="text-white sub-para">
                                        Check out our most viewed streamer right now
                                </p>
                                </div>
                                <div className="m-b-40">
                                    <div className="link-horizontal">
                                    {featuredStreamer ? (
                                        <ul>
                                            <li>
                                                <a className="button icon-btn d-flex" href={"/streams/channel?id="+featuredStreamer.stid}>
                                                    <i aria-hidden="true" className="fa fa-play video-icon center-content m-0" ></i>
                                                    <div className="watch-now center-content">
                                                        <h6 className="watch" >Watch Now</h6>
                                                    </div>
                                                </a>
                                             
                                            </li>
                                        </ul>):null}
                                    </div>
                                </div>
                                {/* <div className="d-flex">
                                    <a href="#"><h6 className="watch">see all video<i aria-hidden="true"
                                        className="fa fa-arrow-right m-l-15"></i></h6></a>
                                </div> */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}


export default Video;