import React from 'react';
import { Icon, Button, Sidebar } from 'semantic-ui-react';
import Delete from './Delete';
import './Sidebar.scss';

const SideBar = (props) => {
  return (
    <Sidebar
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible
      width="thin"
      className="sidebar"
    >
      <div className="align-bottom">
        <Delete
          trigger={
            <Button className="trashcan">
              <Icon name="trash alternate" size="huge" color="grey" />
            </Button>
          }
        />
      </div>
    </Sidebar>
  );
};

export default SideBar;
