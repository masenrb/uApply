import React, {useState, useEffect, useContext} from "react";
import { Dropdown, List, } from "semantic-ui-react";
import "./ApplicationPage.scss";
import ToDo from "../../components/Application/ToDo"
import Sidebar from "../../components/Application/Sidebar"
import ApplicationCard from '../../components/Application/ApplicationCard';
import { phaseList } from '../../utils/phases.js';
import CustomCheckbox from '../../components/Application/CustomCheckbox';
import axios from 'axios';
import UserContext from '../../utils/UserContext';

/* ISSUES
 * very messy, very hardcoded.
 * Can't get dropdown to have a separate 'button' area with separator line
 * Bullets don't have unique icons but it would be fairly simple. There are built in icons for bullets, we'd just need to change classname accordingly
 */
const ApplicationPage = (props) => {
  const [application, setApplication] = useState(null);
  const [appPhase, setAppPhase] = useState(null);

  const userContext = useContext(UserContext);

  const handleNewPhase = (newPhase) => {
    let userID = userContext.user.data._id;
    let company = application.companyName;
    setAppPhase(newPhase);
    axios
      .post('/api/users/update/ApplicationStatus', {
        params: {
          userID: userID,
          applicationStatus: newPhase,
          applicationName: company,
        },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const id = props.match.params.applicationId;
    let applications = {};
    axios
      .get('/api/users/getApplication', {
        params: {
          username: JSON.parse(localStorage.getItem('data')).userName,
        },
      })
      .then((res) => {
        applications = res.data;
        for (let app of applications) {
          if (app._id === id) {
            setApplication(app);
            setAppPhase(app.status);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.applicationId]);

  return (
    <>
      <div className="application-container">
        {application && appPhase && (
          <>
            <Sidebar />

            <div className="application">
              <div className="column-1">
                <h1>{application.companyName}</h1>
                <h2>{application.jobTitle}</h2>
                <h4>{application.location}</h4>
                <div className="salary">
                  <div className="dollarsign">$</div>
                  <h2>{application.salary.toLocaleString()}</h2>
                </div>
                <div className="description">
                  <ApplicationCard
                    title="Description"
                    width="full"
                    height="half"
                  >
                    <h6>{application.description}</h6>
                  </ApplicationCard>
                </div>
                <div className="benqual">
                  <ApplicationCard
                    title="Benefits"
                    width="half"
                    height="full"
                    float="left"
                  >
                    <List bulleted>
                      {application.benefits.length > 0 ? (
                        application.benefits.map((b, index) => {
                          return <List.Item key={index}>{b}</List.Item>;
                        })
                      ) : (
                        <>No benefits</>
                      )}
                    </List>
                  </ApplicationCard>
                  <ApplicationCard
                    title="Qualifications"
                    width="half"
                    height="full"
                    float="right"
                  >
                    <List>
                      {application.qualifications.length > 0 ? (
                        application.qualifications.map((q, index) => {
                          return (
                            <List.Item key={index}>
                              <CustomCheckbox item={q} index={index} />
                            </List.Item>
                          );
                        })
                      ) : (
                        <>No qualificationss</>
                      )}
                    </List>
                  </ApplicationCard>
                </div>
              </div>
              <div className="column-2">
                <div className="dropdown-wrapper">
                  <Dropdown
                    value={appPhase} //By default, 'Filling Application'
                    selected
                    fluid
                    options={phaseList}
                    onChange={(e) => handleNewPhase(e.target.textContent)}
                  />
                </div>
                <div className="todo-wrapper">
                  <ToDo toDo={application.toDo} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ApplicationPage;
