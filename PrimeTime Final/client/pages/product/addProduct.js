import React, { Fragment, useContext, useState } from "react";
import Axios from "axios";
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
import { Store } from "../../utils/Store";
const PopupCourses = () => {
  const [modal, setModal] = useState();
  const [activeTab, setActiveTab] = useState("1");
  const {state,dispatch} = useContext(Store);
  const { userInfo } = state;

  const toggle = () => {
    setModal(!modal);
  };
  const [productName, setName] = useState("");
  const [slug, setslug] = useState("");
  const [description, setdescription] = useState("");
  const [categories, setcategories] = useState("");
  const [price, setprice] = useState("");
  const [size, setsize] = useState("");
  const [stockQuantity, setstockQuantity] = useState("");
  const [image, setimage] = useState("");
  const [type, setType] = useState("");
  const [violonBody, setviolonBody] = useState("");
  const [violonStick, setviolonStick] = useState("");
  const [violonChincrest, setviolonChincrest] = useState("");
const [user, setuser] = useState("");
  const onInputChange = (e) => {
    const formData = new FormData();
    formData.append("username",productName);
    formData.append("photo", document.getElementById("image").files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios
      .post(BASE_URL+"products/uploadImg", formData, config)
      .then(window.location.reload());
  };
  

  const addProduct = () => {
    //{object}

    Axios.post(BASE_URL+"products", {
      productName: productName,
      slug: slug,
      type: type,
      violonBody: violonBody,
      violonStick: violonStick,
      violonChincrest: violonChincrest,
      description: description,
      categories: categories,
      price: price,
      size: size,
      stockQuantity: stockQuantity,
      user:userInfo._id,
      image: "/images/products/"+productName+".jpg"
    }).then(() => {
      console.log("success");
      
    });
    onInputChange();
  };
  return (
    <Fragment>
      <Button className="fa fa-plus" onClick={toggle}>
        Add your Product
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
                  Add Product
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
                    <Label>ProductName</Label>
                    <Input
                      type="text"
                      name="name"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <Label>slug</Label>
                    <Input
                      type="text"
                      name="slug"
                      onChange={(event) => {
                        setslug(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <Label>Type</Label>
                    <Input
                      type="text"
                      name="type"
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <Label>violonBody</Label>
                    <Input
                      type="text"
                      name="violonBody"
                      onChange={(event) => {
                        setviolonBody(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <Label>violonStick</Label>
                    <Input
                      type="text"
                      name="violonStick"
                      onChange={(event) => {
                        setviolonStick(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <Label>violonChincrest</Label>
                    <Input
                      type="text"
                      name="violonChincrest"
                      onChange={(event) => {
                        setviolonChincrest(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <Label>description</Label>
                    <Input
                      type="text"
                      name="description"
                      onChange={(event) => {
                        setdescription(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <Label>categories</Label>
                    <Input
                      type="text"
                      name="categories"
                      onChange={(event) => {
                        setcategories(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <Label>price</Label>
                    <Input
                      type="number"
                      name="price"
                      onChange={(event) => {
                        setprice(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <Label>size</Label>
                    <Input
                      type="number"
                      name="size"
                      onChange={(event) => {
                        setsize(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <Label>stockQuantity</Label>
                    <Input
                      type="number"
                      name="stockQuantity"
                      onChange={(event) => {
                        setstockQuantity(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <Label>image</Label>
                    <Input
                      type="file"
                      name="image"
                      id="image"
                        
                    ></Input>
                  </FormGroup>
                </div>
                <button
                  className="btn primary-btn btn-default text-uppercase"
                  onClick={addProduct}
                >
                  Add Product
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
