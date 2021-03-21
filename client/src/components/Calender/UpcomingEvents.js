import React, { useEffect, useState } from "react";
import { Card, Button, Segment, Header} from "semantic-ui-react";
import "./UpcomingEvents.scss";

const UpcomingEvents = (props) => {
    /*
    * How will the events be stored? How will we know what's in the next 30 days? Will this be passed the next 30 days or have to parse the whole thing?
    */

    /*TEMP */
    const events = [
        {
            header: 'Honeywell interview',
            date: new Date(),
            ref: 'somethingtobringupmoreinfo'
        },
        {
            header: 'Call back dude',
            date: new Date(),
            ref: 'infooo'
        },
        {
            header: 'Honeywell interview',
            date: new Date(),
            ref: 'somethingtobringupmoreinfo'
        },
        {
            header: 'Honeywell interview',
            date: new Date(),
            ref: 'somethingtobringupmoreinfo'
        },
        {
            header: 'Honeywell interview',
            date: new Date(),
            ref: 'somethingtobringupmoreinfo'
        },
        {
            header: 'Honeywell interview',
            date: new Date(),
            ref: 'somethingtobringupmoreinfo'
        },
        {
            header: 'Honeywell interview',
            date: new Date(),
            ref: 'somethingtobringupmoreinfo'
        },
        {
            header: 'Honeywell interview',
            date: new Date(),
            ref: 'somethingtobringupmoreinfo'
        },
        {
            header: 'Honeywell interview',
            date: new Date(),
            ref: 'somethingtobringupmoreinfo'
        },
    ]
    const [haveEvents, setHaveEvents] = useState(false)
    useEffect(() => {
        /*
        * props.events.length > 0 ? setHaveEvents(true) : setHaveEvents(false);
        */
    },[])

    return (
        <div className="upcoming-events">
            <Segment.Group>
                <Segment className='agenda-header' >
                    <Header size='large'>Upcoming Agenda</Header>
                </Segment>
                <Segment className='agenda-list'>
                    <Card.Group>
                        {events ? 
                            events.map((event) => {
                                return(
                                    <Event event={event} />
                                )
                            })
                        : 
                        <>No events</>}
                    </Card.Group>
                </Segment>
            </Segment.Group>
        </div>
    )
}

const Event = ({event}) => {
    console.log(event);
    console.log(event.date);
    return (
        <div className="upcoming-events-card">
            <Card>
                <Card.Content>
                    <span>
                        {event.header}{event.date ? ` - ${daysUntil(event.date)}` : null}
                        <Button icon='ellipsis horizontal'></Button>
                    </span>
                </Card.Content>
            </Card>
        </div>
    )

}

const daysUntil = (date) => {
    let today = new Date();
    let daysUntil = Math.ceil((date.getTime() - today.getTime())/ (1000 * 3600 * 24));
    return daysUntil;
}

export default UpcomingEvents;