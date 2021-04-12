import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button, Segment } from 'semantic-ui-react';
import { phaseList } from '../../utils/phases.js';
import './DashboardSegment.scss';
import axios from 'axios';
import UserContext from '../../utils/UserContext';

const DashboardSegment = (props) => {
  /*
   * For the dropdown, this state will need to be stored somewhere. Database? How do we ensure that on refresh everything stays in the right category?
   * The cards should be externally populated through props.
   */

  const userContext = useContext(UserContext);

  /*TEMP */
  let propsphase = props.value.status;
  let propsloc = props.value.location;
  let propstitle = props.value.jobTitle;
  let propscompany = props.value.companyName;

  const [appPhase, setAppPhase] = useState(propsphase);

  const handleNewPhase = (newPhase) => {
    let userID = userContext.user.data._id;
    let company = propscompany;
    setAppPhase(newPhase);
    axios
      .post('/api/users/update/ApplicationStatus', {
        params: {
          userID: userID,
          applicationStatus: newPhase,
          applicationName: company,
        },
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Segment raised>
      {propscompany} {'('}
      {propstitle}
      {') - '}
      {propsloc}
      <div className="button-wrapper-segment">
        <Link to={`/Application/${props.value._id}`}>
          <Button>View</Button>
        </Link>
      </div>
      <div className="dropdown-wrapper-segment">
        <Dropdown
          value={appPhase} //By default, 'Filling Application'
          selected
          fluid
          options={phaseList}
          onChange={(e) => handleNewPhase(e.target.textContent)}
        />
      </div>
    </Segment>
  );
};

export default DashboardSegment;
