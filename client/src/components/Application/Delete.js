import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import "./Delete.scss";

function Delete() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button >Delete</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='trash' content='Delete Application' />
      <Modal.Content>
        <p>
          Are you sure you wish to delete this application?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='Yes' /> Yes
        </Button>
        <Button color='blue' onClick={() => setOpen(false)}>
          <Icon name='No' /> No
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Delete