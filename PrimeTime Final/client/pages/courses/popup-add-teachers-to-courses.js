import React, { Fragment, useEffect, useState } from "react";
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
import Select from "react-select";
import { useRouter } from "next/router";
import { BASE_URL } from "../../constant/constants";

const PopupCoursesTeachers = () => {
  const [modal, setModal] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("1");
  const [usersList, setUsers] = useState([]);

  const getUsers = () => {
    Axios.get(BASE_URL+"user").then((response) => {
      setUsers(response.data);
    });
  };

  const toggle = () => {
    setModal(!modal);
  };
  const [idTeacher, setIdTeacher] = useState("");
  const [type, setType] = useState("");
  const [user, setUser] = useState("");

  const addCoursesTeachers = () => {
    Axios.put(BASE_URL+`courses/addteachertocourse/${id}`, {
      teacher_id: idTeacher,
    }).then(() => {
      console.log("success"+idTeacher);
    });
  };
  useEffect(() => {
    addCoursesTeachers();
    if (id) {
      getUsers();
    }
  }, [id]);
  return (
    <Fragment>
      <Button
      marginLeft="50%"
        className="btn btn-default primary-btn radius-0"
        style={{ borderRadius: "5%" }}
        onClick={toggle}
      >
        Add Teacher
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          toggle={toggle}
          className="modal-no-header close-right"
        ></ModalHeader>
        <ModalBody>
          <div className="modal-body login-modal">
            <TabContent className="tab-content" activeTab={activeTab}>
              <TabPane
                tabId="1"
                aria-labelledby="pills-home-tab"
                className=""
                role="tabpanel"
              >
                <div className="form-row">
                  <FormGroup className="col-md-12">
                    <Label>Chose A Teacher</Label>
                    <select
                      onChange={(event) => {
                        setIdTeacher(event.target.value);
                        console.log(event.target.value)
                      }}
                    >
                      {usersList.map((val, index) => {
                        {console.log(val._id)}
                        return <option value={val._id}>{val.firstname}</option>;
                      })}
                    </select>
                  </FormGroup>
                </div>
                <button
                  className="btn primary-btn btn-default text-uppercase"
                  onClick={addCoursesTeachers}
                >
                  Add Teacher
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

export default PopupCoursesTeachers;
