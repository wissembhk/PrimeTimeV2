import React from 'react';
import Slider from "react-slick";
import { ArtistData } from '../../../../database/layouts/music/database';
import {Container,Row,Col} from 'reactstrap'
import axios from 'axios';
import { useEffect,useState } from 'react';
import { BASE_URL } from '../../../../constant/constants';
var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    swipeToSlide: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 767,
            settings: { slidesToShow: 1 }
        },
        {
            breakpoint: 992,
            settings: { slidesToShow: 2 }
        }
    ]
};



const Artist = () => {

    const [users,setUsers]=useState([]);

    const topUsers = async () => 
    axios
      .get(
        BASE_URL+"user/topUsers"
      )
      .then((res) => {
        setUsers(res.data);
        console.log("top users : ",res.data)
      })
      .catch(function (error) {
        console.log(error);
      });

      useEffect(() => {
          topUsers();
          console.log("test wele faza");
       }, []);
    return(
    <section className="music artist bg-artist bg-shadow-top-bottom" id="artist" >
        <Container>
            <Row>
                <Col md="10" className="offset-md-1">
                    <div className="title title4">
                        <div className="main-title">
                            <h2>Top Streamers</h2>
                        </div>
                        <div className="sub-title">
                            <p> 2021</p>
                        </div>
                    </div>
                </Col>
                <Col xs="12">
                    <Slider className="owl-carousel owl-theme artist-slider" {...settings}>
                        {users.map((data, i) => {
                            console.log("aaaaaaaaaaaaaaaaaaaaa")
                            return (
                                <div className="item" key={i}>
                                    <div className="album-artist text-center">
                                        <img style={{maxHeight:"500px",minHeight:"500px"}} alt="" className="img-fluid set-relative overlay-img"
                                            src={"images/users/"+data._id+".jpg"} />
                                        <div>
                                            <div className="overlay-box2"></div>
                                        </div>
                                        <div className="set-abs bottom-0 w-100 text-left set-z-index">
                                            <div className="singers">
                                                <div className="m-b-10">
                                                    <h5 className="name text-white">{data.firstName}</h5>
                                                    <h6 className="musician text-white">{data.followers}</h6>
                                                </div>
                                                <div className="rate">
                                                    <div>
                                                        <div className="progress">
                                                            <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="70"
                                                                className="progress-bar" role="progressbar" style={{ width: "70%" }}>
                                                                <span className="sr-only">{data.sr}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="set-abs cds">
                                            <img alt="" className="cd-animation" src="/assets/images/music/artist/cd1.png" />
                                            <img alt="" className="elipse" src="/assets/images/music/artist/Ellipse.png" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </Slider>
                    <div className="artist-text text-center">
                        <p className="text-white text-para">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                            the industry's
                            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a
                            type specimen book.
                    </p>
                        <h4 className="text-uppercase dummy-text text-white">“ dummy text of the ”</h4>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
)
                    }
export default Artist;