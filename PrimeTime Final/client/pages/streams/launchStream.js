
import {Container,Row} from 'reactstrap'
import JoinScreen from './iframe.js'
import CommonLayout from '../../containers/common/common-layout'
import React, { useState, Fragment, useEffect } from 'react';



const DetailNoSidebar = () => (
    
    <CommonLayout pathList={['blog', 'blog details', 'no sidebar']} pathTitle="BLOG WITH no-sidebar">
        <section className="agency blog-sec blog-sidebar single_blog_item">
            <Container>
                <Row>
                    <JoinScreen></JoinScreen>
                
                </Row>
            </Container>
        </section>
    </CommonLayout>
)


export default DetailNoSidebar;