import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import Delete from './Delete';
import './Sidebar.scss';

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <Delete
        trigger={
          <Button className="trashcan">
            <Icon name="trash alternate" size="huge" color="grey" />
          </Button>
        }
      />
    </div>
  );
};

export default Sidebar;
