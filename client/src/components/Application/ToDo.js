import React, { useState } from "react";
import { Segment, List, Header, Checkbox} from "semantic-ui-react";
import CustomCheckbox from './CustomCheckbox'
import "./ToDo.scss";

/*Indeterminate class change doesn't show.
* Can't figure out how to change checkbox border color
*/

const ToDo = (props) => {
    /*TEMP*/
    const todo=['see people ahhhhhhhhhhh ahhhhhhhh ughhh', 'talk to people', 'do shit','see people', 'talk to people', 'do shit','see people', 'talk to people', 'do shit','see people', 'talk to people', 'do shit','see people', 'talk to people', 'do shit'];

    return (
        <div className='todo-list'>
            <Segment.Group>
                    <Segment className='todo-header' >
                        <Header size='large'>To-Do</Header>
                    </Segment>
                    <Segment className='todo-list'>
                        <List>
                            {todo ? 
                                todo.map((td, index) => {
                                    return(
                                        <List.Item><CustomCheckbox item={td} index={index}/></List.Item>
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