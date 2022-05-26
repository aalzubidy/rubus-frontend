import React, { useState, useContext } from 'react';
import { Modal, Tooltip } from '@mui/material';
import { AlertsContext } from '../../Contexts/AlertsContext';
import API from '../../API';
import './newProject.scss';

const NewProject = (props) => {
  // Settings
  const { alertMsg } = useContext(AlertsContext);
  const genericError = 'New Project - uknown error, check console logs for details';

  const { newProjectDialog, setNewProjectDialog } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Create a new comment
  const handleNewProject = async () => {
    try {
      alertMsg('info', 'Please wait, creating your project.');
      const { data } = await API.projects.newProject({ title, description });
      if (data) {
        alertMsg('success', 'Project created successfully');
        setTitle('');
        setDescription(false);
        setNewProjectDialog(false);
      }
    } catch (error) {
      alertMsg('error', 'could not create project', error.message || genericError, error);
    }
  }

  return (
    <Modal
      open={newProjectDialog}
      onClose={() => setNewProjectDialog(false)}
      disableEscapeKeyDown
      hideBackdrop
    >
      <div className='container-fluid newProjectContainer'>
        <div className='row projectInput'>
          <div>
            <Tooltip title='Enter project title'>
              <input className='form-control' type='text' value={title} onChange={(evt) => setTitle(evt.target.value)} placeholder='Project title' />
            </Tooltip>
          </div>
          <div>
            <Tooltip title='Enter project description'>
              <input className='form-control' type='text' value={description} onChange={(evt) => setDescription(evt.target.value)} placeholder='Project description' />
            </Tooltip>
          </div>
        </div>
        <div className='row actions'>
          <div>
            <button className='btn btn-link' onClick={() => setNewProjectDialog(false)}>Cancel</button>
            <button className='btn btn-outline-primary' onClick={handleNewProject}>Create Project</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NewProject;
