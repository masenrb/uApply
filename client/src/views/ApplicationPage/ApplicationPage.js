import React, {useState, useEffect} from "react";
import { Dropdown, List } from "semantic-ui-react";
import "./ApplicationPage.scss";
import ToDo from "../../components/Application/ToDo"
import Sidebar from "../../components/Application/Sidebar"
import ApplicationCard from '../../components/Application/ApplicationCard';
import { phaseDictionary, phaseList } from "../../utils/phases.js";
import CustomCheckbox from '../../components/Application/CustomCheckbox';

/* ISSUES
* very messy, very hardcoded.
* Can't get dropdown to have a separate 'button' area with separator line
* Bullets don't have unique icons but it would be fairly simple. There are built in icons for bullets, we'd just need to change classname accordingly
*/
const ApplicationPage = (props) => {
  const [application, setApplication] = useState(null)
  const [appPhase, setAppPhase] = useState(null);

  /*TEMP*/
  const company = 'Bloomberg';
  const jobTitle = 'Software Engineer';
  const location='New York, New York';
  const salary=72500;
  const description = 'Description is here ahdfjas a lkjdf kas fks ajfdkl asjfdkl jasfk asklfj daslkdfj asdkljf';
  const qual =['good at write', 'good at code', 'so tired'];
  const ben=['healthcare', 'pto', 'idk']

  useEffect(() => {
    const id= props.match.params.applicationId;
    console.log(id);
    let applications = JSON.parse(localStorage.getItem("data")).applications;
    for (let app of applications) {
      if(app._id === id) {
        setApplication(app);
        setAppPhase(app.status);
      }
    }
  },[]);

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
                <div className='dollarsign'>
                  $
                </div>
                <h2 style={{float:'right', paddingTop:'.75rem'}}>{application.salary.toLocaleString()}</h2>
              </div>
              <div className='description'>
                <ApplicationCard title="Description" width='full' height='half'>
                  <h6>{application.description}</h6>
                </ApplicationCard>
              </div>
              <div className='benqual'>
                <ApplicationCard title="Benefits" width='half' height='full' float='left'>
                  <List bulleted>
                      {application.benefits.length > 0 ? 
                          application.benefits.map((b, index) => {
    
                              return(
                                  <List.Item>{b}</List.Item>
                              )
                          })
                      : 
                      <>No qualificationss</>}
                  </List>
                </ApplicationCard>
                <ApplicationCard title="Qualifications" width='half' height='full' float='right'>
                  <List>
                    {application.qualifications.length > 0 ? 
                        application.qualifications.map((q, index) => {
                            return(
                                <List.Item><CustomCheckbox item={q} index={index}/></List.Item>
                            )
                        })
                    : 
                    <>No qualificationss</>}
                  </List>
                </ApplicationCard>
              </div>
            </div>
          <div className="column-2">
            <div className='dropdown-wrapper'>
                <Dropdown 
                    value={appPhase} //By default, 'Filling Application'
                    selected
                    fluid
                    options={phaseList}
                    onChange={(e) => setAppPhase(e.target.value)}
                />
            </div>
            <div className='todo-wrapper'>
              <ToDo toDo={application.toDo}/>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
    </>
  );
}

export default ApplicationPage;
