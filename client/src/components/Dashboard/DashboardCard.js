import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Card, Button } from 'semantic-ui-react';
import { phaseDictionary, phaseList } from '../../utils/phases.js';
import './DashboardCard.scss';
import axios from 'axios';
import UserContext from '../../utils/UserContext';

const DashboardCard = (props) => {
  /*
   * For the dropdown, this state will need to be stored somewhere. Database? How do we ensure that on refresh everything stays in the right category?
   * The cards should be externally populated through props.
   */

  const userContext = useContext(UserContext);

  /*TEMP */
  let propsphase = props.value.status;
  let propssal = props.value.salary;
  let propsloc = props.value.location;
  let propstitle = props.value.jobTitle;
  let propscompany = props.value.companyName;

  const phase = phaseDictionary[propsphase];
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
    <Card>
      <Card.Meta className={`phase-${phase}`} textAlign="center">
        {propscompany}
      </Card.Meta>
      <Card.Content>
        <Card.Header>{propstitle}</Card.Header>
        <Card.Description>
          <strong>Salary: </strong>
          {propssal}
          <br />
          <strong>Location: </strong>
          {propsloc}
        </Card.Description>
        <Card.Content extra>
          <h6>Phase</h6>
          <div>
            <div className="dropdown-wrapper">
              <Dropdown
                value={appPhase} //By default, 'Filling Application'
                selected
                fluid
                options={phaseList}
                onChange={(e) => handleNewPhase(e.target.textContent)}
              />
            </div>
            <div className="button-wrapper">
              <Link to={`/Application/${props.value._id}`}>
                <Button>View</Button>
              </Link>
            </div>
          </div>
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default DashboardCard;
