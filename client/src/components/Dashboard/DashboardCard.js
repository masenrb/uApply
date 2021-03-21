import React, { useState } from "react";
import { Dropdown, Card, Button } from "semantic-ui-react";
import { phaseDictionary, phaseList } from "../../utils/phases.js";
import "./DashboardCard.scss";

const DashboardCard = (props) => {
    /*
    * For the dropdown, this state will need to be stored somewhere. Database? How do we ensure that on refresh everything stays in the right category?
    * The cards should be externally populated through props.
    */

    /*TEMP */
    let propsphase = 'Filling Application';
    let propssal = '$90,000/year';
    let propsloc = 'Los Angelos, CA, USA';
    let propstitle= 'Project Engineer';
    let propscompany= 'Twitter';

    const phase = phaseDictionary[propsphase];
    const [appPhase, setAppPhase] = useState('Filling Application')

    return (
        <Card>
            <Card.Meta className={`phase-${phase}`} textAlign="center">{propscompany}</Card.Meta>
            <Card.Content>
                <Card.Header>{propstitle}</Card.Header>
                <Card.Description>
                    <strong>Salary: </strong>{propssal}
                    <br/>
                    <strong>Location: </strong>{propsloc}
                </Card.Description>
                <Card.Content extra>
                    <h6>Phase</h6>
                    <div>
                        <div className='dropdown-wrapper'>
                            <Dropdown 
                                value={appPhase} //By default, 'Filling Application'
                                selected
                                fluid
                                options={phaseList}
                                onChange={(e) => setAppPhase(e.target.value)}
                            />
                        </div>
                        <div className='button-wrapper'>
                            <Button>View</Button>
                        </div>
                    </div>
                </Card.Content>
            </Card.Content>
        </Card>
    )
}

export default DashboardCard;