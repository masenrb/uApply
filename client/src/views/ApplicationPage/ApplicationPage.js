import React, {useState} from "react";
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
  const [appPhase, setAppPhase] = useState('Filling Application');

  /*TEMP*/
  const company = 'Bloomberg';
  const jobTitle = 'Software Engineer';
  const location='New York, New York';
  const salary=72500;
  const description = 'Description is here ahdfjas a lkjdf kas fks ajfdkl asjfdkl jasfk asklfj daslkdfj asdkljf';
  const qual =['good at write', 'good at code', 'so tired'];
  const ben=['healthcare', 'pto', 'idk']

  return (
    <>
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
          <div className='description'>
            <ApplicationCard title="Description" width='full' height='half'>
              <h6>{description}</h6>
            </ApplicationCard>
          </div>
          <div className='benqual'>
            <ApplicationCard title="Benefits" width='half' height='full' float='left'>
              <List bulleted>
                  {ben ? 
                      ben.map((b, index) => {

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
                {qual ? 
                    qual.map((q, index) => {
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
          <ToDo />
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default ApplicationPage;
