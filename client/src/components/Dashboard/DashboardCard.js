import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import "./DashboardCard.scss";

const DashboardCard = (props) => {
    /*
    * For the dropdown, this state will need to be stored somewhere. Database? How do we ensure that on refresh everything stays in the right category?
    * The const list of phases should be usable globally as some kind of util. Or the dropdown should be abstracted out.
    * The cards should be externally populated--mimic this with a const.
    */
    const [appPhase, setAppPhase] = useState('Creating Application')
    const phaseList = [
        {key: 'Creating Application',
        text: 'Creating Application',
        value: 'Creating Application'},
        {key: 'Awaiting Response',
        text: 'Awaiting Response',
        value: 'Awaiting Response'},
        {key: 'Interview Scheduled',
        text: 'Interview Scheduled',
        value: 'Interview Scheduled'},
        {key: 'Offer Received',
        text: 'Offer Received',
        value: 'Offer Received'}
    ]

    return (
        <div className='dashboard-card'>
            <div className='dropdown-wrapper'>
                {/*UseSemanticUICard*/}
                <Dropdown 
                    value={appPhase} //By default, 'Creating Application'
                    selected
                    fluid
                    options={phaseList}
                    onChange={(e) => setAppPhase(e.target.value)}
                />
            </div>
        </div>
    )
}

export default DashboardCard;