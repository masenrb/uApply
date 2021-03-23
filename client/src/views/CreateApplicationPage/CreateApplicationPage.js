import React, { useState, useContext } from "react";
import {
  Dropdown,
  List,
  Button,
  Checkbox,
  Form,
  Segment,
  Header,
} from "semantic-ui-react";
import "./CreateApplicationPage.scss";
import ToDo from "../../components/Application/ToDo";
import Sidebar from "../../components/Application/Sidebar";
import ApplicationCard from "../../components/Application/ApplicationCard";
import { phaseDictionary, phaseList } from "../../utils/phases.js";
import CustomCheckbox from "../../components/Application/CustomCheckbox";
import "../../components/Application/ToDo.scss";
import $ from "jquery";
import UserContext from "../../utils/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
// import { updateApplicationStatus } from "../../../../server/controllers/userController";

const CreateApplicationPage = (props) => {
  const context = useContext(UserContext);

  const { user, setUser } = context;

  console.log(user.data);
  console.log(context);

  const [appPhase, setAppPhase] = useState("Filling Application");

  /*TEMP*/
  const [company, setCompany] = useState();
  const [jobTitle, setJobTitle] = useState();
  const [location, setLocation] = useState();
  const [salary, setSalary] = useState();
  const [description, setDescription] = useState();
  const [benefits, setBenefits] = useState();
  const [qualifications, setQualifications] = useState();
  const [todo, setTodo] = useState();

  const save = () => {
    console.log(user.data._id);
    axios
      .post("/api/users/createApplication", {
        params: {
          userName: "nathan",
          password: "4444",
          userID: user.data._id,
          companyName: company,
          jobTitle: jobTitle,
          location: location,
          description: description,
          salary: salary,
          benefits: benefits,
          qualifications: qualifications,
          todo: todo,
        },
      })
      .then((res) => {
        user.data.applications.push({
          companyName: company,
          jobTitle: jobTitle,
          location: location,
          description: description,
          salary: salary,
          benefits: benefits,
          qualifications: qualifications,
          todo: todo,
        });
      })
      .then(() => {
        setUser({ data: user, isLoggedIn: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let qual = ["good at write", "good at code", "so tired"];

  //works but doesn't after refresh
  $(".todolist").focus(function () {
    if (document.getElementById("todolist").value === "") {
      document.getElementById("todolist").value += "☐ ";
    }
  });
  $(".todolist").keyup(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      document.getElementById("todolist").value += "☐ ";
    }
    var txtval = document.getElementById("todolist").value;
    if (txtval.substr(txtval.length - 1) == "\n") {
      document.getElementById("todolist").value = txtval.substring(
        0,
        txtval.length - 1
      );
    }
  });

  $(".bulletlist").focus(function () {
    if (document.getElementById("bulletlist").value === "") {
      document.getElementById("bulletlist").value += "• ";
    }
  });
  $(".bulletlist").keyup(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      document.getElementById("bulletlist").value += "• ";
    }
    var txtval = document.getElementById("bulletlist").value;
    if (txtval.substr(txtval.length - 1) == "\n") {
      document.getElementById("bulletlist").value = txtval.substring(
        0,
        txtval.length - 1
      );
    }
  });

  return (
    <>
      <div className="application-container">
        <Sidebar />

        <Form>
          <div className="application">
            <div className="column-1">
              <Form.Field>
                <label>Company</label>
                <input
                  placeholder="Company"
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Form.Field>

              <Form.Field>
                <label>Job Title</label>
                <input
                  placeholder="Job Title"
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Form.Field>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Location"
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Salary"
                  placeholder="Salary"
                  onChange={(e) => setSalary(e.target.value)}
                />
              </Form.Group>

              <div className="description">
                <ApplicationCard title="Description" width="full" height="half">
                  <Form.TextArea
                    placeholder="Description"
                    rows="5"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </ApplicationCard>
              </div>

              <div className="benqual">
                <ApplicationCard
                  title="Benefits"
                  width="half"
                  height="full"
                  float="left"
                >
                  <form>
                    <textarea
                      // id="bulletlist"
                      // class="bulletlist"
                      // name="bulletlist"
                      rows="7"
                      placeholder="Healthcare, Vacation . ."
                      onChange={(e) => setBenefits(e.target.value.split(", "))}
                    ></textarea>
                  </form>
                </ApplicationCard>

                <ApplicationCard
                  title="Qualifications"
                  width="half"
                  height="full"
                  float="right"
                >
                  <form>
                    <textarea
                      // id="todolist"
                      // class="todolist"
                      // name="todolist"
                      rows="7"
                      placeholder="Language, Framework, Software . ."
                      onChange={(e) =>
                        setQualifications(e.target.value.split(", "))
                      }
                    ></textarea>
                  </form>
                </ApplicationCard>
              </div>

              <div class="submit">
                <Link to="/Dashboard">
                  <Button color="red" onClick={save}>
                    Save Application
                  </Button>
                </Link>
              </div>
            </div>

            <div className="column-2">
              <div className="dropdown-wrapper">
                <Dropdown
                  value={appPhase} //By default, 'Filling Application'
                  selected
                  fluid
                  options={phaseList}
                  onChange={(e) => setAppPhase(e.target.value)}
                />
              </div>
              <div className="todo-wrapper">
                <div className="todo-list">
                  <Segment.Group>
                    <Segment className="todo-header">
                      <Header size="large">To-Do</Header>
                    </Segment>
                    <Segment className="todo-list">
                      <form>
                        <textarea
                          // id="todolist"
                          // class="todolist"
                          // name="todolist"
                          rows="7"
                          placeholder="Task here . ."
                          onChange={(e) => setTodo(e.target.value.split("\n"))}
                        ></textarea>
                      </form>
                    </Segment>
                  </Segment.Group>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreateApplicationPage;
