import React, { useEffect } from "react";
import { Card, Button, Segment, Header } from "semantic-ui-react";
import "./UpcomingEvents.scss";

const UpcomingEvents = (props) => {
  /*
   * How will the events be stored? How will we know what's in the next 30 days? Will this be passed the next 30 days or have to parse the whole thing?
   */

  useEffect(() => {
    /*
     * props.events.length > 0 ? setHaveEvents(true) : setHaveEvents(false);
     */
  }, []);

  return (
    <div className="upcoming-events">
      <Segment.Group>
        <Segment className="agenda-header">
          <Header size="large">Upcoming Agenda</Header>
        </Segment>
        <Segment className="agenda-list">
          <Card.Group>
            {props.events ? (
              props.events.map((event, index) => {
                return <Event key={index} event={event} />;
              })
            ) : (
              <>No events</>
            )}
          </Card.Group>
        </Segment>
      </Segment.Group>
    </div>
  );
};

const Event = ({ event }) => {
  console.log(event);
  console.log(event.date);
  return (
    <div className="upcoming-events-card">
      <Card>
        <Card.Content>
          <span>
            {event.eventTitle}
            {event.eventDate ? ` - ${daysUntil(event.eventDate)}` : null}
            <Button className="button-more" icon="ellipsis horizontal"></Button>
          </span>
        </Card.Content>
      </Card>
    </div>
  );
};

const daysUntil = (date) => {
  let today = new Date();
  let day = new Date(date);
  console.log(date);
  let daysUntil = Math.ceil(
    (day.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );
  return daysUntil;
};

export default UpcomingEvents;
