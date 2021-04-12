import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import './Delete.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Delete = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    setOpen(false);
    axios
      .delete('/api/users/deleteApplication', {
        params: {
          userID: props.userID,
          companyName: props.companyName,
        },
      })
      .then(() => {
        window.location.href = '/Dashboard';
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };

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
          <Button color="red" onClick={() => handleDelete()}>
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
