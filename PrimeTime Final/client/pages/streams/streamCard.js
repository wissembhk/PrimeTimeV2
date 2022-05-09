import React, { useState, Fragment, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { AllImgData, BagsImgData, FeshionImgData, ShoesImgData, WatchImgData } from './database';
import Lightbox from 'react-image-lightbox-next';
import {Container,Row,Col} from 'reactstrap'
import axios from 'axios';
import { BASE_URL } from '../../constant/constants';

const feshion = [
    require('../../public/assets/images/portfolio/1.jpg'),
    require('../../public/assets/images/portfolio/2.jpg'),
    require('../../public/assets/images/portfolio/3.jpg'),
    require('../../public/assets/images/portfolio/4.jpg'),
]

const bags = [
    require('../../public/assets/images/portfolio/5.jpg'),
    require('../../public/assets/images/portfolio/6.jpg'),
    require('../../public/assets/images/portfolio/7.jpg'),
    require('../../public/assets/images/portfolio/8.png'),
]

const watches = [
    require('../../public/assets/images/portfolio/11.jpg'),
    require('../../public/assets/images/portfolio/10.jpg'),
    require('../../public/assets/images/portfolio/12.png'),
]

const shoes = [
    require('../../public/assets/images/portfolio/9.jpg'),
    require('../../public/assets/images/portfolio/10.jpg'),
    require('../../public/assets/images/portfolio/12.png'),
    require('../../public/assets/images/portfolio/8.png'),
]

const AllImg = [
    require('../../public/assets/images/portfolio/1.jpg'),
    require('../../public/assets/images/portfolio/2.jpg'),
    require('../../public/assets/images/portfolio/3.jpg'),
    require('../../public/assets/images/portfolio/4.jpg'),
    require('../../public/assets/images/portfolio/5.jpg'),
    require('../../public/assets/images/portfolio/6.jpg'),
    require('../../public/assets/images/portfolio/7.jpg'),
    require('../../public/assets/images/portfolio/8.png'),
    require('../../public/assets/images/portfolio/9.jpg'),
    require('../../public/assets/images/portfolio/10.jpg'),
    require('../../public/assets/images/portfolio/11.jpg'),
    require('../../public/assets/images/portfolio/12.png'),
]

const StreamCard = ({ className, title, subTitle, fluid ,streams }) => {
    
    const initilindex = { index: 0 }
    
   // const currentStreams=streams.slice(indexOfFirstStream,indexOfLastStream);

    const [photoIndex, setPhotoIndex] = useState(initilindex)
    const [status, setStatus] = useState([]);

    const [activeTab, setActiveTab] = useState('1');
    const currentlylive = async (id) =>

    axios
      .get(BASE_URL+"user/currentlylive/"+id)
      .then((res) => {
         
        return(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  
            
const getUrl=(id) => {
    return ("/streams/channel?id="+id)
}
             

return (
    
    <Fragment>
        <section className="portfolio-section fullwidth-portfolio masonray-sec zoom-gallery titles">
            <div className="filter-section">
                <Container fluid={true}>
                    <Row>
                        <Col xs="12">
                            <Nav tabs className="filter-container isotopeFilters">
                                <NavItem className="list-inline filter">
                                    <NavLink className={activeTab == '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                        All
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={activeTab == '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                        Live
                                    </NavLink>
                                </NavItem>
                              
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={fluid || 'container'}>
                <TabContent className="isotopeContainer row" activeTab={activeTab}>
                    <TabPane tabId="1">
                        {streams.map((stream, i) => {
                             let imgsrc="images/users/" + stream["_id"] + ".jpg";
                            return (
                                <div style={{"width":"700px"}}>
                                <a href={getUrl(stream["_id"])} >
                                <div className={className} key={i} >
                                    <div className="overlay">
                                        <div className="border-portfolio">
                                            <div className="zoom_gallery" data-source={AllImg[photoIndex.index]}
                                                title="">
                                                <div className="overlay-background" onClick={() =>
                                                    setPhotoIndex({ ...photoIndex, index: i, isOpen: true })
                                                }>
                                                    <i aria-hidden="true" className="fa fa-play"></i>
                                                    
                                                </div>
                                                <img alt="" className=" blur-up lazyload"
                                                    src={imgsrc} 
                                                    style={{width:"100%",height:"170px"}}/>
                                               

                                            </div>
                                        </div>

                                    </div>
                                    {title &&
                                        <div className="portfolio-text">
                                            <h3 className="head-text">
                                                {stream["firstname"]}
                                            </h3>
                                            <h6 className="head-sub-text">
                                            {stream["lastname"]}
                                            </h6>
                                        </div>}
                                </div>
                                </a>
                                </div>
                            )
                        })}
                    </TabPane>


                    <TabPane tabId="2">
                        {streams.map((stream, i) => {
                            
                             let imgsrc="images/users/" + stream["_id"] + ".jpg";
                             currentlylive(stream["_id"]).then((res) =>{
                                 status.push(res)
                                setStatus(status)
                                 
                             })
                               if(status[i])
                             return (
                                <div style={{"width":"700px"}}>
                                <a href={getUrl(stream["_id"])} >
                                <div className={className} key={i} >
                                    <div className="overlay">
                                        <div className="border-portfolio">
                                            <div className="zoom_gallery" data-source={AllImg[photoIndex.index]}
                                                title="">
                                                <div className="overlay-background" onClick={() =>
                                                    setPhotoIndex({ ...photoIndex, index: i, isOpen: true })
                                                }>
                                                    <i aria-hidden="true" className="fa fa-play"></i>
                                                    
                                                </div>
                                                <img alt="" className=" blur-up lazyload"
                                                    src={imgsrc} 
                                                    style={{width:"100%",height:"170px"}}/>
                                             

                                            </div>
                                        </div>

                                    </div>
                                    {title &&
                                        <div className="portfolio-text">
                                            <h3 className="head-text">
                                                {stream["firstname"]}
                                            </h3>
                                            <h6 className="head-sub-text">
                                            {stream["lastname"]}
                                            </h6>
                                        </div>}
                                </div>
                                </a>
                                </div>
                            )   
                             
                             
                             
                             
                           
                                    
                        })}
                    </TabPane>
                    
                   
                    
                   
                </TabContent>
            </div>

           
        </section>
    </Fragment>
);

};

export default StreamCard;