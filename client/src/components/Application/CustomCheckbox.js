import React from 'react';
import { Checkbox } from 'semantic-ui-react';

const CustomCheckbox = (props) => {
  return (
    <Checkbox
      label={props.item}
      id={`td-${props.index}`} /*onClick={(e) => checkboxClick(`td-${props.index}`, e, state, setState)}*/
    />
  );
};

export default CustomCheckbox;
