import React, { Fragment, useState } from "react";
import Axios, * as others from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { BASE_URL } from "../../constant/constants";
const PopupCourses = () => {
  const [modal, setModal] = useState();
  const [activeTab, setActiveTab] = useState("1");

  const toggle = () => {
    setModal(!modal);
  };
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [user, setUser] = useState("");
  const addCourses = () => {
    //{object}

    Axios.post(BASE_URL+"courses", {
      name: name,
      price: price,
      type: type,
      user:JSON.parse(localStorage.getItem("user"))
    }).then(() => {
      console.log("success");
    });
  };
  return (
    <Fragment>
      <Button
        className="btn btn-default primary-btn radius-0"
        style={{ borderRadius: "5%" }}
        onClick={toggle}
      >
        Add Courses
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          toggle={toggle}
          className="modal-no-header close-right"
        ></ModalHeader>
        <ModalBody>
          <div className="modal-body login-modal">
            <Nav tabs className="nav nav-pills mb-5">
              <NavItem>
                <NavLink
                  className={activeTab == "1" ? "active" : ""}
                  onClick={() => setActiveTab("1")}
                >
                  Add Courses
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
                <div className="form-row">
                  <FormGroup className="col-md-12">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    ></Input>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <Label>Type</Label>
                    <select name="type"
                      onChange={(event) => {
                        setType(event.target.value);
                      }}>
                      <option value="Guitar">Guitar</option>
                      <option value="Violon">Violon</option>
                      <option value="Piano">Piano</option>
                      <option value="Darbouka">Darbouka</option>
                    </select>
                  </FormGroup>
                </div>
                <button
                  className="btn primary-btn btn-default text-uppercase"
                  onClick={addCourses}
                >
                  Add Course
                </button>
              </TabPane>
              <TabPane
                tabId="2"
                aria-labelledby="pills-profile-tab"
                className=""
                role="tabpanel"
              ></TabPane>
            </TabContent>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default PopupCourses;
