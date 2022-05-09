import React from 'react'
import Title from './elements/common/title';
import PricingTwo from './elements/price/elementPrice2'
import { Container } from 'reactstrap'
import Layout from '../containers/common/common-layout'
const ElementPriceTwo = () => (
    <Layout pathList={['elements', 'pricing']} pathTitle="Join Us ">
    <section className="app2 pricing bg-light-inner ">
        <Container>  
            <span></span>        
            <PricingTwo />
        </Container>
    </section>
    </Layout>
)


export default ElementPriceTwo;