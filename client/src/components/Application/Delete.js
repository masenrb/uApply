import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import './Delete.scss';
import { Link } from 'react-router-dom';

const Delete = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      closeIcon
      open={open}
      trigger={props.trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      centered={true}
      size="mini"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        height: '190px',
      }}
    >
      <Header icon="trash" content="Delete Application" />
      <Modal.Content>
        <p>Are you sure you wish to delete this application?</p>
      </Modal.Content>
      <Modal.Actions>
        <Link to="/Dashboard">
          <Button color="red" onClick={() => setOpen(false)}>
            Yes
          </Button>
        </Link>
        <Button color="blue" onClick={() => setOpen(false)}>
          No
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Delete;
