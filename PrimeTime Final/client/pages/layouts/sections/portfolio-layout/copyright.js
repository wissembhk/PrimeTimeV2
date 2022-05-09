import React from 'react';
import { Container, Row, Col } from 'reactstrap'
const Copyright = () => (
    <div className="agency copyright inner-page">
        <Container>
            <Row>
                <Col sm="6">
                    <div className="link-horizontal center-text">
                        <ul>
                            <li>
                                <a className="copyright-text" href="#">Privacy Policy</a>
                            </li>
                            <li>
                                <a className="copyright-text" href="#">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col sm="6">
                    <div>
                        <h6 className="copyright-text text-white text-right">Copyright © 2022 PrimeTime</h6>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
)

export default Copyright;