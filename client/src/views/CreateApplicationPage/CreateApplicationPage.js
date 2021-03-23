import React, {useState} from "react";
import { Dropdown, List, Button, Checkbox, Form, Segment, Header } from "semantic-ui-react";
import "./CreateApplicationPage.scss";
import ToDo from "../../components/Application/ToDo"
import Sidebar from "../../components/Application/Sidebar"
import ApplicationCard from '../../components/Application/ApplicationCard';
import { phaseDictionary, phaseList } from "../../utils/phases.js";
import CustomCheckbox from '../../components/Application/CustomCheckbox';
import "../../components/Application/ToDo.scss";
import $ from "jquery";



/* ISSUES
* very messy, very hardcoded.
* Can't get dropdown to have a separate 'button' area with separator line
* Bullets don't have unique icons but it would be fairly simple. There are built in icons for bullets, we'd just need to change classname accordingly
*/



const CreateApplicationPage = (props) => {
  const [appPhase, setAppPhase] = useState('Filling Application');

  /*TEMP*/
  const company = 'Bloomberg';
  const jobTitle = 'Software Engineer';
  const location='New York, New York';
  const salary=72500;
  const description = 'Description is here ahdfjas a lkjdf kas fks ajfdkl asjfdkl jasfk asklfj daslkdfj asdkljf';
  const qual =['good at write', 'good at code', 'so tired'];

  //works but doesn't after refresh
  $(".todolist").focus(function() {
    if (document.getElementById('todolist').value === '') {
      document.getElementById('todolist').value += '☐ ';
    }
  });
  $(".todolist").keyup(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      document.getElementById('todolist').value += '☐ ';
    }
    var txtval = document.getElementById('todolist').value;
    if (txtval.substr(txtval.length - 1) == '\n') {
      document.getElementById('todolist').value = txtval.substring(0, txtval.length - 1);
    }
  });

  $(".bulletlist").focus(function() {
    if (document.getElementById('bulletlist').value === '') {
      document.getElementById('bulletlist').value += '• ';
    }
  });
  $(".bulletlist").keyup(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      document.getElementById('bulletlist').value += '• ';
    }
    var txtval = document.getElementById('bulletlist').value;
    if (txtval.substr(txtval.length - 1) == '\n') {
      document.getElementById('bulletlist').value = txtval.substring(0, txtval.length - 1);
    }
  });

  return (
    
    <>
    <div className="application-container">
    <Sidebar />
    
    
      <Form >
      <div className="application">
        <div className="column-1">


        <Form.Field>
          <label>Company</label>
          <input placeholder='Company' />
        </Form.Field>

        <Form.Field>
          <label>Job Title</label>
          <input placeholder='Job Title' />
        </Form.Field>
        
        <Form.Group widths='equal'>
          <Form.Input fluid label='City' placeholder='City' />
          <Form.Input fluid label='State' placeholder='State' />
          <Form.Input fluid label='Salary' placeholder='Salary' />
        </Form.Group>

        <div className='description'>
          <ApplicationCard title="Description" width='full' height='half'>
            <Form.TextArea placeholder='Description' rows='5'/>
          </ApplicationCard>
        </div>

        <div className='benqual'>
          <ApplicationCard title="Benefits" width='half' height='full' float='left'>
          <form>
            <textarea id="bulletlist" class="bulletlist" name="bulletlist" rows="7" placeholder="Healthcare, Vacation . ."></textarea>
          
          </form>
          </ApplicationCard>

          <ApplicationCard title="Qualifications" width='half' height='full' float='right'>
          <form>
            <textarea id="todolist" class="todolist" name="todolist" rows="7" placeholder="Language, Framework, Software . ."></textarea>
          
          </form>
          </ApplicationCard>
        </div>

        <div class="submit"><Button color='red' >Save Application</Button></div>

        </div>

        <div className="column-2">
          <div className='dropdown-wrapper'>
              <Dropdown 
                  value={appPhase} //By default, 'Filling Application'
                  selected
                  fluid
                  options={phaseList}
                  onChange={(e) => setAppPhase(e.target.value)}
              />
          </div>
          <div className='todo-wrapper'>
            <div className='todo-list'>
              <Segment.Group>
                      <Segment className='todo-header' >
                          <Header size='large'>To-Do</Header>
                      </Segment>
                      <Segment className='todo-list'>
                        <form>
                          <textarea id="todolist" class="todolist" name="todolist" rows="7" placeholder="Task here . ."></textarea>
                        </form>
                      </Segment>
              </Segment.Group>
            </div>
          </div>
        </div>

      </div>
      </Form> 

          
        
    </div>
    </>
  );
 
}

export default CreateApplicationPage;
