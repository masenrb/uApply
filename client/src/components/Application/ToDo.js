import React, { useState } from "react";
import { Segment, List, Header, Checkbox} from "semantic-ui-react";
import "./ToDo.scss";

const checkboxClassOrder = {
    checkbox: 'indeterminate',
    indeterminate: 'checked',
    checked: 'checkbox'
}

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
const CustomCheckbox = (props) => {
    const [state, setState] = useState('checkbox');

    return (
        <Checkbox label={props.item} id={`td-${props.index}`} onClick={(e) => checkboxClick(`td-${props.index}`, e, state, setState)}/>
    )
}  

/*DOES NOT FUNCTION. Why?*/
const checkboxClick = (id, event, state, setState) => { 
    let nextClass = checkboxClassOrder[state];
    if(nextClass == 'checkbox') {
        event.target.parentNode.classList.remove(state);
    }
    else if (state === 'checkbox') {
        event.target.parentNode.classList.add(nextClass);
    }
    else {
        event.target.parentNode.classList.remove(state);
        event.target.parentNode.classList.add(nextClass);
    }
    setState(nextClass);
}

export default ToDo;