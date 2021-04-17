import React, {useContext} from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import './Delete.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../utils/UserContext';


const Delete = (props) => {
  const [open, setOpen] = React.useState(false);
  const context = useContext(UserContext);
  const { user, setUser } = context;


  const handleDelete = () => {
    console.log(props.userID);
    setOpen(false);
    axios
      .delete('/api/users/deleteApplication', {
        params: {
          userID: props.userID,
          companyName: props.companyName,
        },
      })
      .then(() => {
        let index = user.data.applications.findIndex((item) => item.companyName === props.companyName)
        console.log(index);
        user.data.applications.splice(index, 1)
        setUser({ data: user, isLoggedIn: true });
        localStorage.setItem('data', JSON.stringify(user.data));
        //window.location.href = '/Dashboard';
      })
      .then(() => {
        window.location.href="/Dashboard";
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
          <Button color="red" onClick={() => handleDelete()}>
            Yes
          </Button>
        <Button color="blue" onClick={() => setOpen(false)}>
          No
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Delete;
