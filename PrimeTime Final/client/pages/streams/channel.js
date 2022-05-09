import React, { Fragment, useState, useEffect } from 'react';
import Layout from '../../containers/common/common-layout'
import axios from 'axios';
import Slider from 'react-slick';
import { PortfolioDetail1Data } from './database';
import { BASE_URL } from '../../constant/constants';


const images = [
    require('../../public/assets/images/portfolio/2.jpg'),
    require('../../public/assets/images/portfolio/3.jpg'),
    require('../../public/assets/images/portfolio/5.jpg'),
    require('../../public/assets/images/portfolio/4.jpg'),
    require('../../public/assets/images/portfolio/5.jpg')
]


var settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
};
var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    arrows: true,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1200,
            settings: { slidesToShow: 4 }
        },
        {
            breakpoint: 992,
            settings: { slidesToShow: 2 }
        },
        {
            breakpoint: 575,
            settings: { slidesToShow: 1 }
        }
    ]
};

const PortfolioDetail2 = () => {
   const [stream,setStream]=useState();
   const [user,setUser]=useState();
   useEffect(() => {
    
    setUser(JSON.parse(localStorage.getItem("user")))

  },[]);
  const [following,setFollowing]=useState(false)
  const checkfollow=()=>{
      axios.get('http://localhost:5000/user/checkfollowing/'+user["_id"]+'/'+streamer['_id']).then((res)=>{
          setFollowing(res.data.isfollowing)
      }

      )
  }

  const addfollow=()=>{
      axios.post('http://localhost:5000/user/addToFollowersList',{following:streamer['_id'],userid:user["_id"]}).then(()=>
      {
          setFollowing(true);
          console.log("test");
      }
      )
      
  }

  const Deletefollow=()=>{
    axios.post('http://localhost:5000/user/removefollow',{following:streamer['_id'],userid:user["_id"]}).then(()=>
    {
        setFollowing(false);
    }
    )
    
}


  const getRecord= (meetid)=>{
    
    axios.get('http://localhost:5000/stream/fetchSessions/'+meetid).then((res)=>{ window.location.href=res.data.data[0].file.fileUrl})
    
  }
  const [streamer,setStreamer]=useState();
    const getStream = async(para) =>
   
    axios.get(BASE_URL+"user/getCurrentStream/"+para).then(res=>{
        setStream(res.data.currentstream)
        setStreamer(res.data.streamer)
               
        
        })
        
          const [recordedStreams, setRecordedStreams] = useState([]);

          const getRecordedStreams = async () =>{
          
            axios
              .get(
                BASE_URL+"stream/getStreamByName2/" +
                  streamer.firstname +
                  " " +
                  streamer.lastname
              )
              .then((res) => {
                  
                setRecordedStreams(res.data);
              })
              .catch(function (error) {
                console.log(error);
              });}


              useEffect(() => {
                if (streamer){
                getRecordedStreams();
                checkfollow();
            }
              },[streamer]);

            useEffect(() => {
                
                const queryParams = new URLSearchParams(window.location.search);
                getStream(queryParams.get("id"));
                
                
              },[]);
             let iframeurl=""
             let name=""
            if (user)
              name = user["firstName"]+" "+user["lastName"]
             
              if (stream && name)
             { iframeurl="http://localhost:3001/react-rtc-demo?streamerName="+name+"&meetId="+stream["meetingId"]
             }
              
    // const initilindex = { index: 0, isOpen: false }

    return(
        <Layout pathList={['portfolio details', 'full width']} pathTitle="full width">
    <Fragment>
            <section className="portfolio-section port-col zoom-gallery detail-page fullwidth-portfolio">

            <div className="container-fluid blog-sec detail2 p-0">
        <Slider className="owl-carousel owl-theme portfolio-header" {...settings1}>
            {stream?(
                
                <center>
                             <h2>{stream.streamTitle}</h2>

            <div className="item  " >
               
            <iframe id='showskill' height="600" width="75%" style={{"border":"white"}} title="Iframe Example"  src={iframeurl}></iframe>
                  </div> </center>):<img src="/images/offline.png"></img>}
            <div className="item">
                <img alt="" className="img-fluid" src="../assets/images/inner-page/blogs/2.jpg" />
            </div>
        </Slider>
    </div>
    {(stream)?( <div style={{marginTop:"-5%",marginLeft:"12%"}} className='d-flex align-items-center w-75 justify-content-end'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg><h4 className='ml-2'>{stream.viewerCount}</h4></div>):null}
                <div className="container-fluid p-t-30 px-0">
                { (user && (user["role"]!="user"))?(
                    <div className="row">
                        
                       <h3 className='ml-3 mt-3'> Records</h3>
                     {((recordedStreams.length<3)&&(recordedStreams.length!=0))?settings.slidesToShow=recordedStreams.length:null}  
                        <Slider className="portfolio-slider col-sm-12" {...settings}>
                            {recordedStreams.map((data, i) => {
                                let imgsrc="";
                                if ( recordedStreams)
                                 imgsrc="images/users/" + data["_id"] + ".jpg";
                                return (
                                    <div className="item" key={i} onClick={()=>getRecord(data.meetingId)}>
                                        <div className="isotopeSelector">
                                            <div className="overlay">
                                                <div className="border-portfolio">
                                                    <a className="zoom_gallery" 
                                                        href={null} title="Click to download record"  >
                                                        <img alt="" className=" blur-up lazyload" style={{"height":"350px"}} 
                                                            src={"../"+data.streamImg} />
                                                            <p style={{"color":"white"}}>{data.streamTitle}</p>

                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                ):null}
                </div>
                

                <div className="container m-t-50">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="portfolio-detail">
                                <h3 className="detail-head">project detail</h3>
                                <div className="detail-container d-flex p-t-0">
                                    <div className="portfolio-left">
                                        <h5 className="text-left">Musician :</h5>
                                    </div>
                                    <div className="portfolio-right">
                                        <h5>{streamer ? (streamer.firstname +" "+streamer.lastname):""}</h5>
                                    </div>
                                </div>
                                <div className="detail-container d-flex">
                                    <div className="portfolio-left">
                                        <h5 className="text-left">email :</h5>
                                    </div>
                                    <div className="portfolio-right">
                                        <h5>{streamer ? (streamer.email):""}</h5>
                                    </div>
                                </div>
                                <div className="detail-container d-flex">
                                    <div className="portfolio-left">
                                        <h5 className="text-left">followers :</h5>
                                    </div>
                                    <div className="portfolio-right">
                                        <h5>{streamer ? (streamer.followers):""}</h5>
                                    </div>
                                </div>
                                <div className="detail-container d-flex">
                                    <div className="portfolio-left">
                                        <h5 className="text-left">link :</h5>
                                    </div>
                                    <div className="portfolio-right">
                                        <h5><a href={streamer ? streamer.facebook : "#"}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-facebook mr-3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                          </svg>
                        </a>
                        <a href={streamer ? streamer.instagram : "#"}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-instagram mr-3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                          </svg>
                        </a>
                        <a href={streamer ? streamer.youtube : "#"}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-youtube mr-3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                          </svg>
                        </a>
                        <a href={streamer ? streamer.spotify : "#"}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-spotify mr-3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
                          </svg>
                        </a></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="portfolio-detail">
                                <h3 className="detail-head">about channel</h3>
                                <p>{streamer? (streamer.channel_description):""}</p>
                                <div className="text-right ">
                                    {following?(
                                    <button className="btn btn-default primary-btn radius-0" onClick={Deletefollow}>unfollow</button>
                                    ): <button className="btn btn-default primary-btn radius-0" onClick={addfollow} >follow</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- pagination Start --> */}
                {/* <div className="pagination_sec">
                    <div className="content_detail__pagination cdp">
                        <ul>
                            <li><a className="prev" href="#"><i aria-hidden="true" className="fa fa-angle-double-left"></i></a></li>
                            <li><a className="active cdp_i" href="#">1</a></li>
                            <li><a className="cdp_i" href="#">2</a></li>
                            <li><a className="cdp_i" href="#">3</a></li>
                            <li><a className="next" href="#"><i aria-hidden="true" className="fa fa-angle-double-right"></i></a></li>
                        </ul>
                    </div>
                </div> */}
                {/* <!-- pagination End --> */}
            </section>
        </Fragment>
        </Layout>
    )
}

export default PortfolioDetail2;