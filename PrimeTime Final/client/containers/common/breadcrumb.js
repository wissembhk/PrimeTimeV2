import React from 'react'
import {Container,Row,Col} from 'reactstrap'
const Breadcrumb = ({ list, title }) => {
    return (
        <section className="agency breadcrumb-section ">
            <Container>
                <Row>
                    <Col xs="12">
                        <h2 style={{color:"white"}} className="breadcrumb-text text-center">{title}</h2>
                        <ul className="breadcrumb justify-content-center">
                        </ul>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default Breadcrumb