import React, {useState} from 'react';
import {Checkbox} from 'semantic-ui-react';

const CustomCheckbox = (props) => {
    const [state, setState] = useState('checkbox');

    return (
        <Checkbox label={props.item} id={`td-${props.index}`} onClick={(e) => checkboxClick(`td-${props.index}`, e, state, setState)}/>
    )
}  

/*DOES NOT FUNCTION. Why?*/
const checkboxClick = (id, event, state, setState) => { 
    const checkboxClassOrder = {
        checkbox: 'indeterminate',
        indeterminate: 'checked',
        checked: 'checkbox'
    }
    
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

export default CustomCheckbox;