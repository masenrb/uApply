import React, { useState } from "react";
import { Segment, List, Header, Checkbox} from "semantic-ui-react";
import "./ToDo.scss";

/*Indeterminate class change doesn't show.
* Can't figure out how to change checkbox border color
*/

const ToDo = (props) => {
    /*TEMP*/

    return (
        <div className='todo-list'>
            <Segment.Group>
                    <Segment className='todo-header' >
                        <Header size='large'>To-Do</Header>
                    </Segment>
                    <Segment className='todo-list'>
                        <List>
                            {props.toDo ? 
                                props.toDo.map((td, index) => {
                                    return(
                                        <List.Item><Checkbox label={td}/></List.Item>
                                    )
                                })
                            : 
                            <>No to-dos</>}
                        </List>
                    </Segment>
            </Segment.Group>
        </div>
    )
}

export default ToDo;