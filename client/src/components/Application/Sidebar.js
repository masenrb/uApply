import React, { useState } from "react";
import { Icon, Button } from "semantic-ui-react";
import "./Sidebar.scss";

const Sidebar = (props) => {
    
    return (
        <div className='sidebar'>
            <Button className="trashcan">
                <Icon name="trash alternate" size="huge" color="grey"/>
            </Button>
        </div>
    )
}

export default Sidebar;