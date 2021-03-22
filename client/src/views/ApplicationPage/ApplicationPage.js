import React, {useState} from "react";
import { Dropdown } from "semantic-ui-react";
import "./ApplicationPage.scss";
import ToDo from "../../components/Application/ToDo"
import Sidebar from "../../components/Application/Sidebar"
import { phaseDictionary, phaseList } from "../../utils/phases.js";

const ApplicationPage = (props) => {
  const [appPhase, setAppPhase] = useState('Filling Application');

  /*TEMP*/
  const company = 'Bloomberg';
  const jobTitle = 'Software Engineer';
  const location='New York, New York';
  const salary=72500;
  return (
    <div className="application-container">
    <Sidebar />
    <div className="application">
      <div className="column-1">
        <h1>{company}</h1>
        <h2>{jobTitle}</h2>
        <h4>{location}</h4>
        <div className="salary">
          <div className='dollarsign'>
            $
          </div>
          <h2>{salary.toLocaleString()}</h2>
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
          <ToDo />
        </div>
      </div>
    </div>
    </div>
  );
}

export default ApplicationPage;
